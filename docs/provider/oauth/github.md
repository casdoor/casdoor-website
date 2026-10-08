---
title: Add GitHub as an OAuth provider
sidebar_label: GitHub
description: Let users sign in to Casdoor with their GitHub account, through the web flow or the device flow.
keywords: [GitHub, OAuth]
authors: [ErikQQY]
---

This guide explains how to let users sign in to Casdoor with their GitHub account. The provider supports the web application flow and the device flow of GitHub.

---

#### Learning outcomes

- Register a GitHub App for Casdoor.
- Add GitHub as an OAuth provider in Casdoor.

#### What you need

- A GitHub account
- Administrator access to the Casdoor admin console

---

## Register a GitHub App

Use a GitHub App, not a legacy OAuth App. A GitHub App accepts several callback URLs, so one app can serve test and production. See [Migrating OAuth Apps to GitHub Apps](https://docs.github.com/en/developers/apps/getting-started-with-apps/migrating-oauth-apps-to-github-apps).

1. Open [New GitHub App](https://github.com/settings/apps/new) in the developer settings of GitHub.
1. Fill in **GitHub App name**, **Homepage URL**, and **Description**.
1. Set **Callback URL** to the callback URL of Casdoor: `https://<your-casdoor-host>/callback`. This is the URL of Casdoor, not of your own application. See [Redirect URL and callback URL](/docs/application/config#how-the-flow-works).

   ![GitHub App registration form](/img/providers/OAuth/github.png)

1. Create the app.
1. In the settings of the app, generate a client secret, and copy the **Client ID** and the client secret.

   ![Client ID and client secret of the GitHub App](/img/providers/OAuth/githubclient.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `GitHub`.
1. Enter the **Client ID** and the **Client secret** of the GitHub App.

   ![GitHub provider in Casdoor](/img/providers/OAuth/githubprovider.png)

1. Save the provider.

![GitHub App settings](/img/providers/OAuth/githubapps.png)

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
