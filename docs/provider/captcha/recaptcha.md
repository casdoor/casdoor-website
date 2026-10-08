---
title: Use Google reCAPTCHA
sidebar_label: reCAPTCHA
description: Protect sign-in and sign-up with Google reCAPTCHA.
keywords: [reCAPTCHA, captcha]
authors: [Resulte]
---

This guide explains how to use Google reCAPTCHA as the captcha of Casdoor. The type `reCAPTCHA` uses the reCAPTCHA v2 checkbox. See the [reCAPTCHA documentation](https://developers.google.com/recaptcha) and the [verification API](https://developers.google.com/recaptcha/docs/verify).

---

#### Learning outcomes

- Register a reCAPTCHA key pair.
- Add reCAPTCHA as a captcha provider in Casdoor.

#### What you need

- A Google account
- Administrator access to the Casdoor admin console

---

## Register a key pair {#create-an-api-key-pair}

1. [Register a site](http://www.google.com/recaptcha/admin) in the reCAPTCHA admin console.
1. Select the [reCAPTCHA type](https://developers.google.com/recaptcha/docs/versions) and add the domains of Casdoor, or the [package names](https://developer.android.com/guide/topics/manifest/manifest-element#package) of your apps.

   ![Site registration in reCAPTCHA](/img/providers/captcha/recaptcha_create_apiKey.png)

1. Accept the terms and click **Register**. Copy the site key and the secret key.

   ![Site key and secret key](/img/providers/captcha/recaptcha_apikey.png)

## Add the provider in Casdoor {#configure-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Captcha` and **Type** to the reCAPTCHA version that you registered: `reCAPTCHA`, `reCAPTCHA v2`, or `reCAPTCHA v3`.
1. Enter the **Site key** and the **Secret key**.

   ![reCAPTCHA provider in Casdoor](/img/providers/captcha/recaptcha_provider.png)

1. Click **Preview** to check the captcha.

   ![Preview of reCAPTCHA](/img/providers/captcha/recaptcha_preview.png)

1. Save the provider.

## Add the captcha to an application {#use-in-an-application}

Open the edit page of the application, add the provider on the **Providers** tab, and save. See [Add the captcha to an application](/docs/provider/captcha/overview#use-in-an-application).

![reCAPTCHA in the application](/img/providers/captcha/recaptcha_provider_app.png)

## See also

- [Captcha providers](/docs/provider/captcha/overview)
