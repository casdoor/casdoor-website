---
title: 谷歌
description: 添加Google OAuth 提供商到您的应用程序
keywords:
  - Google
  - OAuth
authors:
  - ErikQQY
---

若要设置 Google OAuth 提供商，请前往 [Google API 控制台](https://console.developers.google.com) 并登录使用您的 Google 帐户。

![安装项目](/img/providers/OAuth/googlenewproject.png)

然后导航到 **OAuth 同意屏幕** 标签来配置 OAuth 同意屏幕。

![配置同意](/img/providers/OAuth/oauthconsentscreen.png)

并注册您的 Google 应用。

![注册应用](/img/providers/OAuth/appregistration.png)

然后导航到 **Credential** 选项卡。

![凭据](/img/providers/OAuth/credential.png)

并为您的应用创建凭据：

![创建 Credentail](/img/providers/OAuth/createcredential.png)

:::info 正确设置授权重定向 URI

在 Google OAuth 配置中， `应用回调URL` 必须是 **您的Casdoor的回调URL**并且 Casdoor 中的 `Redirect URL` 应该为 **您的应用回调地址**

更多详情请阅读 [应用配置](/docs/application/config#further-understanding)

:::

创建Client ID并获取`Client ID`和`Client Secrets`后

![客户端：](/img/providers/OAuth/googleclient.png)

添加 Google OAuth 提供程序并在您的 Casdoor 中填写 `Client ID` 和 `Client Secret`

![Google 提供商](/img/providers/OAuth/googleprovider.png)

现在你可以使用 Google 作为第三方服务来完成身份验证！