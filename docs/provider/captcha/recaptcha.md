---
title: reCAPTCHA
description: Add Google reCAPTCHA v2 Checkbox to your application.
keywords: [reCAPTCHA, captcha]
authors: [Resulte]
---

Casdoor uses **reCAPTCHA v2 Checkbox** from Google. See [reCAPTCHA docs](https://developers.google.com/recaptcha) and [verify API](https://developers.google.com/recaptcha/docs/verify).

## Create an API key pair

1. [Register](http://www.google.com/recaptcha/admin) a reCAPTCHA key pair for your site (site key + secret key).
2. Choose the [reCAPTCHA type](https://developers.google.com/recaptcha/docs/versions) and add authorized domains or [package names](https://developer.android.com/guide/topics/manifest/manifest-element#package).
3. Accept the terms and click **Register** to get the **site key** and **secret key**.

![reCAPTCHA create apiKey](/img/providers/captcha/recaptcha_create_apiKey.png)
![reCAPTCHA apiKey](/img/providers/captcha/recaptcha_apikey.png)

## Configure in Casdoor

Create a **Captcha** provider, set **Type** to **reCAPTCHA**, and enter the site key and secret key. Use **Preview** to check the captcha.

![reCAPTCHA provider](/img/providers/captcha/recaptcha_provider.png)
![reCAPTCHA preview](/img/providers/captcha/recaptcha_preview.png)

## Use in an application

Edit the application, add the reCAPTCHA provider, and save.

![reCAPTCHA provider app](/img/providers/captcha/recaptcha_provider_app.png)
