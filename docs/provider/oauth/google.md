---
title: Google
description: Add Google OAuth provider to your application
keywords: [Google, OAuth]
---

To set up Google OAuth provider, please go to [Google API console](https://console.developers.google.com) and log in using your Google account.

![Setup Project](/img/providers/OAuth/googlenewproject.png)

Then navigate to **OAuth consent screen** tab to configure OAuth consent screen.

![Configure consent](/img/providers/OAuth/oauthconsentscreen.png)

And register your Google app.

![Register app](/img/providers/OAuth/appregistration.png)

Then navigate to **Credential** tab.

![Credential](/img/providers/OAuth/credential.png)

And create Credential for your app:

![Create Credentail](/img/providers/OAuth/createcredential.png)

:::info Set Authorized redirect URIs correctly

In Google OAuth config, the `Authorized redirect URIs` must be **your Casdoor's callback url**, and the `Redirect URL` in Casdoor should be **your application callback url**

For more details, please read [App config](/docs/application/config#further-understanding)

:::

After create Client ID and obtain `Client ID` and `Client Secrets`

![Client](/img/providers/OAuth/googleclient.png)

Add a Google OAuth provider and fill the `Client ID` and `Client Secret` in your Casdoor

![Google Provider](/img/providers/OAuth/googleprovider.png)

Now you can use Google as third party service to complete authentication.