---
title: Overview
description: Add a captcha to your application
keywords: [captcha]
authors: [Resulte]
---

Casdoor can be configured to support different captchas to verify if the operation is performed by a human. By adding a captcha provider and applying it in the application, when users login, register, or forget their password and need to send a code, a captcha check dialog will appear to verify if the operation is performed by a human.

Currently, Casdoor supports multiple captcha providers. The following are the providers supported by Casdoor:

|                                **Default**                                 |                             Cloudflare Turnstile                              |                                **reCAPTCHA**                                 |                                **hCaptcha**                                 |                         **Alibaba Cloud Captcha**                         |                                  Geetest                                   |
|:--------------------------------------------------------------------------:|:-----------------------------------------------------------------------------:|:----------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|:-------------------------------------------------------------------------:|:--------------------------------------------------------------------------:|
| <img src="https://cdn.casbin.org/img/social_default.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_cloudflare.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_recaptcha.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_hcaptcha.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_aliyun.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_geetest.png" width="40"></img> |
|                                   **✅**                                    |                                     **✅**                                     |                                    **✅**                                     |                                    **✅**                                    |                                   **✅**                                   |                                   **✅**                                    |

We will show you how to apply a captcha and add it to Casdoor.

## Add a captcha provider

1. Navigate to your Casdoor index page.
2. Click on `Providers` in the top bar.
3. Click on `Add`, then you will see a new provider in the top list.
4. Click on the new provider to modify it.
5. Select `Captcha` in the `Category`.
6. Choose the captcha provider you need in the `Type`.
7. Fill in the most important information. Different captcha providers may require different information to be filled in.

## Applying in the application

1. Click on `Application` in the top bar and choose one application to edit.
2. Click on the provider add button and select the provider you just added.
3. Configure the provider rule to control when CAPTCHA verification appears:
   - **None**: Disables CAPTCHA completely - no verification modal will appear
   - **Dynamic**: Shows CAPTCHA after 5 failed login attempts
   - **Always**: Requires CAPTCHA for every login attempt
   - **Internet-Only**: Shows CAPTCHA only for public internet requests
4. Done!

:::tip Disabling CAPTCHA
To completely disable CAPTCHA verification, set the provider rule to **None**. This is different from SMS/Email providers where "None" means "apply to all scenarios". For CAPTCHA, "None" specifically means the verification is disabled.
:::
