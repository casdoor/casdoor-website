---
title: Cloudflare Turnstile
description: Add Cloudflare Turnstile to your application
keywords: [Cloudflare Turnstile]
authors: [YiNNx]
---

Cloudflare Turnstile is a CAPTCHA service provided by Cloudflare, which is a user-friendly, privacy-preserving alternative to CAPTCHA. You can find more details in the [Turnstile Docs](https://developers.cloudflare.com/turnstile/).

## Create an API key pair

To start using Cloudflare Turnstile, you need to [create a Cloudflare account](https://dash.cloudflare.com/?to=/:account/turnstile), navigate to the `Turnstile` tab on the navigation bar, and obtain the Site Key and Secret Key.

First, add a name for the widget to identify it in the future and enter your website's hostname. Then choose the widget type. It is recommended to choose `Managed`. Finally, click **Create**.

![Cloudflare Turnstile preview](/img/providers/captcha/captcha_cloudflare1.png)

You will then be able to obtain a site key and a secret key.

![Cloudflare Turnstile preview](/img/providers/captcha/captcha_cloudflare2.png)

## Configure in Casdoor

Create a new provider in Casdoor.

Select the category as **Captcha** and the type as **Cloudflare Turnstile**. Fill in the site key and the secret key that you obtained in the previous step.

![Cloudflare Turnstile provider](/img/providers/captcha/captcha_cloudflare3.png)

You can click the **Preview** button to see a preview of the style of this CAPTCHA.

![Cloudflare Turnstile preview](/img/providers/captcha/captcha_cloudflare4.png)

## Application Integration

Edit the application you want to configure in Casdoor. Select the provider that you just added and click the **Save** button.

![Cloudflare Turnstile provider app](/img/providers/captcha/captcha_cloudflare5.png)
