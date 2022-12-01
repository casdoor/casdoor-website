---
title: Cloudflare Turnstile
description: Add Cloudflare Turnstile to your application
keywords: [Cloudflare Turnstile]
author: YiNNx
---

Cloudflare Turnstile is a captcha service provided by Cloudflare, which is a user-friendly, privacy preserving alternative to captcha. You can see more details from [Turnstile Docs](https://developers.cloudflare.com/turnstile/).

## Create an API key pair

To start using Cloudflare Turnstile, you need to [Create a Cloudflare account](https://dash.cloudflare.com/?to=/:account/turnstile), navigate to the `Turnstile` tab on the navigation bar, and get the Site Key and Secret Key.

First, add a name for the widget to identify it in the future and enter your website's hostname. Then choose the widget type. `Managed` is recommended. Click **Create**.

![Cloudflare Turnstile preview](/img/providers/captcha/captcha_cloudflare1.png)

Then you can get a site key and a secret key.

![Cloudflare Turnstile preview](/img/providers/captcha/captcha_cloudflare2.png)

## Configure in Casdoor

Create a new provider in Casdoor.

Select category as  **Captcha** , type as  **Cloudflare Turnstile** . And you need to fulfill the site key and the secret key which is created by last step.

![Cloudflare Turnstile provider](/img/providers/captcha/captcha_cloudflare3.png)

And you can click the **Preview** button to preview the style of this captcha.

![Cloudflare Turnstile preview](/img/providers/captcha/captcha_cloudflare4.png)

## Applied in application

Edit the application you want to configure in Casdoor. Select the provider just added and click the button **Save**.

![Cloudflare Turnstile provider app](/img/providers/captcha/captcha_cloudflare5.png)
