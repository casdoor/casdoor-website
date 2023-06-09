---
title: 领英（LinkedIn）
description: 添加Linkedin OAuth 提供商到您的应用程序
keywords:
  - LinkedIn
  - OAuth
authors:
  - ErikQQY
---

要设置 Linkedin OAuth 提供商，请前往 [Linkedin 开发者](https://www.linkedin.com/developers/apps/new) 创建一个新的应用。

![Linkedin](/img/providers/OAuth/linkedin.png)

填写上面的表单并创建您的应用后，您需要验证与应用相关联的 Linkedin 页面

![Linkedin 验证](/img/providers/OAuth/linkedin-verify.png)

:::note

只有公司页面管理员可以验证您的应用，并允许您的应用

:::

在您的应用验证后，您可以继续：

![Linkedin 登陆](/img/providers/OAuth/linkedinsignin.png)

为您的应用添加授权重定向URL作为 **您的 Casdoor 回调URL**。

![Linkedin 重定向](/img/providers/OAuth/linkedinredirecturl.png)

:::info 正确设置授权的重定向 URL

在 Linkedin OAuth 配置中， `应用回调URL` 必须是 **您的Casdoor的回调URL**并且 Casdoor 中的 `Redirect URL` 应该为 **您的应用回调地址**

更多详情请阅读 [应用配置](/docs/application/config#further-understanding)

:::

然后你就可以获得你的`Client ID`和`Client Secret`

![Linkedin 客户端](/img/providers/OAuth/linkedinclient.png)

添加一个 Linkedin OAuth 提供商并在您的 Casdoor 中填写 `Client ID` 和 `Client Secret`。

![Linkedin 提供商](/img/providers/OAuth/linkedinprovider.png)

现在您可以使用 Linkedin 作为第三方服务来完成身份验证！