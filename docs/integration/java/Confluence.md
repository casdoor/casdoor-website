---
title: Connecting Applications with OIDC Protocol - Confluence
description: Learn how to use OIDC protocol as IDP to connect Confluence and other applications.
keywords: [OIDC, Confluence, IDP]
authors: [jakiuncle]
---

[Casdoor](/docs/basic/server-installation) can use OIDC protocol as an IDP to connect various applications. In this guide, we will use [Confluence](https://www.atlassian.com/software/confluence) as an example to demonstrate how to use OIDC to connect your applications.

Deploy Casdoor and Confluence. Note these variables:

- `CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.
- `Confluence_HOSTNAME`: Domain name or IP where Confluence is deployed.

## Step 1: Deploy Casdoor and Confluence

First, deploy [Casdoor](/docs/basic/server-installation) and [Confluence](https://www.atlassian.com/software/confluence).

After successful deployment, ensure the following:

1. Set Confluence URL to `Confluence_HOSTNAME`.
   ![Confluence URL](/img/integration/java/confluence/Confluence_HOSTNAME.png)
2. Casdoor can be logged in and used normally.
3. For local `prod` mode, set `CASDOOR_HOSTNAME` to `http://localhost:8000`. See [production mode](/docs/basic/server-installation#production-mode).

## Step 2: Configure Casdoor application

1. Create a new Casdoor application or use an existing one.
2. Find a redirect URL:
   ![Confluence Callback](/img/integration/java/confluence/Confluence_CallbackURL.png)
3. Add the redirect URL to the application:
   ![Confluence Application](/img/integration/java/confluence/Confluence_Config.png)
4. Add the desired provider and configure other settings accordingly.

Note **Client ID** and **Client Secret** for the next step. OIDC discovery: `http://<CASDOOR_HOSTNAME>/.well-known/openid-configuration`.

## Step 3: Configure Confluence

1. Install the [miniOrange](https://www.miniorange.com) OAuth app. In Confluence:
   ![Confluence App](/img/integration/java/confluence/Confluence_App.png)
2. Configure the app:
   ![Confluence Config](/img/integration/java/confluence/Confluence_Config2.png)
3. Set `Selected Application` to Custom OpenID.
4. Retrieve the Client ID and Client Secret from the Casdoor application page.

Configure the following settings for Confluence:

- `Token server URL`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
- `Authorization server URL`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
- `UserInfo server URL`: **http://`CASDOOR_HOSTNAME`/api/get-account**
- `Scopes`: `address phone openid profile offline_access email`

Configure advanced authorization later if needed; first verify that OpenID sign-in works.

Log out of Confluence and test SSO:
![Confluence Login](/img/integration/java/confluence/confluence.gif)
