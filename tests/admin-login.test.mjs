import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(file, dependencies, request = () => { throw new Error("Unexpected network request"); }) {
  const compiled = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const mod = { exports: {} };
  new Function("require", "module", "exports", "fetch", compiled)((id) => {
    if (id in dependencies) return dependencies[id];
    if (id === "react/jsx-runtime") return require(id);
    throw new Error(`Unexpected dependency: ${id}`);
  }, mod, mod.exports, request);
  return mod.exports;
}

test("reset sends only to configured admin, ignoring browser-supplied addresses, with cooldown", async () => {
  const saved = { key: process.env.FIREBASE_WEB_API_KEY, email: process.env.FIREBASE_ADMIN_EMAIL };
  try {
    process.env.FIREBASE_WEB_API_KEY = "test-only-api-key";
    process.env.FIREBASE_ADMIN_EMAIL = "admin@example.com";
    const requests = [];
    const dependencies = (allowed = true, disabled = false, configured = true) => ({
      "next/headers": {}, "next/navigation": {}, "@/lib/admin-session": {},
      "@/lib/firebase-admin": {
        isFirebaseConfigured: () => configured,
        isAllowedAdmin: () => allowed,
        firebaseAuth: () => ({ getUserByEmail: async (email) => { assert.equal(email, "admin@example.com"); return { uid: "admin", email, disabled }; } }),
      },
    });
    const request = async (url, init) => { requests.push({ url, body: JSON.parse(init.body) }); return { ok: true }; };
    const actions = load("src/app/login/actions.ts", dependencies(), request);
    const injected = new FormData(); injected.set("email", "other@example.com");
    assert.ok((await actions.resetAdminPasswordAction({}, injected)).success);
    assert.equal(requests.length, 1);
    assert.deepEqual(requests[0].body, { requestType: "PASSWORD_RESET", email: "admin@example.com" });
    assert.match(requests[0].url, /^https:\/\/identitytoolkit.googleapis.com\/v1\/accounts:sendOobCode\?/);
    assert.match((await actions.resetAdminPasswordAction()).error, /wait a minute/);
    assert.equal(requests.length, 1);
    for (const deps of [dependencies(false), dependencies(true, true), dependencies(true, false, false)]) {
      assert.ok((await load("src/app/login/actions.ts", deps).resetAdminPasswordAction()).error);
    }
    assert.equal(requests.length, 1);
    assert.ok((await load("src/app/login/actions.ts", dependencies(), async () => ({ ok: false })).resetAdminPasswordAction()).error);
    const failure = await load("src/app/login/actions.ts", dependencies(), async () => { throw new Error("sensitive provider detail"); }).resetAdminPasswordAction();
    assert.ok(failure.error);
    assert.doesNotMatch(failure.error, /sensitive provider/);
  } finally {
    if (saved.key === undefined) delete process.env.FIREBASE_WEB_API_KEY; else process.env.FIREBASE_WEB_API_KEY = saved.key;
    if (saved.email === undefined) delete process.env.FIREBASE_ADMIN_EMAIL; else process.env.FIREBASE_ADMIN_EMAIL = saved.email;
  }
});

test("password starts masked, eye button toggles without submitting the form", () => {
  let visible = false;
  const { LoginForm } = load("src/components/admin/LoginForm.tsx", {
    react: {
      useActionState: () => [{}, () => {}, false],
      useState: () => [visible, (update) => { visible = update(visible); }],
    },
    "@/app/login/actions": {},
  });
  function find(node, predicate) {
    if (!node || typeof node !== "object") return;
    if (predicate(node)) return node;
    for (const child of [node.props?.children].flat(Infinity)) { const match = find(child, predicate); if (match) return match; }
  }
  let tree = LoginForm();
  assert.equal(find(tree, (node) => node.props?.id === "password").props.type, "password");
  const eye = find(tree, (node) => node.props?.["aria-controls"] === "password");
  assert.equal(eye.props.type, "button");
  assert.equal(eye.props["aria-label"], "Show password");
  eye.props.onClick();
  tree = LoginForm();
  assert.equal(find(tree, (node) => node.props?.id === "password").props.type, "text");
  assert.equal(find(tree, (node) => node.props?.["aria-controls"] === "password").props["aria-label"], "Hide password");
});
