---
sidebar_position: 2
title: Github
---
GitHub OAuth support both web application flow and device flow, please continue reading to obtain OAuth credential.

First, please visit [GitHub developer settings](https://github.com/settings/applications/new) to register a new OAuth app.

![GitHub](/img/providers/OAuth/github.png)

Then fill the **application name**, **homepage url**, **description** and **Authorization callback URL**.

:::info Set authorization callback URL correctly

In GitHub OAuth config, the `authorization callback URL` must be **your Casdoor's callback url**, and the `Redirect URL` in Casdoor should be **your application callback url**

More details please read [App config](/docs/application/config#further-understanding)

:::

After registering your GitHub OAuth app, you can generate your `Client Secret` now!

![GitHub Client ID](/img/providers/OAuth/githubclient.png)

Add a GitHub OAuth provider and fill the `Client ID` and `Client Secret` in your Casdoor

![Github Provider](/img/providers/OAuth/githubprovider.png)

Now you can use GitHub as third party service to complete authentication.

:::caution

**Tricks:** While we can't set multiple redirect urls in GitHub, so in development and production environment, we need to set different GitHub providers. 

In development environment, Casdoor will only display the GitHub provider **with** "localhost" in its name. And in productoin environment, Casdoor will only display the GitHub provider **without** "localhost" in its name.

This is how we do in our online demo:

![githublocalhost](/img/githublocalhost.png)

:::