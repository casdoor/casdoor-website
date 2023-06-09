---
title: hCaptcha
description: 将 hCaptcha 添加到您的应用程序
keywords:
  - hCaptcha
authors:
  - Resulte
---

hCaptcha 是一个验证码服务提供商，类似于reCAPTCHA。 您可以从此 [链接](https://www.hcaptcha.com/) 中看到更多详细信息。

## 创建一个 API 密钥对

若要开始使用 hCaptcha，您需要 [注册您的网站的 API 密钥对](https://www.hcaptcha.com/)。 您可以在您的 [个人资料页面](https://dashboard.hcaptcha.com/settings) 找到您的网站密钥。

然后你可以获得一个站点密钥和一个秘密密钥。

## 在 Casdoor 配置

在 Casdoor 中创建一个新的提供商。

选择类别为  **验证码** , 类型为  **hCaptcha**. 你需要完成最后一步创建的站点密钥和秘密密钥。

![Recaptcha 提供商](/img/providers/captcha/hcaptcha_provider.png)

你可以点击 **预览** botton来预览这个验证码的样式。

![Recaptcha 预览](/img/providers/captcha/hcaptcha_preview.png)

## 在应用中使用

编辑您想要在 Cassdoor 中配置的应用程序。 选择刚刚添加的身份提供商，然后点击按钮 **保存**。

![Recaptcha 提供应用程序](/img/providers/captcha/hcaptcha_provider_app.png)
