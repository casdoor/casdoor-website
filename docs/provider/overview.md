---
title: Overview
description: Configure third-party providers for OAuth, SMS, email, storage, payment, captcha, and more.
keywords: [provider, OAuth, SMS, storage, email, payment, captcha, MFA]
authors: [kininaru]
---

**Providers** in Casdoor are connectors to third-party services. This section describes the provider types and how to add and use them.

## Provider types

Casdoor supports the following provider types:

| Type | Purpose |
|------|--------|
| **OAuth** | Sign-in via external identity providers (e.g. GitHub, Google, QQ). See [OAuth](/docs/provider/oauth/overview). |
| **SMS** | Send SMS verification codes for phone number verification. |
| **Email** | Send email (e.g. verification codes, notifications). |
| **Storage** | Store files on the local filesystem or cloud object storage (e.g. S3, OSS). |
| **Payment** | Accept payments (e.g. Alipay, WeChat Pay, PayPal). Used for products and subscriptions. |
| **Captcha** | Protect sign-in and sign-up with captcha (Default, reCAPTCHA, hCaptcha, Cloudflare Turnstile, Alibaba Cloud, etc.). |
| **Identity verification** | Verify user identity via third-party services (e.g. Jumio) using ID documents. |
| **MFA** | Second-factor authentication (e.g. RADIUS) for multi-factor authentication. |

## Scope and permissions

Only administrators can add and configure providers. Visibility of providers depends on who created them:

- **Global administrators**: Users in the `built-in` organization or with `IsGlobalAdmin` enabled. Providers they create can be used by **all** applications.
- **Organization administrators**: Users with `IsAdmin` enabled. Providers they create can be used **only** by applications in the same organization (behavior may evolve in future releases).

## Adding a provider to an application

A provider must be added to an application before it can be used. Steps:

1. Open the application edit page and add a new provider row.

   ![provider_overview_add](/img/providers/provider_overview_add.png)

2. Choose the provider to attach. The list shows all providers available to that application.

   ![provider_overview_select](/img/providers/provider_overview_select.png)

3. For **OAuth** and **Captcha** providers, further configure how they are used. See [OAuth](/docs/provider/oauth/overview/#applied-in-application) and [Captcha](/docs/provider/captcha/default#applied-in-application).

   ![provider_overview_config](/img/providers/provider_overview_config.png)

4. **Save** the application. The provider is now available for that application.
