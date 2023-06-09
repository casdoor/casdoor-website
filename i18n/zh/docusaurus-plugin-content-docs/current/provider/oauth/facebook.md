---
title: Facebook
description: 将 Facebook OAuth 提供商添加到您的应用程序
keywords:
  - Facebook
  - OAuth
authors:
  - ErikQQY
---

要设置 Facebook OAuth 提供商，请前往 [Facebook开发人员](https://developers.facebook.com/apps/) 创建一个新的应用程序。

选择您要创建的应用类型。

![Facebook 选择](/img/providers/OAuth/facebookselect.png)

填写姓名并联系电子邮件后，您可以进入 facebook 开发者面板。

![控制面板](/img/providers/OAuth/dashboard.png)

然后设置 Facebook 登录：

![Facebook 登录](/img/providers/OAuth/facebooklogin.png)

选择此应用的 Web 平台：

![Facebook 网络](/img/providers/OAuth/facebookweb.png)

填写网站URL后，您可以访问 **Facebook Login > 设置**并填写有效的 OAuth Redirect URI

![重定向器](/img/providers/OAuth/facebookredirecturl.png)

:::info 正确设置授权的 redirect URL

在 Facebook OAuth 配置中， `有效的 OAuth Redirect URIs` 必须是 **您的 Casdoor 回调 url**, and the `Redirect URL` in Casdoor should be **your application callback url**

 更多详情请阅读 [应用配置](/docs/application/config#further-understanding)

:::

基本应用程序配置即将完成！

在仪表板顶部栏中切换模式从 **In development** 到 **Live**

![顶栏](/img/providers/OAuth/facebooktopbar.png)

然后您的 `App ID` and `App secrets` 可以在 Casdoor 中使用。

![facebookapp](/img/providers/OAuth/facebookappclient.png)

添加 Facebook OAuth 提供商并在您的 Casdoor 填写 `Client ID` and `Client Secrets` 使用 `App ID` 和 `App Secrets` 。

![Facebook 客户端](/img/providers/OAuth/facebookclient.png)

现在你可以使用 Facebook 作为第三方服务来完成身份验证！