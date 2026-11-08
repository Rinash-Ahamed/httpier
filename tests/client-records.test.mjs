import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

function load(file, dependencies = {}) {
  const source = readFileSync(file, "utf8");
  const result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const loaded = { exports: {} };
  new Function("require", "module", "exports", result.outputText)((id) => {
    if (!(id in dependencies)) throw new Error(`Unexpected dependency: ${id}`);
    return dependencies[id];
  }, loaded, loaded.exports);
  return loaded.exports;
}

const records = load("src/lib/client-records.ts");

test("client commission is stored in paise without changing fees or payments", async () => {
  let saved;
  const actions = load("src/app/admin/clients/actions.ts", {
    "next/cache": { revalidatePath() {} },
    "next/navigation": { redirect() { throw new Error("Redirected"); } },
    "@/lib/admin-auth": { requireAdmin: async () => ({ uid: "admin" }) },
    "@/lib/firebase-admin": { firestore: () => ({ collection: () => ({ doc: () => ({ id: "client1", create: async (data) => { saved = data; } }) }) }) },
    "@/lib/client-records": records,
  });
  const form = new FormData();
  for (const [key, value] of Object.entries({ id: "", name: "Test", email: "", status: "Lead", agreedAmount: "10000", commissionAmount: "500.25", dueDate: "", company: "", phone: "", billingAddress: "", projectName: "", notes: "" })) form.set(key, value);
  await assert.rejects(actions.saveClientAction({}, form), /Redirected/);
  assert.equal(saved.commissionPaise, 50025);
  assert.equal(saved.agreedPaise, 1000000);
  assert.equal(saved.paidPaise, 0);
  for (const invalid of ["-1", "1.001", "NaN"]) {
    form.set("commissionAmount", invalid);
    assert.match((await actions.saveClientAction({}, form)).error, /commission amount/);
  }
  form.delete("commissionAmount");
  await assert.rejects(actions.saveClientAction({}, form), /Redirected/);
  assert.equal(saved.commissionPaise, 0);
});

test("INR validation uses integer paise and rejects ambiguous or invalid amounts", () => {
  for (const [input, expected] of [["0", 0], ["0.01", 1], ["10000.50", 1000050], ["999999999.99", 99999999999], ["12.3", 1230]]) {
    assert.equal(records.parseInr(input), expected);
  }
  for (const input of ["-1", "1e5", "NaN", "Infinity", "10.001", "", "1,000", "1000000000", 200]) assert.equal(records.parseInr(input), null);
});

test("dates and calculated payment statuses handle unpaid, partial, settled and overdue accounts", () => {
  assert.equal(records.validDate("2026-02-30"), false);
  assert.equal(records.validDate("2028-02-29"), true);
  assert.equal(records.validDate("not-a-date"), false);
  const client = { agreedPaise: 100000, paidPaise: 0, dueDate: "" };
  assert.equal(records.paymentStatus({ ...client, agreedPaise: 0 }), "Not quoted");
  assert.equal(records.paymentStatus(client), "Unpaid");
  assert.equal(records.paymentStatus({ ...client, paidPaise: 1 }), "Part-paid");
  assert.equal(records.paymentStatus({ ...client, paidPaise: 100000 }), "Paid");
  assert.equal(records.paymentStatus({ ...client, dueDate: "2000-01-01" }), "Overdue");
  assert.equal(records.paymentStatus({ ...client, dueDate: "2000-01-01", paidPaise: 100000 }), "Paid");
});

test("admin allowlist rejects other Firebase users and pins access to UID when configured", () => {
  const savedEmail = process.env.FIREBASE_ADMIN_EMAIL;
  const savedUid = process.env.FIREBASE_ADMIN_UID;
  try {
    const firebase = load("src/lib/firebase-admin.ts", { "server-only": {}, "firebase-admin/app": {}, "firebase-admin/auth": {}, "firebase-admin/firestore": {} });
    process.env.FIREBASE_ADMIN_EMAIL = "ahamedrinash@gmail.com";
    delete process.env.FIREBASE_ADMIN_UID;
    assert.equal(firebase.isAllowedAdmin({ uid: "admin", email: "ahamedrinash@gmail.com" }), true);
    assert.equal(firebase.isAllowedAdmin({ uid: "other", email: "other@example.com" }), false);
    assert.equal(firebase.isAllowedAdmin({ uid: "other" }), false);
    process.env.FIREBASE_ADMIN_UID = "pinned-admin";
    assert.equal(firebase.isAllowedAdmin({ uid: "other", email: "ahamedrinash@gmail.com" }), false);
    assert.equal(firebase.isAllowedAdmin({ uid: "pinned-admin" }), true);
  } finally {
    if (savedEmail === undefined) delete process.env.FIREBASE_ADMIN_EMAIL; else process.env.FIREBASE_ADMIN_EMAIL = savedEmail;
    if (savedUid === undefined) delete process.env.FIREBASE_ADMIN_UID; else process.env.FIREBASE_ADMIN_UID = savedUid;
  }
});

test("payment writes are atomic, idempotent and reject overpayment", async () => {
  const client = { agreedPaise: 10000, paidPaise: 0 };
  const payments = new Map();
  const ref = { collection: () => ({ doc: (id) => ({ id }) }) };
  const store = {
    collection: () => ({ doc: () => ref }),
    runTransaction: async (callback) => callback({
      get: async (target) => target === ref ? { exists: true, data: () => ({ ...client }) } : { exists: payments.has(target.id) },
      create: (target, data) => payments.set(target.id, data),
      update: (_target, data) => Object.assign(client, data),
    }),
  };
  let allowed = true;
  const actions = load("src/app/admin/clients/actions.ts", {
    "next/cache": { revalidatePath() {} }, "next/navigation": {},
    "@/lib/admin-auth": { requireAdmin: async () => { if (!allowed) throw new Error("Unauthorized"); return { uid: "admin" }; } },
    "@/lib/firebase-admin": { firestore: () => store }, "@/lib/client-records": records,
  });
  const form = (id, amount) => {
    const result = new FormData();
    for (const [key, value] of Object.entries({ clientId: "client1", paymentId: id, amount, date: "2026-11-08", method: "UPI", reference: "TEST", notes: "" })) result.set(key, value);
    return result;
  };
  const first = form("payment-request-0001", "25.50");
  assert.equal((await actions.recordPaymentAction({}, first)).success, "Payment recorded.");
  assert.equal(client.paidPaise, 2550);
  await actions.recordPaymentAction({}, first);
  assert.equal(client.paidPaise, 2550);
  assert.equal(payments.size, 1);
  assert.match((await actions.recordPaymentAction({}, form("payment-request-0002", "100"))).error, /exceeds/);
  assert.equal(client.paidPaise, 2550);
  assert.ok((await actions.recordPaymentAction({}, form("payment-request-0003", "-1"))).error);
  allowed = false;
  await assert.rejects(actions.recordPaymentAction({}, form("payment-request-0004", "1")), /Unauthorized/);
  assert.equal(payments.size, 1);
});
