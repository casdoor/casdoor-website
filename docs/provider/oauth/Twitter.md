---
title: Twitter OAuth
description: Add Twitter (X) as an OAuth provider (developer account required).
keywords: [Twitter, OAuth, X]
authors: [Marvelousp4]
---

:::caution
Twitter’s developer signup and app review can be strict. Approval may take time.
:::

1. Go to the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) and create or open a project and app.
2. In **Authentication settings**:
   - Enable **3-legged OAuth** (required for “Sign in with Twitter” and posting on behalf of users).
   - Enable **Request email address from users** if you need email.
3. Set the **Callback URL** to your Casdoor callback URL and save.

Casdoor uses **PKCE** (Proof Key for Code Exchange) for Twitter OAuth: a code verifier is generated per flow and sent during token exchange to reduce authorization-code interception risks.
