---
title: GitHub OAuth
description: Add GitHub as an OAuth provider (web or device flow).
keywords: [GitHub, OAuth]
authors: [ErikQQY]
---

GitHub OAuth supports both the web application flow and the device flow. Use a **GitHub App** (not a legacy OAuth App) so you can configure multiple redirect URIs for test and production. See [GitHub: Migrating OAuth Apps to GitHub Apps](https://docs.github.com/en/developers/apps/getting-started-with-apps/migrating-oauth-apps-to-github-apps).

## Register a GitHub App

1. Go to [GitHub Developer Settings](https://github.com/settings/apps/new) and create a new **GitHub App**.
2. Set **GitHub App name**, **Homepage URL**, **Description**, and **Callback URL**.

![GitHub](/img/providers/OAuth/github.png)

:::info
In the GitHub App, **Callback URL** must be **Casdoor’s callback URL**. In Casdoor, the application **Redirect URL** is your app’s callback URL. See [Application config](/docs/application/config#how-the-flow-works).
:::

3. After creating the app, generate the **Client secret** (under the app settings).

![GitHub Client ID](/img/providers/OAuth/githubclient.png)

## Add the provider in Casdoor

Create an **OAuth** provider, set **Type** to **GitHub**, and enter the **Client ID** and **Client Secret** from the GitHub App.

![Github Provider](/img/providers/OAuth/githubprovider.png)

![githubapps](/img/providers/OAuth/githubapps.png)
