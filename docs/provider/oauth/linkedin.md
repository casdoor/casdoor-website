---
title: Add LinkedIn as an OAuth provider
sidebar_label: LinkedIn
description: Let users sign in to Casdoor with their LinkedIn account.
keywords: [LinkedIn, OAuth]
authors: [ErikQQY]
---

This guide explains how to let users sign in to Casdoor with their LinkedIn account.

---

#### Learning outcomes

- Create and verify a LinkedIn app.
- Add LinkedIn as an OAuth provider in Casdoor.

#### What you need

- A LinkedIn company page and an administrator of that page, who verifies the app
- Administrator access to the Casdoor admin console

---

## Create a LinkedIn app

1. Create an app on [LinkedIn Developers](https://www.linkedin.com/developers/apps/new).

   ![LinkedIn app creation form](/img/providers/OAuth/linkedin.png)

1. Verify the company page that is linked to the app. Only an administrator of the company page can verify it and grant permissions.

   ![Verification of the LinkedIn page](/img/providers/OAuth/linkedin-verify.png)

1. In the app, turn on **Sign In with LinkedIn**.

   ![Sign In with LinkedIn product](/img/providers/OAuth/linkedinsignin.png)

1. Add the callback URL of Casdoor, `https://<your-casdoor-host>/callback`, to **Authorized redirect URLs**. See [Redirect URL and callback URL](/docs/application/config#how-the-flow-works).

   ![Authorized redirect URLs of the app](/img/providers/OAuth/linkedinredirecturl.png)

1. Copy the **Client ID** and the **Client Secret**.

   ![Client ID and client secret of the app](/img/providers/OAuth/linkedinclient.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `LinkedIn`.
1. Enter the **Client ID** and the **Client secret**.

   ![LinkedIn provider in Casdoor](/img/providers/OAuth/linkedinprovider.png)

1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
