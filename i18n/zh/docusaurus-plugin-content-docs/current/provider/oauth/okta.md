---
title: Okta
description: 将 Octa OAuth 提供商添加到您的应用程序
keywords:
  - Okta
  - OAuth
authors:
  - greenhandatsjtu
---

要设置 Okta OIDC 提供商，请首先访问 [Okta Developer](https://developer.okta.com/signup/) 并注册以获得开发人员帐户。

导航到 **Applications > Applications** 标签, 点击 **Create App Integration**, 在 **Sign-in method** 选择 **OIDC - OpenID Connect**, 和在 **Application type** 选择 **Web Application**, 并点击 **Next**.

![创建应用集成](/img/providers/OAuth/oktacreateapp.png)

输入 **登录重定向 URI** , 例如 `https://door.casdoor.com/callback`。

![输入重定向URL](/img/providers/OAuth/oktasetredirecturl.png)

在 **分配** 部分中，定义您的应用程序的 **控制访问** 的类型， 然后点击 **保存** 以创建应用集成。

现在您获得 `Client ID `, `Client secret `和 `Okta 域名 `。

![Okta OIDC 设置](/img/providers/OAuth/oktasettings.png)

在 Casdoor 控制面板中添加 Okta OAuth 提供商，输入您的 `Client ID `， `Client secret `和 `Domain`

![在 Casdoor 添加 Okta](/img/providers/OAuth/oktacasdoor.png)

:::info 正确设置域名

请注意， `域名` 不仅是 `Okta 域名`, `/oauth2/default` 应该附加到它。

在授权服务器上访问 [Okta 文档](https://developer.okta.com/docs/concepts/auth-servers/) 获取更多详情。

:::

现在你可以使用 Github 作为第三方服务来完成身份验证！