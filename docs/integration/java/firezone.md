---
title: FireZone
description: Using the OIDC protocol as the IDP to connect various applications, such as FireZone
keywords: [OIDC, FireZone, IDP]
authors: [dingchenzy]
---

[Casdoor](/docs/basic/server-installation) can use the OIDC protocol as the IDP to connect various applications. Here, we will use [FireZone](https://docs.firezone.dev/deploy/) as an example to show you how to use OIDC to connect to your applications.

## Step 1: Deploy Casdoor and FireZone

Firstly, Casdoor and FireZone should be deployed.

After a successful deployment, ensure the following:

1. Set the FireZone URL (Sigin -> Security -> Add OpenID Connect Provider) to FIREZONE_HOSTNAME.

    ![FIREZONE_HOSTNAME](/img/integration/java/firezone/Fire_Hostname.jpg)

2. Casdoor can be logged in and used normally.

3. `CASDOOR_HOSTNAME`: <http://localhost:8000>, if you deploy Casdoor using the default `app.conf`.

## Step 2: Configure Casdoor application

1. Create a new Casdoor application or use an existing one.

2. Add a redirect URL:

    For example, if the Configid in the FireZone Provider is TEST, the redirect URL should be `http://[FIREZONE_HOST]/auth/oidc/[PROVIDER_CONFIG_ID]/callback/`.

    ![REDIRECT_URL](/img/integration/java/firezone/Fire_RedirectURL.jpg)

    Open your favorite browser and visit: `http://[CASDOOR_HOSTNAME]/.well-known/openid-configuration`, and you will see the OIDC configuration of Casdoor.

3. Configure FireZone: Security -> Add OpenID Connect Provider

    ![OIDC_CONFIG](/img/integration/java/firezone/Fire_OIDCCONFIG.jpg)

    - `Discovery Document URI`: The FireZone Provider Discovery Document URI should be `https://[CASDOOR_HOST]/.well-known/openid-configuration`.
    - `Scopes`: `openid email profile`
    - `ConfigID`: The ConfigID should be the PROVIDER_COONFIG_ID of the redirect URL and should correspond to the Casdoor redirect URL.
    - `Auto-create users`: Successful login will automatically create a user.

## Log out of FireZone and test SSO

![FIREZONELOGIN](/img/integration/java/firezone/Fire_LOGINFIREZONE.gif)
