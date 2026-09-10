# Supabase email branding — what to do (5 minutes)

The default Supabase auth emails ("Confirm your signup", "Reset password", etc.)
use Supabase's generic template and footer. The template CONTENT can be fully
replaced from the dashboard, for free, right now. The SENDER address
(`noreply@mail.app.supabase.io`) can only change with custom SMTP (step 2 below) —
that's the one thing dashboard editing alone can't fix.

## 1. Replace the templates (removes Supabase branding from the body)

1. Open https://supabase.com/dashboard → select the QUBITRIX project.
2. Go to **Authentication → Emails → Templates** (older UI: **Auth → Email Templates**).
3. **Confirm signup**
   - Subject: `Activate your QUBITRIX access`
   - Delete the default body, paste the full contents of
     [`confirm-signup.html`](./confirm-signup.html), click **Save**.
4. **Reset password**
   - Subject: `Reset your QUBITRIX password`
   - Delete the default body, paste the full contents of
     [`reset-password.html`](./reset-password.html), click **Save**.
   - This is the "forgot password" email — it's triggered by
     `supabase.auth.resetPasswordForEmail()` in
     [`src/pages/ResetPassword.tsx`](../../src/pages/ResetPassword.tsx), and the link
     lands the user on [`src/pages/UpdatePassword.tsx`](../../src/pages/UpdatePassword.tsx).
5. Both templates already use `{{ .ConfirmationURL }}` — Supabase fills that in per-recipient,
   don't edit or remove it.
6. Test:
   - Sign up with a real inbox you control → confirm the "Confirm signup" mail is dark,
     QUBITRIX-branded, no "powered by Supabase" footer.
   - Go to `/auth/reset`, submit that same email → confirm the "Reset password" mail looks the same way.

Optional: **Magic Link** and **Change email address** templates use the same variable and
can be branded the same way — copy either HTML file, swap the heading/subject, paste in.

## 2. (Recommended before launch) Custom SMTP — fixes the sender address & watermark

Editing the template body removes the visible Supabase branding inside the email, but the
message still arrives *from* `noreply@mail.app.supabase.io` and Supabase's free mailer adds
its own footer/warning line outside your template on some plans, plus a strict rate limit.
Custom SMTP removes both.

1. Create a free account at [Resend](https://resend.com) (or Brevo/Postmark) and verify the
   `qubitrixai.com` domain — add the DNS records (SPF/DKIM) they give you at your domain
   registrar.
2. Supabase Dashboard → **Project Settings → Authentication → SMTP Settings** → enable
   **Enable Custom SMTP** and fill in:
   - Host / port / username / password from Resend
   - Sender name: `QUBITRIX`
   - Sender email: `hello@qubitrixai.com` (must be on the verified domain)
3. Save, then re-test the signup and reset-password flows — the "From" address should now
   read `QUBITRIX <hello@qubitrixai.com>`.

Without this step: body is fully branded (step 1 alone gets you a good-looking email), but
the from-address and the built-in ~2 emails/hour rate limit remain Supabase's.

## Notes

- Template variables available: `{{ .ConfirmationURL }}`, `{{ .Token }}`, `{{ .TokenHash }}`,
  `{{ .SiteURL }}`, `{{ .Email }}` — only `.ConfirmationURL` is used in these templates.
- If you change the redirect paths in `ResetPassword.tsx` / `Auth.tsx`
  (`redirectTo`/`emailRedirectTo`), also add those exact URLs to
  **Authentication → URL Configuration → Redirect URLs** in the dashboard, or Supabase
  will reject the redirect and the link will fail silently.
