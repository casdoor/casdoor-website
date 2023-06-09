---
title: Via miniOrange Plugin
description: 使用 OIDC 协议作为IDP 连接各种应用程序，如Jira
keywords:
  - OIDC
  - Jira
  - IDP
authors:
  - jakiuncle
---

This is a tutorial on using [miniOrange](https://marketplace.atlassian.com/apps/1217688/mo-jira-oauth-sso-jira-openid-connect-sso-jira-oidc-sso?hosting=cloud&tab=overview) to connect casdoor and jira

[Casdoor](/docs/basic/server-installation) 可以使用 OIDC 协议作为IDP 连接各种应用程序。  Here is a [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview) tutorial.


以下是配置中的一些专有名词：

`CASDOOR_HOSTNAME`：私有部署的Casdoor域名或IP。

`Jira_HOSTNAME`: 部署 Jira 的域名或 IP。

## 步骤1. 部署 Casdoor 和 Jira

首先，应该部署[Casdoor](/docs/basic/server-installation) 和 [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview) 。

成功部署后，您需要确保：

1. 设置 Jira URL(Plans -> Administration -> System -> 常规配置) 为 `Jira_HOSTNAME` ![Jira URL](/img/integration/java/jira/Jira_HOSTNAME.png)
2. Casdoor 可以正常登录使用。
3. 您可以设置 CASDOOR_HOSTNAME = `http://localhost:8000`。 在 `prod` 模式下部署Casdoor。 详见 [生产模式](https://casdoor.org/docs/basic/server-installation#production-mode)。

## 步骤2. Configure Casdoor application and Jira

1. 创建或使用现有的 Casdoor 应用程序。
2. You should install a [miniOrange](https://marketplace.atlassian.com/apps/1217688/mo-jira-oauth-sso-jira-openid-connect-sso-jira-oidc-sso?hosting=cloud&tab=overview) app to support OAuth.You can find this app in Plans->Administration->Find new apps->search ![Jira应用程序](/img/integration/java/jira/Jira_install.png)
3. 将 `选定的应用程序` 设置为自定义 OpenId
4. 查找重定向url： ![Jira Callback](/img/integration/java/jira/Jira_CallbackURL.png)
5. 添加您的重定向url: ![添加应用](/img/integration/java/jira/Jira_application.png)
6. 您应该配置此应用 ![Jira Config](/img/integration/java/jira/Jira_Config.png)

- `Token server url`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
- `Authorization server url`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
- `UserInfo server url`: **http://`CASDOOR_HOSTNAME`/api/get-account**
- `Scopes`: `address phone openid profile offline_access email`

打开你喜欢的浏览器，访问：**http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**，你会看到 Casdoor 的 OIDC 配置。

退出Jira并测试SSO。 ![Jira登录](/img/integration/java/jira/Jira_login.gif)
