---
title: Overview
description: Add third-party services to your application
keywords: [provider, OAuth, SMS, Email, Payment, Captcha]
---

Casdoor uses providers to provide third-party services for the platform. In this chapter you will learn how to add providers for Casdoor.

Casdoor will only use providers added by the organization owner when it receives a request from a user in the organization.

Now, we have 5 kinds of providers:

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

  Casdoor supports configurable captcha in user flows. Currently, the supported captcha providers include Default Captcha, reCAPTCHA, hCaptcha and Aliyun Captcha.
