---
title: 概述
description: 添加第三方服务到您的应用程序
keywords:
  - 提供商
  - OAuth
  - 短信
  - 存储
  - 电子邮箱
  - 支付
  - 验证码
authors:
  - kininaru
---

Casdoor 使用提供商为平台提供第三方服务。 在本章中，您将学习如何为Casdoor添加提供商。

## 我们所拥有的

现在，我们有六种类型的提供商：

- **OAuth 提供商**

  允许用户通过其他 OAuth 应用程序登录。 您可以将 GitHub 、Google、QQ 和其他许多OAuth 应用程序添加到Casdoor。 欲了解更多详情，请参阅 [OAuth](/docs/provider/oauth/overview)。
- **短信提供商**

  当用户想要验证他们的电话号码时，Casdoor将发送短信给他们。 短信提供者被用来发送Casdoor短信。
- **电子邮件提供商**

  电子邮件提供者与短信提供者类似。
- **存储提供商**

  Casdoor允许用户使用本地文件系统或云端服务存储文件。
- **支付服务提供商**

  Casdoor 可以添加付款提供者，用于在产品页面上添加付款方法。 目前，受支持的付款提供者包括支付宝、微信支付、PayPal和GC。
- **验证码提供商**

  Casdoor支持在用户流程中配置验证码。 Currently, the supported captcha providers include Default Captcha, reCAPTCHA, hCaptcha, Aliyun Captcha and Cloudflare Turnstile.

## 如何配置和使用

### 范围

提供商有不同的范围。 提供者的范围取决于创建者。 只有管理员有权添加和配置提供者。 Cassdoor有两种管理员。

- **全局管理员**: 内置 `下的所有用户` 组织和用户启用 `IsGlobalAdmin` 由全局管理员创建的供应商可以被所有应用程序使用。

- **组织管理员**: 用户启用 `Ismin`. 组织管理员创建的提供者只能使用 **组织下的应用程序只能使用**。 (正在开发...)

### 添加应用程序

以下是为您的应用程序添加提供商的步骤。 在没有添加提供商之前，你还不能在应用中使用。

1. 转到应用程序编辑页面并添加一个新的提供商。

    ![Provider_overview.添加](/img/providers/provider_overview_add.png)

2. 选择您想要添加到应用程序的提供商。 这里将显示应用程序可以使用的所有提供商。

    ![Provider_overview.选择](/img/providers/provider_overview_select.png)

3. 对于 **OAuth** and **Captcha** 提供商，您可以配置该用法。 详见 [OAuth](/docs/provider/oauth/overview/#applied-in-application) and [Captcha](/docs/provider/captcha/default#applied-in-application)

    ![Provider_overview.配置](/img/providers/provider_overview_config.png)

最后, **保存** 配置。 然后您可以尝试在应用程序中使用提供商。
