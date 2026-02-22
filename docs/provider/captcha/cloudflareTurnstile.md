---
title: Cloudflare Turnstile
description: Add Cloudflare Turnstile captcha to your application.
keywords: [Cloudflare Turnstile, captcha]
authors: [YiNNx]
---

[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) is a privacy-friendly captcha alternative. Use it as a Casdoor captcha provider.

## Create a key pair

1. [Create a Cloudflare account](https://dash.cloudflare.com/?to=/:account/turnstile) and open the **Turnstile** tab.
2. Add a widget name and your site’s hostname, choose a widget type (e.g. **Managed**), and click **Create**.
3. Copy the **Site Key** and **Secret Key**.

![Cloudflare Turnstile preview](/img/providers/captcha/captcha_cloudflare1.png)
![Cloudflare Turnstile preview](/img/providers/captcha/captcha_cloudflare2.png)

## Configure in Casdoor

Create a **Captcha** provider, set **Type** to **Cloudflare Turnstile**, and enter the site key and secret key. Use **Preview** to check the captcha.

![Cloudflare Turnstile provider](/img/providers/captcha/captcha_cloudflare3.png)
![Cloudflare Turnstile preview](/img/providers/captcha/captcha_cloudflare4.png)

## Use in an application

Edit the application, add the Cloudflare Turnstile provider, and save.

![Cloudflare Turnstile provider app](/img/providers/captcha/captcha_cloudflare5.png)
