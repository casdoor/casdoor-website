---
title: Aliyun Captcha
description: 将Aliyun Captcha添加到您的应用程序
keywords:
  - Aliyun Captcha
authors:
  - Resulte
---

Aliyun Captcha是由Aliyun提供的验证码服务。 它包括两种验证验证码方式：  `滑动验证` and `智能验证`。 您可以从此 [链接](https://help.aliyun.com/product/28308.html) 中看到更多详细信息。

## 在 Aliyun 中添加验证码配置

登录到 [Aliyun 管理控制台](https://account.aliyun.com/), 搜索并前往验证码服务。 然后点击 **确认打开** 以启用验证码服务。

![aliyunCaptcha console open](/img/providers/captcha/aliyunCaptcha_console_open.png)

输入验证码关联控制台后，点击 **添加配置**。

![aliyunCaptcha console open](/img/providers/captcha/aliyunCaptcha_console_add.png)

填写所有必需的信息并提交。

![aliyunCaptcha console open](/img/providers/captcha/aliyunCaptcha_console_add_form.png)

然后您可以在您的控制台中看到您的  `场景` and `App key`

![aliyunCaptcha console open](/img/providers/captcha/aliyunCaptcha_console_info.png)

`访问密钥`, `秘密访问密钥` 在您的个人资料中。

## 在 Casdoor 配置

在 Casdoor 中创建一个新的提供商。

选择类别为  **验证码** , 类型为  **hCaptcha**. 然后选择子类型： `滑动验证` 或 `智能验证`。 您需要完成 `访问密钥`, `秘密访问密钥`, `场景` 和 `应用密钥` ，这都是最后一步创建。

![Recaptcha 提供商](/img/providers/captcha/aliyunCaptcha_provider.png)

你可以点击 **预览** botton来预览这个验证码的样式。

下面的图像是 `滑动验证` 预览：

![Recaptcha 预览](/img/providers/captcha/aliyunCaptcha_nc_preview.png)

以下图像是 `智能验证` 预览：

![Recaptcha 预览](/img/providers/captcha/aliyunCaptcha_ic_preview.png)

## 在应用中使用

编辑您想要在 Cassdoor 中配置的应用程序。 选择刚刚添加的身份提供商，然后点击按钮 **保存**。

![Recaptcha 提供商](/img/providers/captcha/aliyunCaptcha_provider_app.png)
