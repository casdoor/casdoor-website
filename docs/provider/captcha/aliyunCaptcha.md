---
title: Use Alibaba Cloud Captcha
sidebar_label: Alibaba Cloud Captcha
description: Protect sign-in and sign-up with Alibaba Cloud Captcha, with sliding or intelligent validation.
keywords: [Alibaba Cloud Captcha]
authors: [Resulte]
---

This guide explains how to use [Alibaba Cloud Captcha](https://help.aliyun.com/product/28308.html) as the captcha of Casdoor. Alibaba Cloud Captcha offers two kinds of validation: sliding validation and intelligent validation.

---

#### Learning outcomes

- Create a captcha configuration in Alibaba Cloud.
- Add Alibaba Cloud Captcha as a captcha provider in Casdoor.

#### What you need

- An Alibaba Cloud account and an AccessKey
- Administrator access to the Casdoor admin console

---

## Create a configuration in Alibaba Cloud {#add-captcha-configuration-in-alibaba-cloud}

1. In the [Alibaba Cloud console](https://account.aliyun.com/), open the Captcha service and click **Confirm Open**.

   ![Activation of the Captcha service](/img/providers/captcha/aliyunCaptcha_console_open.png)

1. In the Captcha console, click **Add configuration**.

   ![Add configuration button](/img/providers/captcha/aliyunCaptcha_console_add.png)

1. Fill in the form and submit it.

   ![Configuration form](/img/providers/captcha/aliyunCaptcha_console_add_form.png)

1. Note the scene and the app key of the configuration.

   ![Scene of the configuration](/img/providers/captcha/aliyunCaptcha_console_info.png)

   ![App key of the configuration](/img/providers/captcha/aliyunCaptcha_console_info2.png)

1. Note the AccessKey ID and AccessKey Secret from your profile.

## Add the provider in Casdoor {#configure-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Captcha`, **Type** to `Aliyun Captcha`, and **Sub type** to sliding validation or intelligent validation.
1. Enter the **Access key**, the **Secret access key**, the **Scene**, and the **App key**.

   ![Alibaba Cloud Captcha provider in Casdoor](/img/providers/captcha/aliyunCaptcha_provider.png)

1. Click **Preview** to check the captcha.

   Sliding validation:

   ![Preview of sliding validation](/img/providers/captcha/aliyunCaptcha_nc_preview.png)

   Intelligent validation:

   ![Preview of intelligent validation](/img/providers/captcha/aliyunCaptcha_ic_preview.png)

1. Save the provider.

## Add the captcha to an application {#application-integration}

Open the edit page of the application, add the provider on the **Providers** tab, and save. See [Add the captcha to an application](/docs/provider/captcha/overview#use-in-an-application).

![Alibaba Cloud Captcha in the application](/img/providers/captcha/aliyunCaptcha_provider_app.png)

## See also

- [Captcha providers](/docs/provider/captcha/overview)
