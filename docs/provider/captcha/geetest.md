---
title: Geetest captcha
description: Add Geetest CAPTCHA V4 to your application.
keywords: [Geetest, captcha]
authors: [leoil]
---

## 1. Get Geetest keys

1. Open [Geetest CAPTCHA V4](https://auth.geetest.com/product) and create a product/app.
2. Enter application name and address; add events and choose **web** as the device.
3. Copy the **ID** and **Key** (site key and secret key).

![Configure Geetest product](/img/providers/captcha/geetest_product.png)
![Geetest application](/img/providers/captcha/geetest_create_application.png)
![Geetest event](/img/providers/captcha/geetest_add_events.png)
![Configure Geetest key](/img/providers/captcha/geetest_key.png)

## 2. Configure Casdoor

**Providers** → **Add**. Set **Category** to **Captcha**, **Type** to **Geetest**. Enter the ID as **Site key** and the Key as **Secret key**. Use **Preview** to check the captcha style.

![Configure app provider](/img/providers/captcha/geetest_casdoor_configure.gif)

## 3. Apply to an application

Edit the application in Casdoor, add the Geetest provider to its provider list, and save.

![Configure app provider](/img/providers/captcha/geetest_app_provider.png)
