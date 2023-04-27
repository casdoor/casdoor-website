---
title: Via miniOrange Plugin
description:  Using OIDC protocol as IDP to connect various applications, like Jira
keywords: [OIDC, Jira, IDP]
authors: [jakiuncle]
---

This is a tutorial on using [miniOrange](https://marketplace.atlassian.com/apps/1217688/mo-jira-oauth-sso-jira-openid-connect-sso-jira-oidc-sso?hosting=cloud&tab=overview) to connect casdoor and jira

[Casdoor](/docs/basic/server-installation) can use OIDC protocol as IDP to connect various applications.  Here is a [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview) tutorial.


The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.

`Jira_HOSTNAME`: Domain name or IP where Jira is deployed.

## Step1. Deploy Casdoor and Jira

Firstly, the [Casdoor](/docs/basic/server-installation) and [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview) should be deployed.

After a successful deployment, you need to ensure:

1. Set Jira URL(Plans -> Administration -> System -> General configuration) to `Jira_HOSTNAME`.
![Jira URL](/img/integration/java/jira/Jira_HOSTNAME.png)
2. Casdoor can be logged in and used normally.
3. You can set CASDOOR_HOSTNAME = `http://localhost:8000`. When deploy Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step2. Configure Casdoor application and Jira

1. Create or use an existing Casdoor application.
2. You should install a [miniOrange](https://marketplace.atlassian.com/apps/1217688/mo-jira-oauth-sso-jira-openid-connect-sso-jira-oidc-sso?hosting=cloud&tab=overview) app to support OAuth.You can find this app in Plans->Administration->Find new apps->search ![Jira App](/img/integration/java/jira/Jira_install.png)
3. Set `Selected Application` to Custom OpenId
4. Find a redirect url: ![Jira Callback](/img/integration/java/jira/Jira_CallbackURL.png)
5. Add a redirect url: ![Jira Application](/img/integration/java/jira/Jira_application.png)
6. You should config this app ![Jira Config](/img/integration/java/jira/Jira_Config.png)

- `Token server url`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
- `Authorization server url`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
- `UserInfo server url`: **http://`CASDOOR_HOSTNAME`/api/get-account**
- `Scopes`: `address phone openid profile offline_access email`

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

Log out of Jira, and test SSO.
![Jira Login](/img/integration/java/jira/Jira_login.gif)
