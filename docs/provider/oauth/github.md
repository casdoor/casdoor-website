---
sidebar_position: 2
title: Github
---
GitHub OAuth support both web application flow and device flow, please continue reading to obtain OAuth credential.

First, please visit [GitHub developer settings](https://github.com/settings/apps/new) to register a new GitHub App.

:::caution

**Tricks:** We recommend that you use GitHub Apps to replace the OAuth Apps, because GitHub Apps can add multiple redirect uri, which can bring convenience when deploying test and production environments. [GitHub](https://docs.github.com/en/developers/apps/getting-started-with-apps/migrating-oauth-apps-to-github-apps) official also recommend using GitHub Apps instead of OAuth Apps.

![githubapps](/img/providers/OAuth/githubapps.png)

:::

Then fill the **Github App name**, **Homepage URL**, **description** and **Callback URL**.

![GitHub](/img/providers/OAuth/github.png)


:::info Set authorization callback URL correctly

In GitHub App config, the `Callback URL` must be **your Casdoor's callback url**, and the `Redirect URL` in Casdoor should be **your application callback url**

More details please read [App config](/docs/application/config#further-understanding)

:::

After registering your GitHub App, you can generate your `Client Secret` now!

![GitHub Client ID](/img/providers/OAuth/githubclient.png)

Add a GitHub OAuth provider and fill the `Client ID` and `Client Secret` in your Casdoor

![Github Provider](/img/providers/OAuth/githubprovider.png)

Now you can use GitHub as third party service to complete authentication.
