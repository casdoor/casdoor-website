---
title: Google
description: Add the Google OAuth provider to your application
keywords: [Google, OAuth]
authors: [ErikQQY]
---

To set up the Google OAuth provider, please go to the [Google API console](https://console.developers.google.com) and log in using your Google account.

![Setting up the project](/img/providers/OAuth/googlenewproject.png)

Next, navigate to the **OAuth consent screen** tab to configure the OAuth consent screen.

![Configure consent](/img/providers/OAuth/oauthconsentscreen.png)

Register your Google app by following these steps:

![Registering the app](/img/providers/OAuth/appregistration.png)

Afterward, go to the **Credential** tab.

![Credentials](/img/providers/OAuth/credential.png)

Create a credential for your app:

![Creating a credential](/img/providers/OAuth/createcredential.png)

:::info Ensure that you set the Authorized redirect URIs correctly

In the Google OAuth configuration, the `Authorized redirect URIs` must be set to **your Casdoor's callback URL**, while the `Redirect URL` in Casdoor should be set to **your application's callback URL**.

For more details, please refer to the [App configuration](/docs/application/config#further-understanding).

:::

After creating the Client ID, you will obtain the `Client ID` and `Client Secret`.

![Client](/img/providers/OAuth/googleclient.png)

Add the Google OAuth provider and enter the `Client ID` and `Client Secret` in your Casdoor.

![Google Provider](/img/providers/OAuth/googleprovider.png)

You can now use Google as a third-party service to complete authentication.
