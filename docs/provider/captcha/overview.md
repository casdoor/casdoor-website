---
title: Captcha providers
sidebar_label: Overview
description: Require a captcha at sign-in, at sign-up, and before Casdoor sends verification codes, and choose when the captcha appears.
keywords: [captcha, reCAPTCHA, Turnstile, hCaptcha]
authors: [Resulte]
---

A captcha provider makes users solve a captcha at sign-in and before Casdoor sends a verification code, for example at sign-up and on the forgot-password page. Captchas protect the sign-in page against password guessing, and SMS and email providers against bots that request codes.

## Supported types

| Type | Service |
|---|---|
| `Default` | The built-in image captcha of Casdoor. See [Default captcha](/docs/provider/captcha/default) |
| `Cloudflare Turnstile` | See [Cloudflare Turnstile](/docs/provider/captcha/cloudflareTurnstile) |
| `reCAPTCHA`, `reCAPTCHA v2`, `reCAPTCHA v3` | Google reCAPTCHA. See [reCAPTCHA](/docs/provider/captcha/recaptcha) |
| `hCaptcha` | See [hCaptcha](/docs/provider/captcha/hcaptcha) |
| `Aliyun Captcha` | See [Alibaba Cloud Captcha](/docs/provider/captcha/aliyunCaptcha) |
| `GEETEST` | See [Geetest](/docs/provider/captcha/geetest) |

| Default | Cloudflare Turnstile | reCAPTCHA | hCaptcha | Alibaba Cloud | Geetest |
|---------|----------------------|-----------|----------|---------------|---------|
| <img src="https://cdn.casbin.org/img/social_default.png" width="40" /> | <img src="https://cdn.casbin.org/img/social_cloudflare.png" width="40" /> | <img src="https://cdn.casbin.org/img/social_recaptcha.png" width="40" /> | <img src="https://cdn.casbin.org/img/social_hcaptcha.png" width="40" /> | <img src="https://cdn.casbin.org/img/social_aliyun.png" width="40" /> | <img src="https://cdn.casbin.org/img/social_geetest.png" width="40" /> |

## Add a captcha provider

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Captcha` and select the **Type**.
1. Fill in the fields of the type, such as the site key and the secret key.
1. Click **Preview** to check the captcha.
1. Save the provider.

## Add the captcha to an application {#use-in-an-application}

1. Open the edit page of the application and add the captcha provider on the **Providers** tab.
1. Select the **Rule** that decides when the captcha appears:

   | Rule | The captcha appears |
   |---|---|
   | `None` | Never. The captcha is off |
   | `Dynamic` | After the number of failed sign-ins of the user reaches the **Failed signin limit** of the application |
   | `Always` | At every sign-in |
   | `Internet-Only` | For requests from the public internet, not for requests from private networks |

   ![Captcha provider with its rule in the application](/img/providers/captcha/default_provider_app.png)

1. Save the application.

<video src="/video/provider/default_provider_app.mp4" controls="controls" width="100%"></video>

:::caution
An application can have at most one captcha provider. Casdoor rejects the save if you add a second one. To switch providers, remove the existing one first.
:::

:::note
For a captcha provider, the rule `None` turns the captcha off. For SMS and email providers, the rules have a different meaning. See [Provider rules](/docs/application/providers#provider-rules).
:::

To place the captcha in a dialog or directly on the sign-in page, see [Change the captcha](/docs/application/signin-items-table#captcha-rules).

## See also

- [Providers](/docs/provider/overview)
- [Add providers to an application](/docs/application/providers)
