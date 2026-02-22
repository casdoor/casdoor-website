---
title: Azure AD B2C OAuth
description: Add Azure AD B2C as an OAuth provider.
keywords: [Azure AD B2C, OAuth]
authors: [nomeguy]
---

Azure AD B2C is a customer identity platform supporting OpenID Connect, OAuth 2.0, and SAML. Use it as an OAuth provider so users can sign in with B2C accounts.

## 1. Create a B2C tenant

Create a B2C tenant in the [Azure Portal](https://portal.azure.com/).

## 2. Register an application

In the B2C tenant, register an application and note the **Application (client) ID**.

![azuread_register.png](/img/providers/OAuth/azuread_register.png)

## 3. Create a client secret

Create a **client secret** for the app and copy its value (it is shown only once).

![azuread_secret.png](/img/providers/OAuth/azuread_secret.png)

## 4. Add redirect URIs

In the app registration, add the **Redirect URIs** (e.g. your Casdoor callback URL).

![azuread_uri.png](/img/providers/OAuth/azuread_uri.png)

## 5. Define user flows

In B2C, define user flows for sign-up, sign-in, and profile management as needed.

## 6. Add the provider in Casdoor

**Providers** → **Add**. Set **Category** to **OAuth**, **Type** to **Azure AD B2C**. Enter the **Client ID** and **Client secret** from the B2C app.

![azuread_casdoor.png](/img/providers/OAuth/azuread_casdoor.png)
