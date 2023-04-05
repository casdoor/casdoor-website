---
title: Flarum
description:  Using OAuth2 to connect various applications, like Flarum
keywords: [OAuth2, Flarum, IDP]
authors: [jakiuncle]
---

[Casdoor](/docs/basic/server-installation) can use OAuth2 to connect various applications. Here we will use [Flarum](https://flarum.org/) as an example to show you how to use OAuth2 to connect to your applications.

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.

`Flarum_HOSTNAME`: Domain name or IP where Flarum is deployed.

## Step1. Deploy Casdoor and Flarum

Firstly, the [Casdoor](/docs/basic/server-installation) and [Flarum](https://flarum.org/) should be deployed.

After a successful deployment, you need to ensure:

1. Download the Flarum plugin [FoF Passport](https://github.com/FriendsOfFlarum/passport)
2. Casdoor can be logged in and used normally.
3. You can set CASDOOR_HOSTNAME = `http://localhost:8000`. When deploy Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step2. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Find a redirect url: `<CASDOOR_HOSTNAME>/auth/passport`
3. Add your redirect url to casdoor application: ![Redirect](/img/integration/php/Flarum/RedirectURL.png)

Not surprisingly, you can get two values ​​on the application settings page: `Client ID` and `Client secret` like the picture above, we will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## Step3. Configure Flarum

1. You should install a plugin [FoF Passport](https://github.com/FriendsOfFlarum/passport)
2. You should config this app ![configure](/img/integration/php/Flarum/ssoConfigure.png)
3. You can find Client Id and Client Secret in Casdoor application page.

- `Token server url`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
- `Authorization server url`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
- `UserInfo server url`: **http://`CASDOOR_HOSTNAME`/api/get-account**
- `Scopes`: `address phone openid profile offline_access email`

Log out of Flarum, and test SSO.
![Flarum Login](/img/integration/php/Flarum/login.gif)
