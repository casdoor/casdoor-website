---
title: Choose the sign-in methods
sidebar_label: Sign-in methods
description: Choose which sign-in methods an application offers on its sign-in page, such as password, verification code, magic link, WebAuthn, and LDAP, and in which order.
keywords: [signin, method, password, verification code, magic link, WebAuthn, LDAP]
authors: [HGZ-20]
---

This guide explains how to choose the sign-in methods that the sign-in page of an application offers, in which order, and with which restrictions.

---

#### Learning outcomes

- Add, remove, and order sign-in methods.
- Restrict a method with a rule.
- Let users sign in with a link sent by email.

#### What you need

- An [application](/docs/application/overview)

---

## About sign-in methods

The **Signin methods** table of an application lists the methods on its sign-in page, in order. The available methods include **Password**, **Verification code**, **Magic link**, **WebAuthn**, **LDAP**, **Face ID**, **Device login**, and **WeChat**. A new application has **Password**, **Verification code**, **WebAuthn**, and **Face ID**. Add the other methods yourself. An application needs at least one method.

![Signin methods table of an application](/img/application/signin-methods/signin-methods.png)

| Column | Description |
|---|---|
| Name | Method |
| Display name | Label that users see |
| Rule | Restriction of the method. See [Method rules](#method-rules) |
| Action | Move the row up or down, or delete it |

## Configure the methods

1. In the Casdoor admin console, open the edit page of the application.
1. In **Signin methods**, add, remove, and order the methods.
1. Optionally, change the display name of a method and select a rule.
1. Save the application.

For example, to prefer sign-in with an email code and offer the password second:

1. Put **Verification code** first and **Password** second.
1. Set the rule of **Verification code** to `Email only`, so that the code goes only by email.
1. Set the display name of **Verification code** to a clear label, such as `Email login`.

![Signin methods configured for email code first](/img/application/signin-methods/signin-methods-demo-config.png)

The sign-in page then looks like this:

![Sign-in page with email code first](/img/application/signin-methods/signin-methods-demo-page.png)

<video src="/video/application/signin-methods-demo.mp4" controls="controls" width="100%"></video>

## Method rules

| Method            | Rules | Description |
|-------------------|-------|-------------|
| Password          | `All` (default), `Non-LDAP`, `Hide password` | `All`: LDAP users can sign in with their password. `Non-LDAP`: LDAP users can't use password sign-in. `Hide password`: turns password sign-in off, see [Hide password sign-in](/docs/application/signin-methods#hide-password). |
| Verification code | `All` (default), `Email only`, `Phone only` | Which channel to use for the code: both, email only, or phone only. |
| Magic link        | `Sign in only` (default), `Sign in or sign up` | `Sign in only` signs in existing users. `Sign in or sign up` also creates an account for an unknown email address. See [Sign in with a magic link](/docs/application/signin-methods#magic-link). |
| Device login      | `Tab` (default), `Login page` | `Tab` shows the device login QR code in its own tab. `Login page` shows it next to the sign-in form, so users signed in to your mobile app can [scan it to sign in to the website](/docs/how-to-connect/oauth#scanning-the-websites-qr-code-with-your-app). |
| WeChat            | `Tab` (default), `Login page` | `Tab` shows the WeChat QR code in its own tab. `Login page` shows it below the sign-in form. Both need a WeChat provider in the **Providers** of the application. See [WeChat](/docs/provider/oauth/Wechat#enable-wechat-on-the-login-page). |

:::tip
A native app can sign users in with a verification code without opening the sign-in page. Turn on the [verification code grant](/docs/how-to-connect/oauth#verification-code-grant), which also signs up phone numbers and email addresses that have no account yet.
:::

## Hide password sign-in {#hide-password}

The `Hide password` rule of **Password** removes password sign-in from the sign-in page and turns it off on the server. `/api/login` then rejects every request that signs in with a password, whatever `signinMethod` the client sends. The only exception is LDAP sign-in, when the application has the **LDAP** method.

Use it when users sign in only with providers, codes, or other methods, and a password must not work even through the API. Applications saved with the older value `Hide-Password` behave the same.

## Sign in with a magic link {#magic-link}

With the **Magic link** method, the user enters an email address and Casdoor sends a one-time sign-in link to it. Opening the link signs the user in.

### Set up the magic link

1. Add an Email provider to the **Providers** of the application, with the rule `Magic link` or `All`. See [Provider rules](/docs/application/providers#provider-rules).
1. Set `origin` (or `originFrontend`) in `conf/app.conf` to the public URL of Casdoor. Without it, Casdoor refuses to send links with the error `please set "origin" in conf/app.conf to send magic links`, unless the request comes to a loopback host such as `localhost`. See [Configuration](/docs/basic/configuration).
1. Add **Magic link** to **Signin methods** and select a rule.
1. Save the application.

### How the user signs in

1. On the sign-in page, the user selects the magic link method, enters an email address, and clicks **Send sign-in link**.
1. The user opens the link in the email. The link goes back to the sign-in page the user started from, so an OAuth 2.0 or CAS sign-in continues after the link.
1. Casdoor signs the user in and marks the email address of the user as verified. If the organization requires multi-factor authentication (MFA), the user completes it next.

### Limits

- A link works once, and only in the browser that asked for it.
- A link expires after `verificationCodeTimeout` minutes, 10 by default. See [Configuration](/docs/basic/configuration).
- A new link for the same email address or from the same IP address can be sent after the **Code resend timeout** of the application, 60 seconds by default.
- Forbidden and deleted users can't sign in with a link.

### Sign up with a magic link

With the rule `Sign in only`, a link sent to an unknown email address fails with "the user does not exist, please sign up first". With the rule `Sign in or sign up`, the link creates the account. This also needs:

- **Enable signup** on, and **Disable self signup** off.
- No required sign-up item other than ID, Username, Display name, Email, Password, Confirm password, Agreement, Invitation code, Signup button, and Providers. Otherwise, Casdoor refuses with "The signup item: `<item>` is required, so the magic link cannot sign up a new user".
- An invitation code, if the application requires one.

The new user gets the email address as the display name. If the organization has **Use Email as username** on, the email address is also the username.

### Email content

Casdoor uses the **Content** of the Email provider if it contains `%link`, and a built-in template otherwise. The content can use these placeholders:

| Placeholder | Value |
|---|---|
| `%link` | The sign-in link |
| `%expireTime` | Minutes until the link expires |
| `%{user.friendlyName}` | The name of the user, or `Hi` for a new user |

The subject is the **Title** of the provider, or `Magic Link` if the title is empty.

## See also

- [Sign-in items](/docs/application/signin-items-table)
- [Add providers to an application](/docs/application/providers)
- [Set up WebAuthn sign-in](/docs/how-to-connect/webauthn)
- [Set up Face ID sign-in](/docs/how-to-connect/face-id)
- [LDAP](/docs/ldap/overview)
