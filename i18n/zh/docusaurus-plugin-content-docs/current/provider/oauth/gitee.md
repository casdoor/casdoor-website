---
title: Gitee
description: 添加Gitee OAuth 提供商到您的应用程序
keywords:
  - Gitee
  - OAuth
authors:
  - ErikQQY
---

要设置 Gitee OAuth 提供者，请到 [Gitee 设置](https://gitee.com/oauth/applications)，如果您之前没有创建过应用程序，gitee 工作台会是这样：

![Gitee 工作台](/img/providers/OAuth/giteebench.png)

然后您可以创建您的Gitee应用程序。

![Gitee](/img/providers/OAuth/gitee.png)

填写 **应用名称**，**应用描述 **，**应用主页** 和 **应用回调地址** 并仔细选择 **权限**

:::info 正确设置授权应用回调地址

在 Gitee OAuth 配置中， `应用回调地址` 必须是 **您的Casdoor的回调URL**并且 Casdoor 中的 `Redirect URL` 应该为 **您的应用回调地址**

更多详情请阅读 [应用配置](/docs/application/config#further-understanding)

:::

然后您可以创建您的gitee应用并立即获得 `Client ID` 和 `Client Secrets`！

![Gitee 客户端](/img/providers/OAuth/giteeclient.png)

添加一个 Gitee OAuth 提供商并在您的 Casdoor 中填写 `Client ID` 和 `Client Secrets`。

![Gitee 提供商](/img/providers/OAuth/giteeprovider.png)

现在您可以使用 Gitee 作为第三方服务来完成身份验证！

:::caution

由于 Casdoor 需要获取用户的电子邮件，必须选中电子邮件选项，否则会导致授权错误。

![Gitee 范围](/img/giteescope.jpg)

:::
