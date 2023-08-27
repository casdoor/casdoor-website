---
title: GitHub
description: Add GitHub OAuth provider to your application
keywords: [GitHub, OAuth]
authors: [ErikQQY]
---

GitHub OAuth supports both the web application flow and device flow. Please continue reading to obtain OAuth credentials.

First, please visit the [GitHub developer settings](https://github.com/settings/apps/new) to register a new GitHub App.

:::caution

**Tricks:** We recommend that you use GitHub Apps to replace OAuth Apps because GitHub Apps can add multiple redirect URIs, which can bring convenience when deploying test and production environments. The [GitHub](https://docs.github.com/en/developers/apps/getting-started-with-apps/migrating-oauth-apps-to-github-apps) official also recommends using GitHub Apps instead of OAuth Apps.

![githubapps](/img/providers/OAuth/githubapps.png)

:::

Then fill in the **GitHub App name**, **Homepage URL**, **description**, and **Callback URL**.

![GitHub](/img/providers/OAuth/github.png)

:::info Set the authorization callback URL correctly

In the GitHub App config, the `Callback URL` must be **your Casdoor's callback URL**, and the `Redirect URL` in Casdoor should be **your application's callback URL**.

For more details, please read [App config](/docs/application/config#further-understanding).

:::

After registering your GitHub App, you can now generate your `Client Secret`!

![GitHub Client ID](/img/providers/OAuth/githubclient.png)

Add a GitHub OAuth provider and fill in the `Client ID` and `Client Secret` in your Casdoor.

![Github Provider](/img/providers/OAuth/githubprovider.png)

Now you can use GitHub as a third-party service to complete authentication.
