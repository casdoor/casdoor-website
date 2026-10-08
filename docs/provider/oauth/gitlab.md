---
title: Add GitLab as an OAuth provider
sidebar_label: GitLab
description: Let users sign in to Casdoor with their account on GitLab.com or on a self-hosted GitLab.
keywords: [GitLab, OAuth]
authors: [hsluoyz]
---

This guide explains how to let users sign in to Casdoor with their account on GitLab.com or on a self-hosted GitLab instance.

---

#### Learning outcomes

- Create an OAuth application in GitLab.
- Add GitLab as an OAuth provider in Casdoor.

#### What you need

- A GitLab account
- Administrator access to the Casdoor admin console

---

## Create the GitLab application

1. Open the [Applications](https://gitlab.com/-/profile/applications) page of your profile. On a self-hosted GitLab, the page is `https://<your-gitlab>/-/profile/applications`.
1. Click **Add new application**.
1. Fill in the fields:

   - **Name**: For example `Casdoor`.
   - **Redirect URI**: The callback URL of Casdoor, `https://<your-casdoor-host>/callback`. See [Redirect URL and callback URL](/docs/application/config#how-the-flow-works).
   - **Scopes**: Select at least `read_user` and `profile`. Without them, sign-in can fail.

1. Save the application and copy the **Application ID** and the **Secret**.

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `GitLab`.
1. Enter the Application ID as the **Client ID** and the Secret as the **Client secret**.
1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [GitLab integration](/docs/integration/ruby/gitlab): Sign users in to GitLab with Casdoor.
