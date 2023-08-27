---
title: Using the miniOrange Plugin
description: Connect casdoor and Jira using the OIDC protocol as the IDP
keywords: [OIDC, Jira, IDP]
authors: [jakiuncle]
---

This tutorial explains how to use [miniOrange](https://marketplace.atlassian.com/apps/1217688/mo-jira-oauth-sso-jira-openid-connect-sso-jira-oidc-sso?hosting=cloud&tab=overview) to connect casdoor and Jira.

[Casdoor](/docs/basic/server-installation) can use the OIDC protocol as the IDP to connect various applications. You can refer to this [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview) tutorial for more information.

The following are some important names in the configuration:

`CASDOOR_HOSTNAME`: The domain name or IP where the Casdoor server is deployed.

`Jira_HOSTNAME`: The domain name or IP where Jira is deployed.

## Step 1: Deploy Casdoor and Jira

Firstly, deploy [Casdoor](/docs/basic/server-installation) and [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview).

After successful deployment, make sure:

1. Set Jira URL (Plans -> Administration -> System -> General Configuration) to `Jira_HOSTNAME`.
![Jira URL](/img/integration/java/jira/Jira_HOSTNAME.png)
2. Casdoor can be logged in and used normally.
3. You can set `CASDOOR_HOSTNAME` to `http://localhost:8000` when deploying Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step 2: Configure Casdoor Application and Jira

1. Create a new Casdoor application or use an existing one.
2. Install the [miniOrange](https://marketplace.atlassian.com/apps/1217688/mo-jira-oauth-sso-jira-openid-connect-sso-jira-oidc-sso?hosting=cloud&tab=overview) app to support OAuth. You can find this app in Plans->Administration->Find new apps->search ![Jira App](/img/integration/java/jira/Jira_install.png)
3. Set `Selected Application` to Custom OpenId.
4. Find the redirect URL: ![Jira Callback](/img/integration/java/jira/Jira_CallbackURL.png)
5. Add the redirect URL: ![Jira Application](/img/integration/java/jira/Jira_application.png)
6. Configure the app as follows: ![Jira Config](/img/integration/java/jira/Jira_Config.png)
   - `Token server URL`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
   - `Authorization server URL`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
   - `UserInfo server URL`: **http://`CASDOOR_HOSTNAME`/api/get-account**
   - `Scopes`: `address phone openid profile offline_access email`

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**. You will see the OIDC configuration of Casdoor.

Log out of Jira and test SSO.
![Jira Login](/img/integration/java/jira/Jira_login.gif)
