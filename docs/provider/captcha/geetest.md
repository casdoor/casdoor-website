---
title: Use Geetest
sidebar_label: Geetest
description: Protect sign-in and sign-up with Geetest CAPTCHA V4.
keywords: [Geetest, captcha]
authors: [leoil]
---

This guide explains how to use Geetest CAPTCHA V4 as the captcha of Casdoor.

---

#### Learning outcomes

- Create a Geetest application and get its keys.
- Add Geetest as a captcha provider in Casdoor.

#### What you need

- A [Geetest](https://auth.geetest.com/product) account
- Administrator access to the Casdoor admin console

---

## Get the Geetest keys {#1-get-geetest-keys}

1. Open [Geetest CAPTCHA V4](https://auth.geetest.com/product) and create a product.

   ![Geetest product](/img/providers/captcha/geetest_product.png)

1. Create an application with its name and address.

   ![Geetest application](/img/providers/captcha/geetest_create_application.png)

1. Add events and select **web** as the device.

   ![Geetest events](/img/providers/captcha/geetest_add_events.png)

1. Copy the ID and the key.

   ![ID and key of the application](/img/providers/captcha/geetest_key.png)

## Add the provider in Casdoor {#2-configure-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Captcha` and **Type** to `GEETEST`.
1. Enter the ID as the **Site key** and the key as the **Secret key**.
1. Click **Preview** to check the captcha.

   ![Recording of the Geetest configuration in Casdoor](/img/providers/captcha/geetest_casdoor_configure.gif)

1. Save the provider.

## Add the captcha to an application {#3-apply-to-an-application}

Open the edit page of the application, add the provider on the **Providers** tab, and save. See [Add the captcha to an application](/docs/provider/captcha/overview#use-in-an-application).

![Geetest in the application](/img/providers/captcha/geetest_app_provider.png)

## See also

- [Captcha providers](/docs/provider/captcha/overview)
