import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import ts from "typescript";

const require = createRequire(import.meta.url);

// Load the TypeScript modules with only SMTP replaced; tests never send mail.
function createLoader(mocks = {}) {
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const source = readFileSync(path.join(process.cwd(), filename), "utf8");
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText;
    const loadedModule = { exports: {} };
    cache.set(filename, loadedModule);
    const resolve = (specifier) => {
      if (specifier in mocks) return mocks[specifier];
      if (specifier.startsWith("@/")) return load(`src/${specifier.slice(2)}.ts`);
      return require(specifier);
    };
    new Function("require", "module", "exports", "process", "console", compiled)(
      resolve, loadedModule, loadedModule.exports, process, { ...console, error() {} },
    );
    return loadedModule.exports;
  }
  return load;
}

const load = createLoader();
const { parseContactEnquiry } = load("src/lib/contact.ts");
const { createContactEmail } = load("src/lib/contact-email.ts");
const { projectTypes } = load("src/lib/data.ts");
const valid = {
  name: "Test Client", company: "Example Company", email: "client@example.com",
  goal: "A new website", projectType: projectTypes[0], timeline: "", details: "",
  privacyAccepted: true, website: "",
};

test("contact validation rejects malformed, oversized and header-injection submissions", () => {
  assert.ok(parseContactEnquiry(valid));
  for (const value of [null, [], {}, { ...valid, privacyAccepted: false },
    { ...valid, name: "Client\r\nBcc: other@example.com" },
    { ...valid, email: "client@example.com\nBcc: other@example.com" },
    { ...valid, goal: "x".repeat(3001) }, { ...valid, projectType: "Unknown" },
    { ...valid, timeline: "Unknown" }, { ...valid, company: {} }]) {
    assert.equal(parseContactEnquiry(value), null);
  }
});

test("branded HTML escapes visitor content and includes a plain-text alternative", () => {
  const enquiry = parseContactEnquiry({ ...valid, name: "Client <script>", goal: '<img src=x onerror="alert(1)">\nSecond line' });
  assert.ok(enquiry);
  const message = createContactEmail(enquiry);
  assert.ok(message.html.includes("Client &lt;script&gt;"));
  assert.ok(!message.html.includes("<script>"));
  assert.ok(message.html.includes("&lt;img"));
  assert.ok(message.html.includes("<br>Second line"));
  assert.ok(message.html.includes("cid:httpier-logo"));
  assert.ok(message.text.includes(enquiry.goal));
  assert.equal(message.subject, `New HTTPier enquiry - ${valid.projectType}`);
});

test("contact endpoint confirms only SMTP acceptance and handles failures safely", async () => {
  const savedEnv = { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS, to: process.env.CONTACT_TO_EMAIL };
  let sent = 0;
  let message;
  let mode = "accepted";
  const route = createLoader({
    nodemailer: {
      createTransport: () => ({
        sendMail: async (options) => {
          sent++;
          message = options;
          if (mode === "error") throw Object.assign(new Error("Private provider details"), { code: "EAUTH" });
          return { accepted: mode === "accepted" ? ["owner@example.com"] : [] };
        },
        close() {},
      }),
    },
  })("src/app/api/contact/route.ts");
  let ip = 0;
  const request = (value, options = {}) => new Request("https://httpier.in/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json", origin: "https://httpier.in", "x-forwarded-for": `192.0.2.${++ip}`, ...options.headers },
    body: typeof value === "string" ? value : JSON.stringify(value),
  });

  try {
    process.env.SMTP_USER = "owner@example.com";
    process.env.SMTP_PASS = "private-app-password";
    process.env.CONTACT_TO_EMAIL = "owner@example.com";
    assert.equal((await route.POST(request(valid, { headers: { origin: "https://other.example" } }))).status, 403);
    assert.equal((await route.POST(request("{"))).status, 400);
    assert.equal((await route.POST(request({ ...valid, website: "spam.example" }))).status, 400);
    assert.equal((await route.POST(request({ ...valid, privacyAccepted: false }))).status, 400);
    assert.equal((await route.POST(request("x".repeat(50 * 1024)))).status, 413);
    assert.equal(sent, 0);

    delete process.env.SMTP_PASS;
    assert.equal((await route.POST(request(valid))).status, 503);
    assert.equal(sent, 0);
    process.env.SMTP_PASS = "private-app-password";

    const response = await route.POST(request({ ...valid, to: "attacker@example.com" }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    assert.equal(message.to, "owner@example.com");
    assert.equal(message.from.address, "owner@example.com");
    assert.equal(message.replyTo.address, "client@example.com");
    assert.ok(Buffer.isBuffer(message.attachments[0].content));

    for (const failure of ["rejected", "error"]) {
      mode = failure;
      const result = await route.POST(request(valid));
      assert.equal(result.status, 502);
      const payload = await result.json();
      assert.equal(payload.success, false);
      assert.ok(!JSON.stringify(payload).includes("private"));
    }
    for (let attempt = 0; attempt < 5; attempt++) {
      await route.POST(request(valid, { headers: { "x-forwarded-for": "192.0.2.200" } }));
    }
    const limited = await route.POST(request(valid, { headers: { "x-forwarded-for": "192.0.2.200" } }));
    assert.equal(limited.status, 429);
    assert.ok(limited.headers.get("retry-after"));
  } finally {
    for (const [key, value] of Object.entries({ SMTP_USER: savedEnv.user, SMTP_PASS: savedEnv.pass, CONTACT_TO_EMAIL: savedEnv.to })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
