---
title: Choose the sign-in methods
sidebar_label: Sign-in methods
description: Choose which sign-in methods an application offers on its sign-in page, such as password, verification code, WebAuthn, and LDAP, and in which order.
keywords: [signin, method, password, verification code, WebAuthn, LDAP]
authors: [HGZ-20]
---

This guide explains how to choose the sign-in methods that the sign-in page of an application offers, in which order, and with which restrictions.

---

#### Learning outcomes

- Add, remove, and order sign-in methods.
- Restrict a method with a rule.

#### What you need

- An [application](/docs/application/overview)

---

## About sign-in methods

The **Signin methods** table of an application lists the methods on its sign-in page, in order. The available methods include **Password**, **Verification code**, **Magic link**, **WebAuthn**, **LDAP**, **Face ID**, **Device login**, and **WeChat**. All methods except LDAP are on by default. An application needs at least one method.

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
| Password          | `All` (default), `Non-LDAP` | `All` — LDAP users can sign in with password. `Non-LDAP` — LDAP users cannot use password sign-in. |
| Verification code | `All` (default), `Email only`, `Phone only` | Which channel to use for the code: both, email only, or phone only. |
| Device login      | `Tab` (default), `Login page` | `Tab` shows the device login QR code in its own tab. `Login page` shows it next to the sign-in form, so users signed in to your mobile app can [scan it to sign in to the website](/docs/how-to-connect/oauth#scanning-the-websites-qr-code-with-your-app). |

:::tip
A native app can sign users in with a verification code without opening the sign-in page. Turn on the [verification code grant](/docs/how-to-connect/oauth#verification-code-grant), which also signs up phone numbers and email addresses that have no account yet.
:::

## See also

- [Sign-in items](/docs/application/signin-items-table)
- [Set up WebAuthn sign-in](/docs/how-to-connect/webauthn)
- [Set up Face ID sign-in](/docs/how-to-connect/face-id)
- [LDAP](/docs/ldap/overview)
