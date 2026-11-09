import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import ts from "typescript";

const require = createRequire(import.meta.url);
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const mod = { exports: {} };
  cache.set(file, mod);
  const source = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  new Function("require", "module", "exports", source)((id) => {
    if (id === "server-only") return {};
    if (id === "next/image") return { __esModule: true, default: ({ unoptimized, ...props }) => { void unoptimized; return React.createElement("img", props); } };
    if (id.startsWith("@/")) {
      const path = `src/${id.slice(2)}`;
      return load(path + (id.includes("components/") ? ".tsx" : ".ts"));
    }
    return require(id);
  }, mod, mod.exports);
  return mod.exports;
}

export const supportLib = load("src/lib/invoice-support.ts");
export const { InvoiceDocument } = load("src/components/invoice/InvoiceDocument.tsx");
const types = load("src/lib/invoice-types.ts");
const validation = load("src/lib/invoice-validation.ts");
const tokens = load("src/lib/invoice-token.ts");

export function fixture(count = 1, long = false) {
  return {
    clientName: "Example Client", companyName: "Example Company", phone: "+91 9000000000", email: "client@example.com", billingAddress: "Coimbatore, Tamil Nadu",
    invoiceNumber: "HTP-QA-011", invoiceDate: "2026-11-09", dueDate: "2026-11-23", projectName: "Website delivery", shortDescription: "Responsive website design and development.",
    items: Array.from({ length: count }, (_, i) => ({ id: `item-${i}`, serviceName: `Website service ${i + 1}`, description: long ? "Responsive design, implementation, accessibility and browser verification. ".repeat(6) : "Responsive design and development.", quantity: 1, rate: 10000 })),
    discount: 500, taxRate: 18, amountPaid: 2000,
    support: { ...supportLib.createDefaultSupport(), deliveryDate: "2026-11-09" },
    createdAt: "2026-11-09T00:00:00.000Z", payment: { upiId: "test@example", payeeName: "HTTPier", mobile: "+91 9000000000" },
  };
}

test("new defaults, calendar expiry, invalid dates and limits", () => {
  const first = supportLib.createDefaultSupport();
  assert.equal(first.durationDays, 60);
  assert.equal(first.changeRequests, 2);
  assert.equal(supportLib.supportExpiryDate("2026-11-09", 60), "2027-01-08");
  assert.equal(supportLib.supportExpiryDate("2028-02-28", 2), "2028-03-01");
  for (const date of ["", "2026-02-30", "invalid"]) assert.equal(supportLib.supportExpiryDate(date, 60), null);
  for (const durationDays of [0, -1, 1.5, 3651, NaN]) assert.ok(supportLib.validateInvoiceSupport({ ...first, durationDays }));
  for (const changeRequests of [-1, 2.5, 101]) assert.ok(supportLib.validateInvoiceSupport({ ...first, changeRequests }));
  assert.ok(supportLib.validateInvoiceSupport({ ...first, deliveryDate: "2026-02-30" }));
  first.durationDays = 20;
  assert.equal(supportLib.createDefaultSupport().durationDays, 60);
});

test("zero advance is valid and leaves the full total outstanding", () => {
  const invoice = fixture();
  invoice.amountPaid = 0;
  const safe = validation.sanitizeInvoiceDraft(invoice);
  assert.equal(validation.validateInvoiceDraft(safe), null);
  const totals = types.calculateInvoiceTotals(safe);
  assert.equal(totals.paid, 0);
  assert.equal(totals.balance, totals.total);
  const html = renderToStaticMarkup(React.createElement(InvoiceDocument, { invoice }));
  assert.match(html, /<dt>Advance Paid<\/dt><dd>₹0<\/dd>/);
});

