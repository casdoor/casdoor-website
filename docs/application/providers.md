---
title: Providers
description: Configure different providers
keywords: [providers]
authors: [zhuying]
---

```mdx-code-block
import styles from '../styles.module.css';
```

You can also add third-party apps for sign up by adding providers and setting their properties.

![Select providers](/img/application/config/selectproviders.png)

Our provider can differentiate between different scenarios, and you can choose different providers for different functionalities by choosing rules. For a detailed explanation of each rule item, please refer to the table below.

|      Rule       | Description                                                                                                                                                                                        |
|:---------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     Signup      | For the registration scenario, you can choose the "signup" rule for the provider to send the corresponding SMS or Email template.                                                                  |
|      Login      | For the login scenario, you can choose the "login" rule for the provider                                                                                                                           | 
| Forget Password | When selecting a provider for the "Forget Password" scenario in your application, you can choose the "Forget Password" rule.                                                                       |
| Reset Password  | When selecting a provider for the "Reset Password" scenario in your application, you can choose the "Reset Password" rule.                                                                         |
|     Set MFA     | For MFA Setup Verification scenario, you can choose the "Set MFA" rule.                                                                                                                            |
|    MFA Auth     | For MFA Auth Verification scenario, you can choose the "MFA Auth" rule. For more information about mfa, you can refer to the **[MFA](user/multi-factor-authentication.md)**                        | 
|       all       | If you want to use a single provider for all functionalities, you can choose the "all" rule. This means that the same provider will be used for all scenarios mentioned above in your application. |

![Select rules](/img/application/providers/choose_providers.png)

