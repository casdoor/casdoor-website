---
title: Facebook
description: Add the Facebook OAuth provider to your application.
keywords: [Facebook, OAuth]
authors: [ErikQQY]
---

To set up the Facebook OAuth provider, please go to the [Facebook Developer](https://developers.facebook.com/apps/) website and create a new app.

Select the type of app you are going to create.

![Facebook select](/img/providers/OAuth/facebookselect.png)

After entering your name and contact email, you will be taken to the Facebook Developer dashboard.

![Dashboard](/img/providers/OAuth/dashboard.png)

Next, set up Facebook login:

![Facebook login](/img/providers/OAuth/facebooklogin.png)

Choose the Web platform for this app:

![Facebook web](/img/providers/OAuth/facebookweb.png)

After filling in the website URL, go to **Facebook Login > Settings** and enter valid OAuth Redirect URIs.

![Redirect URIs](/img/providers/OAuth/facebookredirecturl.png)

:::info Set authorized redirect URLs correctly

In the Facebook OAuth configuration, the `Valid OAuth Redirect URIs` must be **your Casdoor's callback URL**, and the `Redirect URL` in Casdoor should be **your application's callback URL**.

For more details, please read the [App Configuration](/docs/application/config#further-understanding) section.

:::

The basic app configuration is almost complete!

Switch the mode from **In development** to **Live** in the top bar of the dashboard.

![Top bar](/img/providers/OAuth/facebooktopbar.png)

Now you can use your `App ID` and `App Secret` in Casdoor.

![Facebook app](/img/providers/OAuth/facebookappclient.png)

Add the Facebook OAuth provider and fill in the `Client ID` and `Client Secret` with the `App ID` and `App Secret` from your Casdoor.

![Facebook Client](/img/providers/OAuth/facebookclient.png)

You can now use Facebook as a third-party service for authentication!
