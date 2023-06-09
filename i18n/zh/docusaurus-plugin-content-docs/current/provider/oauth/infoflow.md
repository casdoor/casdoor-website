---
title: Infoflow
description: 在应用程序中添加 Infoflow OAuth 提供商
keywords:
  - Infoflow
  - OAuth
authors:
  - Steve0x2a
---

若要设置 Infoflow OAuth 提供商，请前往 [Infoflow](http://id.qy.baidu.com/static/ge/login.html#/) 并登录使用您的 Infoflow 帐户。

首先，请访问Infoflow的[ 应用中心](http://qy.baidu.com/index.html#applist)。

![创建 APP](/img/providers/OAuth/infoflowapp1.png)

并注册您的 Infoflow 应用。 ![Create APP](/img/providers/OAuth/infoflowapp2.png)

然后你现在可以获取 `AgentID`。 ![AgentID](/img/providers/OAuth/infoflowagentid.png)

然后导航到 **设置** 标签，并创建一个新的管理组。 ![设置](/img/providers/OAuth/infoflowsetting.png)

将您的结构添加到地址簿权限中，并赋予它以下显示的权限。 同时将您刚刚创建的应用程序添加到以下位置。 ![Permission](/img/providers/OAuth/infoflowpermission1.png)

添加敏感接口权限如下所示： ![Permission](/img/providers/OAuth/infoflowpermission2.png)

您将能够在同一页面看到 `CorpID` and `Secret` ![Permission](/img/providers/OAuth/infoflowsecret.png)

添加 Infoflow OAuth 提供商并填写 `客户端ID` , `客户端密钥` 和 `代理ID` 在您的Casdoor。 ![Infoflow Provider](/img/providers/OAuth/infoflowprovider.png)

现在您可以使用 Infoflow 作为第三方服务来完成身份验证！