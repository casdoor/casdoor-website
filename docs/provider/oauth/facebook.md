---
title: Facebook OAuth
description: Add Facebook as an OAuth provider.
keywords: [Facebook, OAuth]
authors: [ErikQQY]
---

## Create a Facebook app

Go to [Facebook Developers](https://developers.facebook.com/apps/) and create a new app. Choose the app type (e.g. Consumer).

![Facebook select](/img/providers/OAuth/facebookselect.png)

After entering your name and contact email, you will be taken to the Facebook Developer dashboard.

![Dashboard](/img/providers/OAuth/dashboard.png)

Next, set up Facebook login:

![Facebook login](/img/providers/OAuth/facebooklogin.png)

Choose the Web platform for this app:

![Facebook web](/img/providers/OAuth/facebookweb.png)

Under **Facebook Login** → **Settings**, set **Valid OAuth Redirect URIs** to **Casdoor’s callback URL**. In Casdoor, the application **Redirect URL** is your application’s callback URL. See [Application config](/docs/application/config#how-the-flow-works).

![Redirect URIs](/img/providers/OAuth/facebookredirecturl.png)

Switch the app from **In development** to **Live** in the dashboard top bar.

![Top bar](/img/providers/OAuth/facebooktopbar.png)

Copy **App ID** and **App Secret** from **Settings** → **Basic**.

![Facebook app](/img/providers/OAuth/facebookappclient.png)

## Add the provider in Casdoor

Create an **OAuth** provider, set **Type** to **Facebook**, and enter **App ID** as **Client ID** and **App Secret** as **Client Secret**.

![Facebook Client](/img/providers/OAuth/facebookclient.png)
