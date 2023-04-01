---
title: Confluence
description:  Using OIDC protocol as IDP to connect various applications, like Confluence
keywords: [OIDC, Confluence, IDP]
authors: [jakiuncle]
---

[Casdoor](/docs/basic/server-installation) can use OIDC protocol as IDP to connect various applications. Here we will use [Confluence](https://www.atlassian.com/software/confluence) as an example to show you how to use OIDC to connect to your applications.

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.

`Confluence_HOSTNAME`: Domain name or IP where Confluence is deployed.

## Step1. Deploy Casdoor and Confluence

Firstly, the [Casdoor](/docs/basic/server-installation) and [Confluence](https://www.atlassian.com/software/confluence) should be deployed.

After a successful deployment, you need to ensure:

1. Set Confluence URL to `Confluence_HOSTNAME`.
![Confluence URL](/img/integration/java/confluence/Confluence_HOSTNAME.png)
1. Casdoor can be logged in and used normally.
2. You can set CASDOOR_HOSTNAME = `http://localhost:8000`. When deploy Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step2. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Find a redirect url: ![Confluence Callback](/img/integration/java/confluence/Confluence_CallbackURL.png)
3. Add a redirect url: ![Confluence Application](/img/integration/java/confluence/Confluence_Config.png)
4. Add provider you want and supplement other settings.

Not surprisingly, you can get two values ​​on the application settings page: `Client ID` and `Client secret` like the picture above, we will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## Step3. Configure Confluence

1. You should install a [miniOrange](https://www.miniorange.com) app to support OAuth.You can find this app in ![Confluence App](/img/integration/java/confluence/confluence_App.png)
2. You should config this app ![Confluence Config](/img/integration/java/confluence/Confluence_Config2.png)
3. Set `Selected Application` to Custom OpenId
4. You can find Client Id and Client Secret in Casdoor application page.

- `Token server url`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
- `Authorization server url`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
- `UserInfo server url`: **http://`CASDOOR_HOSTNAME`/api/get-account**
- `Scopes`: `address phone openid profile offline_access email`

1. You can configure more complex authorization later, for now check if OpenID actually works.

Log out of Confluence, and test SSO.
![Confluence Login](/img/integration/java/confluence/confluence.gif)
