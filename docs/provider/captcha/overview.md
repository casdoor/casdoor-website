---
title: Captcha provider overview
description: Add captcha to sign-in, sign-up, and password reset.
keywords: [captcha, reCAPTCHA, Turnstile, hCaptcha]
authors: [Resulte]
---

Casdoor can require a **captcha** before sending verification codes (sign-in, sign-up, forgot password). Add a captcha provider and attach it to your application; you can then choose when the captcha is shown.

Supported providers: **Default**, **Cloudflare Turnstile**, **reCAPTCHA**, **hCaptcha**, **Alibaba Cloud Captcha**, **Geetest**.

| Default | Cloudflare Turnstile | reCAPTCHA | hCaptcha | Alibaba Cloud | Geetest |
|---------|----------------------|-----------|----------|---------------|---------|
| <img src="https://cdn.casbin.org/img/social_default.png" width="40" /> | <img src="https://cdn.casbin.org/img/social_cloudflare.png" width="40" /> | <img src="https://cdn.casbin.org/img/social_recaptcha.png" width="40" /> | <img src="https://cdn.casbin.org/img/social_hcaptcha.png" width="40" /> | <img src="https://cdn.casbin.org/img/social_aliyun.png" width="40" /> | <img src="https://cdn.casbin.org/img/social_geetest.png" width="40" /> |

## Add a captcha provider

1. Go to **Providers** → **Add** → select the new provider.
2. Set **Category** to **Captcha** and **Type** to the provider you want.
3. Fill in the required fields (varies by provider) and save.

## Use in an application

1. Open **Applications** → select an application → add the captcha provider.
2. Set the **Provider rule** for when captcha is shown:
   - **None** — Captcha disabled (no verification).
   - **Dynamic** — Show captcha after 5 failed login attempts.
   - **Always** — Require captcha on every login.
   - **Internet-Only** — Show captcha only for requests from the public internet.

![Default provider app](/img/providers/captcha/default_provider_app.png)

<video src="/video/provider/default_provider_app.mp4" controls="controls" width="100%"></video>

:::tip
For captcha, **None** means verification is disabled. This is different from SMS/Email providers where "None" can mean "apply to all scenarios".
:::
