---
title: GitLab
description: Add GitLab OAuth provider to your application
keywords: [GitLab, OAuth]
authors: [hsluoyz]
---

To set up the GitLab OAuth provider, please go to the [GitLab Applications](https://gitlab.com/-/profile/applications) page (or your self-hosted GitLab instance's equivalent page at `https://your-gitlab-instance/-/profile/applications`).

Create a new application by clicking on **"Add new application"** and fill in the following information:

1. **Name**: Enter a name for your application (e.g., "Casdoor")
2. **Redirect URI**: Enter your Casdoor callback URL
3. **Scopes**: Select the required scopes

:::caution Required Scopes

Casdoor's GitLab OAuth provider requires the following scopes: **read_user** and **profile**. Make sure to check these scopes when creating your GitLab application; otherwise, authentication may fail.

:::

:::info Set the redirect URI correctly

In the GitLab OAuth config, the `Redirect URI` must be **your Casdoor's callback URL**, and the `Redirect URL` in Casdoor should be **your application's callback URL**.

For more details, please read the [App config](/docs/application/config#further-understanding) guide.

:::

After creating the GitLab application, you can obtain the **Application ID** and **Secret** from the application details page.

Add a GitLab OAuth provider in Casdoor and enter the **Application ID** as `Client ID` and **Secret** as `Client Secret`.

Now you can use GitLab as a third-party service to complete authentication!
