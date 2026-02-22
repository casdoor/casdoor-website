---
title: GitLab OAuth
description: Add GitLab (or self-hosted GitLab) as an OAuth provider.
keywords: [GitLab, OAuth]
authors: [hsluoyz]
---

Use the [GitLab Applications](https://gitlab.com/-/profile/applications) page (or `https://<your-gitlab>/-/profile/applications` for self-hosted) to create an OAuth application.

## Create the GitLab application

1. Click **Add new application**.
2. Set **Name** (e.g. "Casdoor"), **Redirect URI**, and **Scopes**.

:::caution
Enable scopes **read_user** and **profile**. Without them, authentication can fail.
:::

:::info
In GitLab, **Redirect URI** must be **Casdoor’s callback URL**. In Casdoor, the application **Redirect URL** is your application’s callback URL. See [Application config](/docs/application/config#how-the-flow-works).
:::

3. After creating the app, copy **Application ID** and **Secret** from the app details.

## Add the provider in Casdoor

Create an **OAuth** provider, set **Type** to **GitLab**, and enter **Application ID** as **Client ID** and **Secret** as **Client Secret**.
