---
title: Overview
description: Add third-party services to your application
keywords: [provider, OAuth, SMS, Storage, Email, Payment, Captcha]
authors: [kininaru]
---

Casdoor uses providers to provide third-party services for the platform. In this chapter you will learn how to add providers for Casdoor.

## What we have

Now, we have 6 kinds of providers:

- **OAuth providers**

  Casdoor allows users to sign in through other OAuth applications. You can add GitHub, Google, QQ and many other OAuth applications to Casdoor. For more details, please see [OAuth](/docs/provider/oauth/overview).
- **SMS Providers**

  Casdoor sends SMS to users when they want to verify their phone numbers. SMS providers are used to send SMS in Casdoor.
- **Email Providers**

  Email providers are similar to SMS providers.
- **Storage Providers**

  Casdoor allows users to store files using local file system or cloud oss services.
- **Payment Provider**

  Casdoor can add payment providers, which will be used to add payment methods to products on the product page.
  Currently, the supported payment providers include Alipay, WeChat Pay, PayPal and GC.
- **Captcha Provider**

  Casdoor supports configurable captcha in user flows. Currently, the supported captcha providers include Default Captcha, reCAPTCHA, hCaptcha, Aliyun Captcha and Cloudflare Turnstile.

## How to config and use

### Scope

Providers have different scopes. The scope of the provider depends on the creator. Only the Administrator has the permission to add and config providers. There are two kinds of Administrator in Casdoor.

- **Global Administrator**: All users under the `built-in` organization and the user enable `IsGlobalAdmin`. The providers created by Global Administrator can be used by all applications.

- **Organization Administrator**: The user enable `IsAdmin`. The providers created by Organization Administrator can **only** be used by the applications under the organization. (Developing...)

### Add to application

Following under steps to add providers to your application. You still can **not** use the provider in your application before you add the provider to it.

1. Go to the application edit page and add a new provider row.

    ![provider_overview_add](/img/providers/provider_overview_add.png)

2. Select a provider you want to add to the application. Here will show all the providers that the application can use.

    ![provider_overview_select](/img/providers/provider_overview_select.png)

3. For **OAuth** and **Captcha** providers, you can config the usage. See [OAuth](/docs/provider/oauth/overview/#applied-in-application) and [Captcha](/docs/provider/captcha/default#applied-in-application)

    ![provider_overview_config](/img/providers/provider_overview_config.png)

Last, **save** the config. Then you can have a try to use the provider in your application.
