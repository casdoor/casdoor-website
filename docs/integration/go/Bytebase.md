---
title: Bytebase
description: Use Casdoor as the OAuth2/OIDC provider for Bytebase SSO.
keywords: [OAuth2, Bytebase, IDP, SSO]
authors: [jakiuncle]
---

This guide configures [Bytebase](https://www.bytebase.com/docs/get-started/self-host/) to sign in via [Casdoor](/docs/basic/server-installation) using OAuth2/OIDC.

**Variables:** `CASDOOR_HOSTNAME` — Casdoor server URL (e.g. `http://localhost:8000`). `Bytebase_HOSTNAME` — Bytebase server URL.

## Step 1: Deploy Casdoor and Bytebase

Deploy [Casdoor](/docs/basic/server-installation) and [Bytebase](https://www.bytebase.com/docs/get-started/self-host/). Ensure both are running and you can sign in to Casdoor. For production, see [production mode](/docs/basic/server-installation#production-mode).

## Step 2: Configure Casdoor application

1. Create or open a Casdoor application.
2. Add redirect URL: `<CASDOOR_HOSTNAME>/callback` (e.g. `http://localhost:8000/callback`). Note **Client ID** and **Client secret** for Bytebase.

![Redirect](/img/integration/go/Bytebase/application.png)

OIDC discovery: `http://<CASDOOR_HOSTNAME>/.well-known/openid-configuration`

## Step 3: Configure Bytebase

1. In Bytebase open **SSO** and choose **OAuth 2.0**.
2. Enter Casdoor **Client ID** and **Client secret**. Set URLs:
   - **Token server URL**: `http://<CASDOOR_HOSTNAME>/api/login/oauth/access_token`
   - **Authorization server URL**: `http://<CASDOOR_HOSTNAME>/login/oauth/authorize`
   - **User Info server URL**: `http://<CASDOOR_HOSTNAME>/api/get-account`
   - **Scopes**: `address phone openid profile offline_access email`

![Find SSO](/img/integration/go/Bytebase/Find_SSO.png)
![Configure](/img/integration/go/Bytebase/sso.png)

Sign out of Bytebase and test SSO login.
![Login](/img/integration/go/Bytebase/login.gif)
