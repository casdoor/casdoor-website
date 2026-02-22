---
title: Using the miniOrange plugin
description: Connect casdoor and Jira using the OIDC protocol as the IDP
keywords: [OIDC, Jira, IDP]
authors: [jakiuncle]
---

This tutorial explains how to use [miniOrange](https://marketplace.atlassian.com/apps/1217688/mo-jira-oauth-sso-jira-openid-connect-sso-jira-oidc-sso?hosting=cloud&tab=overview) to connect casdoor and Jira.

This guide connects [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview) to [Casdoor](/docs/basic/server-installation) via OIDC using the miniOrange plugin.

The following are some important names in the configuration:

`CASDOOR_HOSTNAME`: The domain name or IP where the Casdoor server is deployed.

`Jira_HOSTNAME`: The domain name or IP where Jira is deployed.

## Step 1: Deploy Casdoor and Jira

Deploy [Casdoor](/docs/basic/server-installation) and [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview).

After successful deployment, make sure:

1. Set Jira URL (Plans -> Administration -> System -> General Configuration) to `Jira_HOSTNAME`.
![Jira URL](/img/integration/java/jira/Jira_HOSTNAME.png)
2. Casdoor can be logged in and used normally.
3. For local `prod` mode, set `CASDOOR_HOSTNAME` to `http://localhost:8000`. See [production mode](/docs/basic/server-installation#production-mode).

## Step 2: Configure Casdoor Application and Jira

1. Create a new Casdoor application or use an existing one.
2. Install the [miniOrange OIDC app](https://marketplace.atlassian.com/apps/1217688/mo-jira-oauth-sso-jira-openid-connect-sso-jira-oidc-sso?hosting=cloud&tab=overview) (Plans → Administration → Find new apps → search). ![Jira App](/img/integration/java/jira/Jira_install.png)
3. Set `Selected Application` to Custom OpenId.
4. Find the redirect URL: ![Jira Callback](/img/integration/java/jira/Jira_CallbackURL.png)
5. Add the redirect URL: ![Jira Application](/img/integration/java/jira/Jira_application.png)
6. Configure the app as follows: ![Jira Config](/img/integration/java/jira/Jira_Config.png)
   - `Token server URL`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
   - `Authorization server URL`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
   - `UserInfo server URL`: **http://`CASDOOR_HOSTNAME`/api/get-account**
   - `Scopes`: `address phone openid profile offline_access email`

OIDC discovery: `http://<CASDOOR_HOSTNAME>/.well-known/openid-configuration`.

Log out of Jira and test SSO.
![Jira Login](/img/integration/java/jira/Jira_login.gif)
