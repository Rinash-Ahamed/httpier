# Invoice support benefits

New invoices include configurable post-delivery benefits under **05 - Support**.
Defaults are 60 calendar days, two minor change requests, and all four benefits
enabled. Enter the official delivery date to calculate expiry; the invoice date
is never substituted for the delivery date. Without delivery, the invoice states
that expiry is pending confirmation.

Benefits may be toggled independently. Zero complimentary requests omits that
benefit. Client-specific terms appear as additional terms. Disable every benefit
and clear additional terms to omit the section completely.

Support data is an optional versioned part of the invoice snapshot. Defaults are
created only for new drafts; old encrypted links without support data continue
to show no support promises. Existing customized snapshots retain their settings
and custom terms. Future copy changes should use a new support version rather
than rewriting version 1. No financial calculations, payment details, invoice
numbering or persistence behavior changes.

## Verification

Run the existing automated tests and invoice regression tests:

```powershell
node --test --test-isolation=none tests/client-records.test.mjs tests/contact.test.mjs tests/invoice-support.test.mjs
npm.cmd run lint
npm.cmd run build
```

Optional Windows Chrome PDF layout checks, **after the build** (Next cleans
temporary files under `.next`):

```powershell
npm.cmd install --prefix .next/invoice-qa-deps --no-save pdfjs-dist @napi-rs/canvas
node scripts/check-invoice-layout.mjs
node scripts/render-invoice-layout.mjs
```

These use fictional client data and generate ignored HTML, PDF and PNG fixtures
under `.next/invoice-qa`. No Firebase credentials, cloud writes, or production
dependency changes are involved. The render check covers short service text,
a long description, and a 20-service multi-page invoice, and asserts that
single-service examples fit one page and the footer is not orphaned. Inspect
the rendered PNGs for typography, benefit placement, expiry, and page breaks.
