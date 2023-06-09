---
title: Via Built-in SSO
description: Using OIDC protocol as IDP to connect various applications, like Jira
keywords:
  - OIDC
  - Jira
  - IDP
authors:
  - jakiuncle
---
This is a free method to connect casdoor, but your website must use https;

[Casdoor](/docs/basic/server-installation) can use OIDC protocol as IDP to connect various applications. Here is a [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview) tutorial.

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.

`Jira_HOSTNAME`: Domain name or IP where Jira is deployed.

## Step1. Deploy Casdoor and Jira

Firstly, the [Casdoor](/docs/basic/server-installation) and [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview) should be deployed.

After a successful deployment, you need to ensure:

1. Casdoor can be logged in and used normally.
2. You can set CASDOOR_HOSTNAME = `http://localhost:8000`. When deploy Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step2. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Find Authentication methods: ![Jira Callback](/img/integration/java/jira2/System.png)
3. Add a Configure and choose OpenId Connection signle sign-on in Authenication method ![Jira Method](/img/integration/java/jira2/method.png)
4. Find the redirect url: ![redirect](/img/integration/java/jira2/redirect.png)
5. Add a redirect url: ![Jira Application](/img/integration/java/jira2/jira_application.png)

Not surprisingly, you can get two values ​​on the application settings page: `Client ID` and `Client secret` like the picture above, we will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## Step3. Configure Jira

1. We need continue to config our Configure in jira ![Config](/img/integration/java/jira2/Config.png) ![Config2](/img/integration/java/jira2/Config2.png)

2. You can configure more complex authorization later, for now check if OpenID actually works. ![Jira Login](/img/integration/java/jira2/login.gif)
