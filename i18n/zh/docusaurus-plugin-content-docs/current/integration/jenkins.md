---
sidebar_position: 1
title: Jenkins
---

Casdoor 可以使用 OIDC 协议作为IDP 连接各种应用程序。 这里我们将使用Jenkins作为示例，向您展示如何使用 OIDC 链接到您的应用程序。

以下是配置中的一些专有名词：

`CASDOOR_HOSTNAME`: 部署了 Casdoor 服务器的域名或IP。

`JENKINS_HOSTNAME`: 部署Jenkins的域名或IP。


## 第 1 步： 部署Casdoor和Jenkins
首先，应该部署 [Casdoor](/docs/basic/server-installation) and [Jenkins](https://www.jenkins.io/doc/book/installing/)。

在成功部署后，您需要确保：
1. 将 Jenkins URL(管理 Jenkins -> 配置系统 -> Jenkins 位置) 设置为 `JENKINS_HOSTNAME` ![Jenkins 链接](/img/jenkins_url.png)
2. 可以登录并正常使用Casdoor。
3. 将Casdoor的 `origin` (conf/app.conf) 设置为 `CASDOOR_HOSTNAME`。 ![Casdoor 配置](/img/casdoor_origin.png)
## 第 2 步： 配置Casdoor应用
1. 创建或使用现有的 Casdoor 应用程序。
2. 添加一个 redirect URL： `http://JENKINS_HOSTNAME/securityRealm/finishLogin` ![Casdoor 应用设置](/img/appseeting_jenkins.png)
3. 添加您想要的提供商并补充其他设置。

这时， 您可以在应用程序设置页面获得两个值： `Client ID` 和 `Client secret`， 就像上图一样。 我们将在下一步骤中使用它们。

打开您最喜欢的浏览器并访问： **http://`CASDOOR_HOSTNAME`/.well known / openid-configur**, 您将看到Casdoor配置的OIDC。

## 第 3 步： 配置 Jenkins
Jenkins本质上不支持 OIDC，所以我们需要安装 [OpenId Connect Authentication](https://plugins.jenkins.io/oic-auth/)。

安装完成后，前往管理Jenkins -> 配置全局安全。

**建议**: 备份Jenkins `config.xml` 文件，并在设置错误时使用它来恢复。

1. 在访问控制中，安全领域选择” Login with Openid Connect"。
2. 在客户端ID中，指定上面注明的 `客户端ID`。
3. 在Client serect中，指定上面注明的 `Client secret`
4. 在配置模式下，选择 `Automatic configuration` 并填写 **http://`CASDOOR_HOSTNAME`/.well known/openid-configur** 到 Well-known 配置端点。![Jenkins 设置](/img/jenkins_auto.png)如果您的Casdoor是本地部署的，您需要选择 `Manual configuration` 并输入一些信息：
    - `Token server url`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
    - `Authorization server url`: **http://`CASDOOR_HOSTNAME`/login/oauth/auth/author权**
    - `UseInfo server url`: **http://`CASDOOR_HOSTNAME`/api/get-account**
    - `Scopes`: `离线电话开放配置` ![手动配置](/img/jenkins_manual.png)
5. 点击高级设置，填写如下：
    - 在用户名字段中，指定 `data.name`
    - 在全名中，指定 `data.displayName`
    - 在电子邮件字段中，指定 `data.email` ![用户信息字段设置](/img/jenkins_field.png)
6. 在授权部分，检查“Logged-in users can do anything”。 禁用"Allow anonymous read access"。 您可以稍后配置更复杂的授权。现在检查OpenID是否是正常工作状态。

注销Jenkins，现在它应该将您重定向到 Casdoor 进行身份验证。 ![Jenkins 登录页面](/img/jenkins_login.png)
