---
title: Flarum
description: Using OAuth2 to connect various applications, like Flarum
keywords: [OAuth2, Flarum, IDP]
authors: [jakiuncle]
---

[Casdoor](/docs/basic/server-installation) can use OAuth2 to connect various applications. In this example, we will show you how to use OAuth2 to connect Flarum to your applications.

Here are some configuration names you will need:

`CASDOOR_HOSTNAME`: The domain name or IP where the Casdoor server is deployed.

`Flarum_HOSTNAME`: The domain name or IP where Flarum is deployed.

## Step 1: Deploy Casdoor and Flarum

First, deploy [Casdoor](/docs/basic/server-installation) and [Flarum](https://flarum.org/).

After a successful deployment, make sure:

1. You have downloaded the Flarum plugin [FoF Passport](https://github.com/FriendsOfFlarum/passport).
2. Casdoor can be logged in and used normally.
3. You can set CASDOOR_HOSTNAME = `http://localhost:8000` when deploying Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step 2: Configure Casdoor application

1. Create a new Casdoor application or use an existing one.
2. Find the redirect URL: `<CASDOOR_HOSTNAME>/auth/passport`.
3. Add the redirect URL to the Casdoor application: ![Redirect](/img/integration/php/Flarum/RedirectURL.png)

On the application settings page, you will find two values: `Client ID` and `Client secret`. We will use these values in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**. You will see the OIDC configuration of Casdoor.

## Step 3: Configure Flarum

1. Install the plugin [FoF Passport](https://github.com/FriendsOfFlarum/passport).
2. Configure the app: ![configure](/img/integration/php/Flarum/ssoConfigure.png)
3. Find the Client ID and Client Secret in the Casdoor application page.

- `Token server URL`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
- `Authorization server URL`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
- `UserInfo server URL`: **http://`CASDOOR_HOSTNAME`/api/get-account**
- `Scopes`: `address phone openid profile offline_access email`

Log out of Flarum and test SSO.
![Flarum Login](/img/integration/php/Flarum/login.gif)
