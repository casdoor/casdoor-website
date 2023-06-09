---
title: Gitea
description: 在 Gitea 中使用 Casdoor 进行身份验证
keywords:
  - Gitea
authors:
  - ComradeProgrammer
---

## 在 Gitea 中使用 Casdoor 进行身份验证

[Gitea](https://gitea.io/en-us/) 是一个社区管理的轻量代码托管解决方案，写入Go。 采用MIT开源协议

Gitea支持第三方身份验证，包括Oauth，这样就可以使用Cassdoor进行身份验证。 以下是操作教程。

### 准备：

要配置 Gitea 使用 Casdoor 作为身份识别提供者，您需要安装 Gitea 以及访问管理员帐户。

关于如何下载、安装和运行 Gitea 的更多信息，请参阅 <https://docs.gitea.io/en-us/install-from-binary/>

您需要在安装过程中创建管理员帐户。 如果您已经注册，管理员将是第一个注册用户。 请使用此帐户继续以下操作。

### 1. 创建一个Casdoor应用程序

像这样： ![](/img/integration/go/gitea/gitea6.png)

请记住客户端ID和密码，以便下一步操作。

**请不要在此步骤中填写回调url。 Url取决于下一步Gitea的配置。 稍后我们将返回来设置一个正确的回调url。**

### 2. 配置 Gitea 使用 Casdoor

以管理员身份登录。 通过右上角的下拉菜单转到“站点管理”页面。 然后切换到“认证源”页面

你应该看到类似下面的内容：

![](/img/integration/go/gitea/gitea2.png)

按“添加认证源”按钮并填写类似的表单。

![](/img/integration/go/gitea/gitea3.png)

请选择认证类型为“oauth2”。

请输入此认证源的名称并 **记住此名称**。 此名称将在下一步骤中用于回调url。

请选择 `OpenID Connect` Oauth2 提供商。

填写上一步中记住的**客户端ID**和**客户端密码**。

在 openid 连接中填写自动发现URL，它应该是 `<your endpoint of casdoor>/.well known /openid-configuration`。

按您的意愿填写其他可选配置项。 然后提交它。

提交表单

### 3. 配置后台回调url

返回第2步中的应用程序编辑页面并添加以下回调url：

`<endpoint of gitea>/user/oauth2/<authentication source name>/callback`

`<authentication source name>`是上一步Gitea认证源的名称。

### 4. 在 Gitea 上试试

退出当前管理员帐户。

您应该在登录页面中看到这一点：

![](/img/integration/go/gitea/gitea4.png)

按“使用openid登录”按钮，您将被重定向到casdoor登录页面。

登录后您将看到这个： ![](/img/integration/go/gitea/gitea5.png)

按照指示并用一个新的 Gitea 帐户或现有帐户绑定下级帐户。

然后一切都将正常工作。 
