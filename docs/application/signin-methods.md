---
title: Sign-in methods
description: Configure which sign-in methods are available and their order on the login page.
keywords: [signin, method, password, verification code, WebAuthn, LDAP]
authors: [HGZ-20]
---

On the application edit page, configure the **sign-in items** table: add, remove, and reorder methods. Supported methods: **Password**, **Verification code**, **WebAuthn**, and **LDAP**.

![Signin Methods](/img/application/signin-methods/signin-methods.png)

Field reference:

| Column       | Description |
|-------------|-------------|
| Name        | Sign-in method name. |
| DisplayName | Label shown to users. |
| Rule        | Rule that customizes this method (see table below). |
| Action      | Move up, move down, or delete. |

Rules are supported for **Password** and **Verification code** only.

| Method            | Rules | Description |
|-------------------|-------|-------------|
| Password          | `All` (default), `Non-LDAP` | `All` — LDAP users can sign in with password. `Non-LDAP` — LDAP users cannot use password sign-in. |
| Verification code | `All` (default), `Email only`, `Phone only` | Which channel to use for the code: both, email only, or phone only. |

:::note
**Example:** Prefer email sign-in, then password. Add **Verification code** first and **Password** second; set the verification code rule to **Email only** so the code is sent only by email. Optionally set a clear display name for the verification code method (e.g. “Email login”).
:::

![Signin Methods](/img/application/signin-methods/signin-methods-demo-config.png)

![Signin Methods](/img/application/signin-methods/signin-methods-demo-page.png)

:::tip
All methods except LDAP are available by default. At least one sign-in method must be configured.
:::

Here is a video of how the sign-in method works:

<video src="/video/application/signin-methods-demo.mp4" controls="controls" width="100%"></video>
