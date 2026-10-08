---
title: Add Steam as a sign-in provider
sidebar_label: Steam
description: Let users sign in to Casdoor with their Steam account, with a Steam Web API key.
keywords: [Steam, OAuth]
authors: [Marvelousp4]
---

This guide explains how to let users sign in to Casdoor with their Steam account.

---

#### Learning outcomes

- Get a Steam Web API key.
- Add Steam as a provider in Casdoor.

#### What you need

- A Steam account that owns at least one game. Steam issues API keys only to such accounts.
- Administrator access to the Casdoor admin console

---

## Get an API key

Sign in on the [Steam Web API key page](https://steamcommunity.com/dev/revokekey) and register a key for the domain or the IP address of Casdoor.

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Steam`.
1. Enter the API key as the **Client secret**. Leave **Client ID** empty.
1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [Steam Web API](https://steamcommunity.com/dev)
