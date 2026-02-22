---
title: Providers
description: Attach providers to your application and set rules (signup, login, forgot password, MFA, etc.).
keywords: [providers, OAuth, email, SMS, MFA]
authors: [zhuying]
---

```mdx-code-block
import styles from '../styles.module.css';
```

Add **providers** to your application so users can sign up or sign in with third-party identity, email, or SMS. For each provider you choose a **rule** that defines when it is used:

![Select providers](/img/application/config/selectproviders.png)

Rule reference:

| Rule | Use |
|------|-----|
| **Signup** | Send SMS/email templates during registration. |
| **Login** | Use this provider for sign-in. |
| **Forget Password** | Send reset links or codes. See [Email provider](/docs/provider/email/overview#password-reset-link) for reset links. |
| **Reset Password** | Use when the user resets their password. |
| **Set MFA** | Send codes during MFA setup. |
| **MFA Auth** | Use for MFA verification at login. See [MFA](/docs/user/multi-factor-authentication). |
| **all** | Use this provider for every scenario above. |

![Select rules](/img/application/providers/choose_providers.png)

![Select regions](/img/application/providers/choose_region.png)
