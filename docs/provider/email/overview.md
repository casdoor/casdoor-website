---
title: Email provider overview
description: Configure SMTP for verification emails and password reset.
keywords: [email, SMTP, verification]
authors: [kininaru]
---

## Add an email provider

1. Click **Add** and choose **Email** under **Category**.
2. Enter **Username**, **Password**, **Host**, and **Port** for your SMTP server.
3. Set **Email Title** and **Email Content** (templates), then save.

![Email provider](/img/providers/emailprovider.png)
![Email Config](/img/providers/emailconfig.png)

## Proxy

If the Casdoor server cannot reach the SMTP server directly (e.g. Gmail from a restricted network), enable **Enable proxy**. Email is then sent via the SOCKS5 proxy defined in Casdoor’s config.

## Email content and placeholders

Templates support placeholders and the `<reset-link>` block for password reset.

| Placeholder | Description |
|-------------|-------------|
| **%{'{'}user.friendlyName{'}'}** | User’s display or friendly name. |
| **%s** | Verification code (for auth emails). |
| **%link** | Password reset URL. Use only inside `<reset-link>...</reset-link>`. |

### Password reset link

To let users reset the password by clicking a link in the email:

1. Put the link text and `%link` inside `<reset-link>` tags.
2. The block is shown only in password-reset emails; it is removed for signup/login verification.

**Plain text example:**

```text
You have requested a verification code at Casdoor. Here is your code: %s, please enter in 5 minutes. <reset-link>Or click %link to reset</reset-link>
```

**HTML example:**

```html
<!DOCTYPE html>
<html>
<body>
    <h2>Password Reset Request</h2>
    <p>Hello %{'{'}user.friendlyName{'}'},</p>
    <p>Your verification code is: <strong>%s</strong></p>
    <p>This code will expire in 5 minutes.</p>
    <reset-link>
        <p>Alternatively, you can <a href="%link">click here to reset your password</a> directly.</p>
    </reset-link>
    <p>If you didn't request this, please ignore this email.</p>
</body>
</html>
```

![Html template](/img/providers/email/email-template.png)

The `<reset-link>` block is omitted for non–password-reset emails (signup, login verification).
