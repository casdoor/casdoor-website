---
title: Bytebase
description: Using OAuth2 to connect various applications, like Bytebase
keywords: [OAuth2, Bytebase, IDP]
authors: [jakiuncle]
---

[Casdoor](/docs/basic/server-installation) can use OAuth2 to connect various applications. In this example, we will use [Bytebase](https://www.bytebase.com/docs/get-started/self-host/) to demonstrate how to use OAuth2 to connect to your applications.

The following are the configuration names:

`CASDOOR_HOSTNAME`: The domain name or IP address where the Casdoor server is deployed.

`Bytebase_HOSTNAME`: The domain name or IP address where Bytebase is deployed.

## Step 1: Deploy Casdoor and Bytebase

Firstly, deploy [Casdoor](/docs/basic/server-installation) and [Bytebase](https://www.bytebase.com/docs/get-started/self-host/).

After successful deployment, make sure that:

1. Casdoor can be logged in and used normally.
2. You can set `CASDOOR_HOSTNAME` to `http://localhost:8000` when deploying Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step 2: Configure Casdoor application

1. Create a new or use an existing Casdoor application.
2. Find the redirect URL: `<CASDOOR_HOSTNAME>/oauth/callback`.
3. Add the redirect URL to the Casdoor application: ![Redirect](/img/integration/go/Bytebase/application.png)

On the application settings page, you will find two values: `Client ID` and `Client secret`. We will use these values in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**. You will see the OIDC configuration of Casdoor.

## Step 3: Configure Bytebase

1. Find SSO and select OAuth 2.0: ![Find SSO](/img/integration/go/Bytebase/Find_SSO.png)
2. Configure this app: ![Configure](/img/integration/go/Bytebase/sso.png)
3. Find the Client ID and Client Secret on the Casdoor application page.

- `Token server URL`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
- `Authorization server URL`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
- `User Info server URL`: **http://`CASDOOR_HOSTNAME`/api/get-account**
- Scopes: `address phone openid profile offline_access email`

Log out of Bytebase and test SSO.
![Login](/img/integration/go/Bytebase/login.gif)
