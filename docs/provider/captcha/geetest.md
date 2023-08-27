---
title: Geetest
description: Add Geetest Captcha to your application
keywords: [Geetest]
authors: [leoil]
---

## Configure Geetest

To configure Geetest and obtain the public and secret key, follow these steps:

1. Go to the Geetest **CAPTCHA V4** section on the [Geetest product page](https://auth.geetest.com/product).

   ![Configure Geetest product](/img/providers/captcha/geetest_product.png)

2. Create an application by entering the name and address for your application.

   ![Geetest application](/img/providers/captcha/geetest_create_application.png)

3. Add events and choose "web" for the device.

   ![Geetest event](/img/providers/captcha/geetest_add_events.png)

4. Retrieve the `ID` and `Key`.

   ![Configure Geetest key](/img/providers/captcha/geetest_key.png)

## Configure Casdoor

Follow these steps to configure Casdoor:

1. Create a new provider in Casdoor.

   Set the category as **Captcha** and the type as **Geetest**.
   Fill in the `Site key` and `Secret key` with the ID and Key obtained from Geetest.

2. Click the Preview button to preview the style of this captcha.

   ![Configure app provider](/img/providers/captcha/geetest_casdoor_configure.gif)

## Apply in your application

To apply the Geetest configuration in your application:

Edit the **application** you want to configure in Casdoor. Select the provider you just added and click the Save button.

![Configure app provider](/img/providers/captcha/geetest_app_provider.png)
