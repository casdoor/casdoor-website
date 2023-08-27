---
title: Alibaba Cloud Captcha
description: Add Alibaba Cloud Captcha to your application
keywords: [Alibaba Cloud Captcha]
authors: [Resulte]
---

Alibaba Cloud Captcha is a captcha service provided by Alibaba Cloud. It offers two ways to verify captcha: "Sliding Validation" and "Intelligent Validation". You can find more details about it in this [link](https://help.aliyun.com/product/28308.html).

## Add Captcha Configuration in Alibaba Cloud

To add the Captcha configuration, log in to the [Alibaba Cloud management console](https://account.aliyun.com/), search for and go to the Captcha Service. Then, click on **Confirm Open** to enable the Captcha Service.

![Alibaba Cloud Captcha console open](/img/providers/captcha/aliyunCaptcha_console_open.png)

Once you have entered the Captcha management console, click on **Add configuration**.

![Alibaba Cloud Captcha console open](/img/providers/captcha/aliyunCaptcha_console_add.png)

Fill in all the required information and submit the form.

![Alibaba Cloud Captcha console open](/img/providers/captcha/aliyunCaptcha_console_add_form.png)

Now, you can view the `Scene` and `App key` in your console.

![Alibaba Cloud Captcha console open](/img/providers/captcha/aliyunCaptcha_console_info.png)

Also, the `Access key` and `Secret access key` can be found in your profile.

## Configure in Casdoor

Create a new provider in Casdoor.

Select the category as **Captcha**, and the type as **hCaptcha**. Then, choose the sub-type: "Sliding Validation" or "Intelligent Validation". Make sure to fill in the `Access key`, `Secret access key`, `Scene`, and `App key` that you created in the previous step.

![Alibaba Cloud Captcha provider](/img/providers/captcha/aliyunCaptcha_provider.png)

You can click on the **Preview** button to see the style of this captcha.

The following image shows the preview of "Sliding Validation":

![Alibaba Cloud Captcha preview](/img/providers/captcha/aliyunCaptcha_nc_preview.png)

And this image shows the preview of "Intelligent Validation":

![Alibaba Cloud Captcha preview](/img/providers/captcha/aliyunCaptcha_ic_preview.png)

## Application Integration

Edit the application in which you want to configure Casdoor. Select the newly added provider and click on the **Save** button.

![Alibaba Cloud Captcha provider app](/img/providers/captcha/aliyunCaptcha_provider_app.png)
