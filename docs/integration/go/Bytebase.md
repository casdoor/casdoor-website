---
title: Bytebase
description:  Using OAuth2 to connect various applications, like Bytebase
keywords: [OAuth2, Bytebase, IDP]
authors: [jakiuncle]
---

[Casdoor](/docs/basic/server-installation) can use OAuth2 to connect various applications. Here we will use [Bytebase](https://www.bytebase.com/docs/get-started/install/deploy-with-docker?source=demo) as an example to show you how to use OAuth2 to connect to your applications.

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.

`Bytebase_HOSTNAME`: Domain name or IP where Bytebase is deployed.

## Step1. Deploy Casdoor and Bytebase

Firstly, the [Casdoor](/docs/basic/server-installation) and [Bytebase](https://www.bytebase.com/docs/get-started/install/deploy-with-docker?source=demo) should be deployed.

After a successful deployment, you need to ensure:

1. Casdoor can be logged in and used normally.
2. You can set CASDOOR_HOSTNAME = `http://localhost:8000`. When deploy Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step2. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Find a redirect url: `<CASDOOR_HOSTNAME>/oauth/callback`
3. Add your redirect url to casdoor application: ![Redirect](/img/integration/go/Bytebase/application.png)

Not surprisingly, you can get two values ​​on the application settings page: `Client ID` and `Client secret` like the picture above, we will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## Step3. Configure Bytebase

1. You should find sso and use OAuth 2.0 ![Find_SSO](/img/integration/go/Bytebase/Find_SSO.png)
2. You should config this app ![configure](/img/integration/go/Bytebase/sso.png)
3. You can find Client Id and Client Secret in Casdoor application page.

- `Token server url`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
- `Authorization server url`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
- `UserInfo server url`: **http://`CASDOOR_HOSTNAME`/api/get-account**
- `Scopes`: `address phone openid profile offline_access email`

Log out of Bytebase, and test SSO.
![Login](/img/integration/go/Bytebase/login.gif)
