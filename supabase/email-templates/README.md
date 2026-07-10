# Supabase email branding — what to do (5 minutes)

The default "Confirm your email address" mail is Supabase's generic template.
The template CONTENT can be replaced from the dashboard; the SENDER address
(`noreply@mail.app.supabase.io`) can only change with custom SMTP.

## 1. Replace the template (removes Supabase branding from the body)

1. Open https://supabase.com/dashboard → your project.
2. Go to **Authentication → Emails → Templates** (older UI: Auth → Email Templates).
3. Select **Confirm signup**.
4. Subject: `Activate your QUBITRIX access`
5. Delete the default body and paste the whole contents of
   [`confirm-signup.html`](./confirm-signup.html). Save.
6. Sign up with a test email — the mail is now dark, QUBITRIX-branded,
   with no "powered by Supabase" footer.

Repeat the same idea for **Magic Link / Reset password / Change email**
templates if you want them branded too (reuse the HTML, change the heading
and keep each template's own `{{ .ConfirmationURL }}` variable).

## 2. (Optional, recommended before launch) Custom SMTP — fixes the sender

To send from `hello@qubitrixai.com` instead of `noreply@mail.app.supabase.io`:

1. Create a free account at Resend (resend.com) or Brevo, verify the
   qubitrixai.com domain (add their DNS records).
2. Supabase Dashboard → **Project Settings → Authentication → SMTP settings**
   → enable **Custom SMTP** and paste the host/port/user/password from Resend.
3. Set sender name `QUBITRIX` and sender email `hello@qubitrixai.com`.

Without this step the email body is branded but the from-address stays Supabase's.

Note: the built-in Supabase mailer is rate-limited (~2 emails/hour on free
projects) — custom SMTP also removes that limit.
