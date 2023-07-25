---
title: Overview
description: Add a captcha to your application
keywords: [captcha]
authors: [Resulte]
---

Casdoor can be configured to support different captchas to check whether the operation is made by human. If you add a captcha provider and applied it in the application, when the user logins, registers or forgets password and needs to send a code, then a captcha check dialog will appear to check whether the operation is made by human.

Now, Casdoor supports many captcha providers. Here are the providers Casdoor supporting:

|                         **Default**                          |                     Cloudflare Turnstile                     |                        **reCAPTCHA**                         |                         **hCaptcha**                         |                      **Aliyun Captcha**                      |                                  Geetest                                   |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |:--------------------------------------------------------------------------:|
| <img src="https://cdn.casbin.org/img/social_default.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_cloudflare.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_recaptcha.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_hcaptcha.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_aliyun.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_geetest.png" width="40"></img> |
|                            **✅**                             |                            **✅**                             |                            **✅**                             |                            **✅**                             |                            **✅**                             |                                   **✅**                                    |

We will show you how to apply  a captcha and add it to Casdoor.

## Add a captcha provider

1. Navigate to your Casdoor index page
2. Click `Providers` in the top bar
3. Click `Add`, then you can see a new provider in the list top
4. Click the new provider to modify it
5. Select `Captcha` in  `Category`
6. Choose the Captcha provider you need in `Type`
7. Fill the most important information, different captcha providers have different information that needs to be filled in

## Applied in application

1. Click `Applicaton` in the top bar and choose one application to edit.
2. Click provider add button, and select the provider you just added.
3. Done!
