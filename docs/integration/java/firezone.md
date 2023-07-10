---
title: FireZone
description:  Using OIDC protocol as IDP to connect various applications, like FireZone
keywords: [OIDC, FireZone, IDP]
authors: [dingchenzy]
---

[Casdoor](/docs/basic/server-installation) can use OIDC protocol as IDP to connect various applications. Here we will use [FireZone](https://docs.firezone.dev/deploy/) as an example to show you how to use OIDC to connect to your applications.

## Step 1. Deploy Casdoor and FireZone

Firstly, the Casdoor and FireZone should be deployed.

After a successful deployment, you need to ensure:

1. Set FireZone URL(Sigin -> Security -> Add OpenID Connect Provider) to FIREZONE_HOSTNAME.

    ![FIREZONE_HOSTNAME](/img/integration/java/firezone/Fire_Hostname.jpg)

2. Casdoor can be logged in and used normally.

3. `CASDOOR_HOSTNAME`: <http://localhost:8000>. If you deploy Casdoor using default `app.conf`.

## Step 2. Configure Casdoor application

1. Create or use an existing Casdoor application.

2. Add a redirect url:

    For example, the Configid in the FireZone Provider is TEST, so the redirect URL should be `http://[FIREZONE_HOST]/auth/oidc/[PROVIDER_CONFIG_ID]/callback/`

    ![REDIRECT_URL](/img/integration/java/firezone/Fire_RedirectURL.jpg)

    Open your favorite browser and visit: `http://[CASDOOR_HOSTNAME]/.well-known/openid-configuration`, you will see the OIDC configure of Casdoor.

3. Configure FireZone, Security -> Add OpenID Connect Provider

    ![OIDC_CONFIG](/img/integration/java/firezone/Fire_OIDCCONFIG.jpg)

    - `Discovery Document URI`: FireZone Provider Discovery Document URI should be `https://[CASDOOR_HOST]/.well-known/openid-configuration`
    - `Scopes`: `openid email profile`
    - `ConfigID`: ConfigID should be the PROVIDER_COONFIG_ID of the redirect URL and should correspond to casdoor redirect URL
    - `Auto create users`: Successful login will automatically create a user

## Log out of FireZone, and test SSO

![FIREZONELOGIN](/img/integration/java/firezone/Fire_LOGINFIREZONE.gif)
