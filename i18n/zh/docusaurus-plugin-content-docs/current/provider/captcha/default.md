---
title: 默认
description: 在您的应用程序中使用 Casdoor 默认验证码
keywords:
  - 验证码
authors:
  - Resulte
---

默认验证码实现图像生成和验证。 默认的验证码图像是带有定义长度(5) 的位数0-9的顺序。

## 在 Casdoor 配置

在 Casdoor 中创建一个新的提供商。

选择类别为  **验证码** , 类型为  **hCaptcha**.

![默认提供商](/img/providers/captcha/default_provider.png)

你可以点击 **预览** botton来预览这个验证码的样式。

![默认预览](/img/providers/captcha/default_preview.png)

## 在应用中使用

编辑您想要在 Cassdoor 中配置的应用程序。 选择刚添加的提供商。 There are three kinds of rules:

- `Always` Always turned on human-machine verification when login.
- `None` Never require human-machine verification, the accout will be blocked when it attempted to login into the same application with wrong password for the 5st time within 15 minutes. And it will be unblocked after 15 minutes.
- `Dynamic` After 5 failed login attempts, the account will not be blocked but instead, human-machine verification will be required.

![默认提供程序](/img/providers/captcha/default_provider_app.png)

We also provide a demo video to demonstrate the differences in rules, which we hope will be helpful to you

<video src="/video/provider/default_provider_app.mp4" controls="controls" width="100%"></video>

