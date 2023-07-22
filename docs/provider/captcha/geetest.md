---
title: Geetest
description: Add Geetest Captcha to your application
keywords: [Geetest]
authors: [leoil]
---

## Confiure Geetest

Configure Geetest and get the public and secret key

1. Go to the Geetest **CAPTCHA V4** in [geetest product page](https://auth.geetest.com/product)

   ![configure geetest product](/img/providers/captcha/geetest_product.png)

2. Create Application : enter the Name and address to your application.

   ![geetest application](/img/providers/captcha/geetest_create_application.png)

3. Add events: choose **web** for device

   ![eetest event](/img/providers/captcha/geetest_add_events.png)

4. Get `ID` and `Key`

   ![configure geetest key](/img/providers/captcha/geetest_key.png)

## Configure casdoor

1. Crete a new provider in Casdoor

   Select category as **Captcha** , type as **Geetest**.
   Fill in the `Site key`  and `Secret key` with ID, Key in Geetest.

2. Click Preview button to preview the style of this captcha.

   ![configure app provider](/img/providers/captcha/geetest_casdoor_configure.gif)

## Applied in application

Edit the **application** you want to configure in Casdoor. Select the provider just added and click the button Save.

![configure app provider](/img/providers/captcha/geetest_app_provider.png)
