---
title: reCAPTCHA
description: 添加reCAPTCHA 到您的应用程序
keywords:
  - reCAPTCHA
authors:
  - Resulte
---

reCAPTCHA 由 Google提供。 我们使用 reCAPTCHA v2 Checkbox。 您可以从此 [链接](https://developers.google.com/recaptcha) 中看到更多详细信息。

## 创建一个 API 密钥对

要开始使用 reCAPTCHA，您需要 [注册您的站点的 API 密钥对](http://www.google.com/recaptcha/admin)。 配对的密钥由一个站点密钥组成。 站点密钥用于在您的站点或移动应用程序上调用reCAPTCHA服务。 密钥授权您的应用程序后端和 reCAPTCHA 服务器之间的通信来 [验证用户的回应](https://developers.google.com/recaptcha/docs/verify)。

首先，选择 [ reCAPTCHA的类型](https://developers.google.com/recaptcha/docs/versions) 然后填写授权的域名或 [包名称。](https://developer.android.com/guide/topics/manifest/manifest-element.html#package) 接受服务条款后，点击 **注册** 获得新的 API 密钥对。

![recaptcha 创建 apiKey](/img/providers/captcha/recaptcha_create_apiKey.png)

然后你可以获得一个站点密钥和一个秘密密钥。

![recaptcha apiKey](/img/providers/captcha/recaptcha_apikey.png)

## 在 Casdoor 配置

在 Casdoor 中创建一个新的提供商。

选择类别为  **Captcha** , 输入  **reCAPTCHA**. 你需要完成最后一步创建的站点密钥和秘密密钥。

![Recaptcha 提供商](/img/providers/captcha/recaptcha_provider.png)

你可以点击 **预览** botton来预览这个验证码的样式。

![Recaptcha 预览](/img/providers/captcha/recaptcha_preview.png)

## 在应用中使用

编辑您想要在 Cassdoor 中配置的应用程序。 选择刚刚添加的身份提供商，然后点击按钮 **保存**。

![Recaptcha 提供应用程序](/img/providers/captcha/recaptcha_provider_app.png)
