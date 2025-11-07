---
title: Overview
description: Add third-party services to your application
keywords: [provider, OAuth, SMS, Storage, Email, Payment, Captcha]
authors: [kininaru]
---

Casdoor uses providers to offer third-party services for the platform. In this chapter, you will learn how to add providers to Casdoor.

## What We Have

Currently, we have seven types of providers:

- **OAuth Providers**

  Casdoor allows users to sign in through other OAuth applications. You can add GitHub, Google, QQ, and many other OAuth applications to Casdoor. For more details, refer to the [OAuth](/docs/provider/oauth/overview) section.
- **SMS Providers**

  Casdoor sends SMS messages to users when they need to verify their phone numbers. SMS providers are used to send SMS messages in Casdoor.
- **Email Providers**

  Email providers are similar to SMS providers.
- **Storage Providers**

  Casdoor allows users to store files using the local file system or cloud OSS services.
- **Payment Providers**

  Casdoor can add payment providers, which will be used to add payment methods to products on the product page. Currently, the supported payment providers include Alipay, WeChat Pay, PayPal, and GC.
- **Captcha Providers**

  Casdoor supports configurable captcha in user flows. Currently, the supported captcha providers include Default Captcha, reCAPTCHA, hCaptcha, Alibaba Cloud Captcha, and Cloudflare Turnstile.
- **MFA Providers**

  Casdoor supports external authentication servers for multi-factor authentication. Currently supports RADIUS servers for authenticating users as a second factor during login.

## How to Configure and Use

### Scope

Providers have different scopes determined by their creator. Only Administrators have permission to add and configure providers. There are two types of Administrators in Casdoor:

- **Global Administrator**: All users under the `built-in` organization and users who have enabled `IsGlobalAdmin`. Providers created by Global Administrators can be used by all applications.

- **Organization Administrator**: Users who have enabled `IsAdmin`. Providers created by Organization Administrators can **only** be used by applications under the same organization (under development...).

### Add to Application

Follow the steps below to add providers to your application. Note that you cannot use a provider in your application until you have added it.

1. Go to the application edit page and add a new provider row.

    ![provider_overview_add](/img/providers/provider_overview_add.png)

2. Select a provider that you want to add to the application. You will see all providers that the application can use.

    ![provider_overview_select](/img/providers/provider_overview_select.png)

3. For **OAuth** and **Captcha** providers, you can configure their usage. See [OAuth](/docs/provider/oauth/overview/#applied-in-application) and [Captcha](/docs/provider/captcha/default#applied-in-application) for more information.

    ![provider_overview_config](/img/providers/provider_overview_config.png)

Finally, **save** the configuration. You can now try using the provider in your application.
