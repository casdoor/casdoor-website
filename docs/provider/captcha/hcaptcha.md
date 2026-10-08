---
title: Use hCaptcha
sidebar_label: hCaptcha
description: Protect sign-in and sign-up with hCaptcha.
keywords: [hCaptcha, captcha]
authors: [Resulte]
---

This guide explains how to use [hCaptcha](https://www.hcaptcha.com/) as the captcha of Casdoor.

---

#### Learning outcomes

- Get an hCaptcha key pair.
- Add hCaptcha as a captcha provider in Casdoor.

#### What you need

- An hCaptcha account
- Administrator access to the Casdoor admin console

---

## Get a key pair {#create-a-key-pair}

In the [hCaptcha dashboard](https://dashboard.hcaptcha.com/settings), copy the site key and the secret key.

## Add the provider in Casdoor {#configure-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Captcha` and **Type** to `hCaptcha`.
1. Enter the **Site key** and the **Secret key**.

   ![hCaptcha provider in Casdoor](/img/providers/captcha/hcaptcha_provider.png)

1. Click **Preview** to check the captcha.

   ![Preview of hCaptcha](/img/providers/captcha/hcaptcha_preview.png)

1. Save the provider.

## Add the captcha to an application {#use-in-an-application}

Open the edit page of the application, add the provider on the **Providers** tab, and save. See [Add the captcha to an application](/docs/provider/captcha/overview#use-in-an-application).

![hCaptcha in the application](/img/providers/captcha/hcaptcha_provider_app.png)

## See also

- [Captcha providers](/docs/provider/captcha/overview)