test("payment panel wraps on narrow cards and replaces the empty QR box when settled", () => {
  const invoice = fixture();
  let html = renderToStaticMarkup(React.createElement(InvoiceDocument, { invoice }));
  assert.match(html, /invoice-payment-content[^\"]*flex-wrap/);
  assert.match(html, /<dt[^>]*>UPI ID<\/dt><dd[^>]*>test@example<\/dd>/);
  assert.match(html, /Scan to pay/);
  invoice.amountPaid = types.calculateInvoiceTotals(invoice).total;
  html = renderToStaticMarkup(React.createElement(InvoiceDocument, { invoice }));
  assert.match(html, /Paid in full/);
  assert.doesNotMatch(html, /Scan to pay|border-dashed/);
});

test("custom terms and toggles render accurately, with escaped client text", () => {
  const invoice = fixture();
  invoice.support = { ...invoice.support, durationDays: 30, changeRequests: 1, handover: false, customTerms: "Priority support <script>alert(1)</script>" };
  const html = renderToStaticMarkup(React.createElement(InvoiceDocument, { invoice }));
  assert.match(html, /30 Days of Free Bug Fixes/);
  assert.match(html, /1 Complimentary Minor Change Request</);
  assert.doesNotMatch(html, /Deployment &amp; Handover Assistance/);
  assert.match(html, /09 Dec 2026/);
  assert.match(html, /&lt;script&gt;/);
  assert.ok(html.indexOf('class="invoice-support ') > html.indexOf("Amount to pay"));
  assert.ok(html.indexOf('class="invoice-support ') < html.indexOf("<footer"));
  invoice.support = { ...invoice.support, bugFixes: false, minorChanges: false, handover: false, guidance: false, customTerms: "" };
  assert.doesNotMatch(renderToStaticMarkup(React.createElement(InvoiceDocument, { invoice })), /Post-Delivery Support &amp; Benefits/);
  invoice.support = { ...supportLib.createDefaultSupport(), changeRequests: 0 };
  assert.doesNotMatch(renderToStaticMarkup(React.createElement(InvoiceDocument, { invoice })), /Complimentary Minor Change/);
});

test("old tokens retain absence of terms; new tokens preserve customized snapshots", () => {
  const previous = process.env.INVOICE_SIGNING_SECRET;
  process.env.INVOICE_SIGNING_SECRET = "test-only-invoice-secret-at-least-32-characters";
  try {
    const old = fixture(); delete old.support;
    const readOld = tokens.readInvoiceToken(tokens.createInvoiceToken(old));
    assert.ok(readOld);
    assert.equal(readOld.support, undefined);
    assert.doesNotMatch(renderToStaticMarkup(React.createElement(InvoiceDocument, { invoice: readOld })), /Post-Delivery Support/);
    const invoice = fixture();
    invoice.support = { ...invoice.support, durationDays: 90, changeRequests: 3, guidance: false, customTerms: "Client-specific terms" };
    const read = tokens.readInvoiceToken(tokens.createInvoiceToken(invoice));
    assert.deepEqual(read.support, invoice.support);
    assert.equal(validation.validateInvoiceDraft(read), null);
    assert.deepEqual(types.calculateInvoiceTotals(read), types.calculateInvoiceTotals(old));
  } finally {
    if (previous === undefined) delete process.env.INVOICE_SIGNING_SECRET; else process.env.INVOICE_SIGNING_SECRET = previous;
  }
});

test("short and multi-page content retain all services, financial totals and support terms", () => {
  for (const [count, long] of [[1, false], [1, true], [20, true]]) {
    const invoice = fixture(count, long);
    const safe = validation.sanitizeInvoiceDraft(invoice);
    assert.equal(validation.validateInvoiceDraft(safe), null);
    const html = renderToStaticMarkup(React.createElement(InvoiceDocument, { invoice }));
    assert.equal((html.match(/class="invoice-service-row /g) || []).length, count);
    assert.match(html, /60 Days of Free Bug Fixes/);
    assert.match(html, /08 Jan 2027/);
    assert.equal((html.match(/Post-Delivery Support &amp; Benefits<\/h2>/g) || []).length, 1);
    assert.deepEqual(types.calculateInvoiceTotals(safe), types.calculateInvoiceTotals({ ...safe, support: undefined }));
  }
});
