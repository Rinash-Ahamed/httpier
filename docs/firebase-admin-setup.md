# Firebase admin portal

## Console setup

1. In your existing Firebase project, create a **Cloud Firestore** database in
   production mode, using the default database ID `(default)`.
2. In Authentication > Users, add `ahamedrinash@gmail.com` with an email/password
   account. Enabling the sign-in provider does not create a user automatically.
   Choose the password in Firebase; never put it in source code or share it here.
3. In Project settings > General, register a web app if needed. Copy its API key
   to `FIREBASE_WEB_API_KEY` and project ID to `FIREBASE_PROJECT_ID`.
4. In Project settings > Service accounts, generate a private key. Put the JSON
   `client_email` in `FIREBASE_CLIENT_EMAIL` and `private_key` in
   `FIREBASE_PRIVATE_KEY`. Keep the key in environment secrets, never `public/`
   or Git. Escaped `\n` sequences and real newlines are supported.
5. Set `FIREBASE_ADMIN_EMAIL=ahamedrinash@gmail.com`. Prefer also setting
   `FIREBASE_ADMIN_UID` to that user's Authentication UID. When present, only
   that UID is accepted, regardless of the email setting.
6. Apply `firestore.rules` in Firestore > Rules for a dedicated HTTPier project.
   If this project already serves another application, merge the `/clients`
   restrictions carefully with its existing rules instead of replacing them.
   Existing broad allow rules must not grant access to `/clients`.
7. Add these variables to `.env.local` and Vercel (Production and any intended
   Preview environment). Restart development and redeploy Vercel after changes.

The service account needs Firebase Authentication access to verify and create
sessions, and Firestore data access. The Admin SDK bypasses Firestore rules;
the server checks the Firebase session and admin allowlist before every read
and write. No Firebase SDK, tokens, or private keys are sent to public pages.

## Usage

- `/login`: sign in with your Firebase account. Old shared-password sessions no
  longer grant access. There is no public account-registration flow.
- `/admin/clients`: searchable client list, status filters and INR summaries for
  the most recently updated 200 records.
- `/admin/clients/new`: client/company/contact/address details, project status,
  agreed total including applicable taxes, due date and internal notes.
- `/admin/clients/[id]`: edit the client and record dated payments with a method,
  transaction reference and notes. The latest 200 payments are shown.

Money is stored as integer paise. Received totals update in the same transaction
as the payment entry. A payment request ID prevents retries from counting twice.
Amounts above the balance and fees below payments already received are rejected.
Payment status is calculated as Not quoted, Unpaid, Part-paid, Paid or Overdue.
Recording a payment is manual bookkeeping, not a bank or UPI confirmation.
Records are retained; there is no destructive delete action in this version.

The existing invoice generator remains available. Its public links still contain
invoice snapshots; they are not live views of client balances or automatically
synced with these manually recorded payments.

## Verification limits

The application can build without Firebase credentials. Live login, database
reads and writes require the console setup and valid credentials. Use a test
client to verify save, edit, payment history, recalculated balance, unauthorized
sign-in denial and sign-out before adding actual client records.
