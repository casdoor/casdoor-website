---
title: Use Cloudflare Turnstile
sidebar_label: Cloudflare Turnstile
description: Protect sign-in and sign-up with Cloudflare Turnstile, a captcha alternative that respects privacy.
keywords: [Cloudflare Turnstile, captcha]
authors: [YiNNx]
---

This guide explains how to use [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) as the captcha of Casdoor.

---

#### Learning outcomes

- Create a Turnstile widget.
- Add Cloudflare Turnstile as a captcha provider in Casdoor.

#### What you need

- A [Cloudflare account](https://dash.cloudflare.com/?to=/:account/turnstile)
- Administrator access to the Casdoor admin console

---

## Create a widget {#create-a-key-pair}

1. In the Cloudflare dashboard, open the **Turnstile** tab.
1. Add a widget: enter a name and the host name of Casdoor, select a widget type, for example **Managed**, and click **Create**.

   ![Turnstile widget creation](/img/providers/captcha/captcha_cloudflare1.png)

1. Copy the **Site Key** and the **Secret Key**.

   ![Site key and secret key of the widget](/img/providers/captcha/captcha_cloudflare2.png)

## Add the provider in Casdoor {#configure-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Captcha` and **Type** to `Cloudflare Turnstile`.
1. Enter the **Site key** and the **Secret key**.

   ![Cloudflare Turnstile provider in Casdoor](/img/providers/captcha/captcha_cloudflare3.png)

1. Click **Preview** to check the captcha.

   ![Preview of Cloudflare Turnstile](/img/providers/captcha/captcha_cloudflare4.png)

1. Save the provider.

## Add the captcha to an application {#use-in-an-application}

Open the edit page of the application, add the provider on the **Providers** tab, and save. See [Add the captcha to an application](/docs/provider/captcha/overview#use-in-an-application).

![Cloudflare Turnstile in the application](/img/providers/captcha/captcha_cloudflare5.png)

## See also

- [Captcha providers](/docs/provider/captcha/overview)
