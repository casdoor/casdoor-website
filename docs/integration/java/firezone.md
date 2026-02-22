---
title: FireZone
description: Using the OIDC protocol as the IDP to connect various applications, such as FireZone
keywords: [OIDC, FireZone, IDP]
authors: [dingchenzy]
---

This guide configures [FireZone](https://docs.firezone.dev/deploy/) to use [Casdoor](/docs/basic/server-installation) as the OIDC IdP.

## Step 1: Deploy Casdoor and FireZone

Deploy Casdoor and FireZone.

After a successful deployment, ensure the following:

1. Set the FireZone URL (Sigin -> Security -> Add OpenID Connect Provider) to FIREZONE_HOSTNAME.

    ![FIREZONE_HOSTNAME](/img/integration/java/firezone/Fire_Hostname.jpg)

2. Casdoor can be logged in and used normally.

3. `CASDOOR_HOSTNAME`: `http://localhost:8000`, if you deploy Casdoor using the default `app.conf`.

## Step 2: Configure Casdoor application

1. Create a new Casdoor application or use an existing one.

2. Add a redirect URL:

    For example, if the Configid in the FireZone Provider is TEST, the redirect URL should be `http://[FIREZONE_HOST]/auth/oidc/[PROVIDER_CONFIG_ID]/callback/`.

    ![REDIRECT_URL](/img/integration/java/firezone/Fire_RedirectURL.jpg)

    OIDC discovery: `http://<CASDOOR_HOSTNAME>/.well-known/openid-configuration`.

3. Configure FireZone: Security -> Add OpenID Connect Provider

    ![OIDC_CONFIG](/img/integration/java/firezone/Fire_OIDCCONFIG.jpg)

    - `Discovery Document URI`: The FireZone Provider Discovery Document URI should be `https://[CASDOOR_HOST]/.well-known/openid-configuration`.
    - `Scopes`: `openid email profile`
    - **ConfigID**: Must match the provider config ID used in the redirect URL (e.g. if redirect URL is `.../auth/oidc/TEST/callback/`, use ConfigID `TEST`).
    - `Auto-create users`: Successful login will automatically create a user.

## Log out of FireZone and test SSO

![FIREZONELOGIN](/img/integration/java/firezone/Fire_LOGINFIREZONE.gif)
