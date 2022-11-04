---
title: Jira
description:  Using OIDC protocol as IDP to connect various applications, like Jira
keywords: [OIDC, Jira, IDP]
---

Casdoor can use OIDC protocol as IDP to connect various applications. Here we will use Jira as an example to show you how to use OIDC to connect to your applications.

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.

`Jira_HOSTNAME`: Domain name or IP where Jira is deployed.

## Step1. Deploy Casdoor and Jira

Firstly, the [Casdoor](/docs/basic/server-installation) and Jira should be deployed.

After a successful deployment, you need to ensure:

1. Set Jira URL(Plans -> Administration -> System -> General configuration) to `Jira_HOSTNAME`.
![Jira URL](/img/integration/java/jira-oidc/Jira_HOSTNAME.png)
2. Casdoor can be logged in and used normally.
3. I use default prod so my CASDOOR_HOSTNAME = 'http://localhost:8000'.When deploy Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step2. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Find a redirect url: ![Jira Callback](/img/integration/java/jira-oidc/Jira_CallbackURL.png)
3. Add a redirect url: ![Jira Application](/img/integration/java/jira-oidc/Jira_application.png)
4. Add provider you want and supplement other settings.

Not surprisingly, you can get two values ​​on the application settings page: `Client ID` and `Client secret` like the picture above, we will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## Step3. Configure Jira

1. You should install a app to support OAuth ![Jira App](/img/integration/java/jira-oidc/Jira_install.png)
2. You should config this app ![Jira Config](/img/integration/java/jira-oidc/Jira_Config.png)
   - Set `Selected Application` to Custom OpenId
   - You can find Client Id and Client Secret in Casdoor application page.
     - `Token server url`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
     - `Authorization server url`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
     - `UserInfo server url`: **http://`CASDOOR_HOSTNAME`/api/get-account**
     - `Scopes`: `address phone openid profile offline_access email`
3. You should config User Profile Mapping like ![Jira Mapping](/img/integration/java/jira-oidc/Jira_mapping.png)
4. You can configure more complex authorization later, for now check if OpenID actually works.

Log out of Jari, and test SSO.
![Jira Login](/img/integration/java/jira-oidc/Jira_login.png)
