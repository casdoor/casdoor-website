---
title: Aliyun Captcha
description: Add Aliyun Captcha to your application
keywords: [Aliyun Captcha]
---

Aliyun Captcha is a captcha service provided by Aliyun. It includes  two ways to verify captcha:  `Sliding Validation` and `Intelligent Validation`. You can see more details from this [link](https://help.aliyun.com/product/28308.html).

## Add Captcha configuration in Aliyun

Login to the [Aliyun management console](https://account.aliyun.com/), search and go to the Captcha Service. And click **Confirm Open** to enable Captcha Service.

![aliyunCaptcha console open](/img/providers/captcha/aliyunCaptcha_console_open.png)

After entering the captcha agement console, click **Add configuration**.

![aliyunCaptcha console open](/img/providers/captcha/aliyunCaptcha_console_add.png)

Fill in all required information and submit.

![aliyunCaptcha console open](/img/providers/captcha/aliyunCaptcha_console_add_form.png)

Then you can see your  `Scene` and `App key` in your console.

![aliyunCaptcha console open](/img/providers/captcha/aliyunCaptcha_console_info.png)

And  `Access key`, `Secret access key` is in your profile.

## Configure in Casdoor

Create a new provider in Casdoor.

Select category as  **Captcha** , type as  **hCaptcha** . Then select sub type: `Sliding Validation` or `Intelligent Validation`. And you need to fulfill the `Access key`, `Secret access key`, `Scene` and `App key` which are created by last step.

![Recaptcha provider](/img/providers/captcha/aliyunCaptcha_provider.png)

And you can click **Preview** button to preview the style of this captcha. 

The following image is `Sliding Validation` preview:

![Recaptcha preview](/img/providers/captcha/aliyunCaptcha_nc_preview.png)

The following image is `Intelligent Validation` preview:

![Recaptcha preview](/img/providers/captcha/aliyunCaptcha_ic_preview.png)

## Applied in application

Edit the application you want to configure in Casdoor. Select the provider just added and click the button **Save**.

![Recaptcha provider app](/img/providers/captcha/aliyunCaptcha_provider_app.png)
