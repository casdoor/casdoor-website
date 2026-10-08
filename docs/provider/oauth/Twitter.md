---
title: Add Twitter as an OAuth provider
sidebar_label: Twitter
description: Let users sign in to Casdoor with their Twitter (X) account.
keywords: [Twitter, OAuth, X]
authors: [Marvelousp4]
---

This guide explains how to let users sign in to Casdoor with their Twitter (X) account.

---

#### Learning outcomes

- Configure the authentication settings of a Twitter app.
- Add Twitter as an OAuth provider in Casdoor.

#### What you need

- A Twitter developer account. The sign-up and the review of apps can take time.
- Administrator access to the Casdoor admin console

---

## Configure the Twitter app

1. In the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard), create or open a project and an app.
1. In the authentication settings of the app:

   - Turn on **3-legged OAuth**, which Sign in with Twitter requires.
   - To receive the email address of users, turn on **Request email address from users**.
   - Set **Callback URL** to the callback URL of Casdoor, `https://<your-casdoor-host>/callback`.

1. Save the settings and copy the client ID and the client secret of the app.

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Twitter`.
1. Enter the **Client ID** and the **Client secret**.
1. Save the provider.

Casdoor uses Proof Key for Code Exchange (PKCE) with Twitter: it generates a code verifier for each sign-in and sends it in the token exchange. You don't configure anything for this.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
