---
title: GitHub
description: 添加Github OAuth 提供商到您的应用程序
keywords:
  - GitHub
  - OAuth
authors:
  - ErikQQY
---

GitHub OAuth 支持网络应用程序流和设备流量。 请继续阅读以获取 OAuth 凭据。

首先，请访问 [GitHub 开发者设置](https://github.com/settings/apps/new) 注册一个新的 GitHub 应用。

:::caution

**Tricks:** 我们建议您使用 GitHub 应用程序替换OAuth 应用程序 因为GitHub 应用程序可以添加多个重定向uri，可以在部署测试和生产环境时带来方便。 [GitHub](https://docs.github.com/en/developers/apps/getting-started-with-apps/migrating-oauth-apps-to-github-apps) 官方也建议使用 GitHub 应用程序而不是 OAuth 应用。

![githubapps](/img/providers/OAuth/githubapps.png)

:::

然后填写 **应用名称**, **主页网址**, **描述** 和 **授权回调URL**.

![GitHub](/img/providers/OAuth/github.png)

:::info 正确设置授权回调URL

在 Github OAuth 配置中， `应用回调地址` 必须是 **您的Casdoor的回调URL**并且 Casdoor 中的 `Redirect URL` 应该为 **您的应用回调地址**

更多详情请阅读 [应用配置](/docs/application/config#further-understanding)

:::

注册您的 GitHub 应用程序后，您现在可以生成您的 `客户端密钥`！

![GitHub Client ID](/img/providers/OAuth/githubclient.png)

添加一个 GitHub OAuth 提供商并填写 `客户端ID` and `客户端密钥`

![Github Provider](/img/providers/OAuth/githubprovider.png)

现在您可以使用 GitHub 作为第三方服务来完成认证。
