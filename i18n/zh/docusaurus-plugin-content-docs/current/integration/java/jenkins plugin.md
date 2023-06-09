---
title: Jenkins 插件
description: 使用 Casdoor 插件来保证您的 Jenkins 安全
keywords:
  - 插件
  - Jenkins
authors:
  - Abingcbc
---

Casdoor 为用户登录Jenkins提供了一个插件。 这里我们将向您展示如何使用 Casdoor 插件来保证您的 Jenkins 安全。

以下是配置中的一些专有名词：

`CASDOOR_HOSTNAME`：私有部署的Casdoor域名或IP。

`JENKINS_HOSTNAME`: 部署Jenkins的域名或IP。

## 第1步。 部署Casdoor和Jenkins

首先，应该部署 [Casdoor](/docs/basic/server-installation) 和 [Jenkins](https://www.jenkins.io/doc/book/installing/)。

在成功部署后，您需要确保：

1. 将 Jenkins URL(管理 Jenkins -> 配置系统 -> Jenkins 位置) 设置为 `JENKINS_HOSTNAME` ![Jenkins URL](/img/integration/java/jenkins_url.png)
2. 可以登录并正常使用Casdoor 。
3. 将Casdoor 的 `origin` value (conf/app.conf) 设置为 `CASDOOR_HOSTNAME`。 ![Casdoor 配置](/img/integration/casdoor_origin.png)

## 第2步： 配置Casdoor应用程序

1. 创建或使用现有的 Casdoor 应用程序。
2. 添加重定向URL： `http://JENKINS_HOSTNAME/securityRealm/finish登录` ![Casdoor Application Setting](/img/integration/java/appseeting_jenkins.png)
3. 添加您想要的提供商并补充其他设置。

不出意外的话，您可以在应用程序设置页面获得两个值： `Client ID` 和 `Client secret` 就像上面的图片一样。 我们将在下一步骤中使用它们。

打开你喜欢的浏览器，访问：**http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**，你会看到 Casdoor 的 OIDC 配置。

## 第3步 配置 Jenkins

现在，您可以从市场安装Casdoor 插件，或者上传它的 `jar` 文件。

安装完成后，前往管理Jenkins -> 配置全局安全性。

**建议**: 备份Jenkins `config.xml` 文件，并在设置错误时使用它来恢复。

![Jenkins 设置](/img/integration/java/jenkins-plugin/jenkins_plugin.png)

1. 在 Security 中，选择“Casdoor Authentication Plugin”。
2. 在Cassdoor Endpoint中，指定上面提到的 `CASDOOR_HOSTNAME`
3. 在客户端ID中，指定上面注明的 `客户端ID`。
4. 在客户端secret中，指定上面注明的 `Client secret`
5. 在 JWT 公钥中，指定用于验证 JWT 令牌的公钥。 您可以通过点击顶部的 `Cert` 在Casdoor找到公钥。 点击 `编辑` 应用程序后，您可以在下面的页面复制您的公钥。 ![JWT 公钥](/img/integration/java/jenkins-plugin/jenkins_cert.png)
6. 组织名称和应用程序名称是可选的。 您可以指定您的组织和应用程序来验证其他组织和应用程序中的用户。 如果他们为空，插件将使用默认的组织和应用程序。
7. 在授权部分，检查“Logged-in users can do anything”。 禁用"Allow anonymous read access"。
8. 点击 `Ok`

现在，Jenkins会自动将您重定向到Cassdoor 进行认证。
