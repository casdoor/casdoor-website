---
title: Jenkins OIDC
description: 使用 OIDC 协议作为IDP 连接各种应用程序，如Jenkins
keywords:
  - OIDC
  - Jenkins
  - IDP
authors:
  - Abingcbc
---

Casdoor 可以使用 OIDC 协议作为IDP 连接各种应用程序。 这里我们将使用Jenkins作为示例，向您展示如何使用 OIDC 链接到您的应用程序。

以下是配置中的一些专有名词：

`CASDOOR_HOSTNAME`：私有部署的Casdoor域名或IP。

`JENKINS_HOSTNAME`: 部署Jenkins的域名或IP。

## 第1步。 部署Casdoor和Jenkins

首先，应该部署 [Casdoor](/docs/basic/server-installation) 和 [Jenkins](https://www.jenkins.io/doc/book/installing/)。

在成功部署后，您需要确保：

1. 将 Jenkins URL(Manage Jenkins -> Configure System -> Jenkins Location) 设置为 `JENKINS_HOSTNAME` ![Jenkins URL](/img/integration/java/jenkins_url.png)
2. 可以登录并正常使用Casdoor 。
3. 将Casdoor 的 `origin` value (conf/app.conf) 设置为 `CASDOOR_HOSTNAME`。 ![Casdoor 配置](/img/integration/casdoor_origin.png)

## 第2步： 配置Casdoor应用程序

1. 创建或使用现有的 Casdoor 应用程序。
2. 添加重定向URL： `http://JENKINS_HOSTNAME/securityRealm/finishLogin` ![Casdoor 应用设置](/img/integration/java/appseeting_jenkins.png)
3. 添加您想要的provider并补充其他设置。

不出意外的话，您会在应用程序设置页面看到： `Client ID` 和 `Client secret` 就像上面的图片一样。 我们将在下一步中使用它们。

打开你喜欢的浏览器，访问：**http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**，你会看到 Casdoor 的 OIDC 配置。

## 第3步 配置 Jenkins

First, we need to install [OpenId Connect Authentication](https://plugins.jenkins.io/oic-auth/), Jenkins does not natively support OIDC.

After completing the installation, go to **Manage Jenkins** -> **Configure Global Security**. ![jenkins global security](/img/integration/java/jenkins-oidc/jenkins_global_security.png)

:::tip
Back up the Jenkins `config.xml` file, and use it to recover in case of setup errors.
:::

1. In Access Control, **Security Realm** select `Login with Openid Connect`.
2. 在客户端ID中，指定上面注明的 `Client ID`。
3. 在Client serect中，指定上面注明的 `Client secret`
4. In Configuration mode, select `Automatic configuration` and fill in **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration** into Well-known configuration endpoint.![Jenkins' Setting](/img/integration/java/jenkins-oidc/jenkins_auto.png)

If your casdoor is deployed locally, you may need to select `Manual configuration` and input some information:
- Token server url: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
- Authorization server url: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
- UserInfo server url: **http://`CASDOOR_HOSTNAME`/api/get-account**
- Scopes: `address phone openid profile offline_access email` ![Manual configuration](/img/integration/java/jenkins-oidc/jenkins_manual.png)
5. Click **Advanced setting**, fill in the following:
- In User name field, specify `name`
- In Full name field, specify `displayName`
- In Email field, specify `email` ![Userinfo Field Setting](/img/integration/java/jenkins-oidc/jenkins_field.png)

6. In the **Authorization** section, check “Logged-in users can do anything”. Disable “Allow anonymous read access”. You can configure more complex authorization later, for now check if OpenID actually works.

Log out of Jenkins, it should now redirect you to Casdoor for authentication. ![Jenkins Login Page](/img/integration/java/jenkins-oidc/jenkins_login.png)
