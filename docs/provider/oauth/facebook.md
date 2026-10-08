---
title: Add Facebook as an OAuth provider
sidebar_label: Facebook
description: Let users sign in to Casdoor with their Facebook account.
keywords: [Facebook, OAuth]
authors: [ErikQQY]
---

This guide explains how to let users sign in to Casdoor with their Facebook account.

---

#### Learning outcomes

- Create a Facebook app with Facebook Login.
- Add Facebook as an OAuth provider in Casdoor.

#### What you need

- A [Meta for Developers](https://developers.facebook.com/apps/) account
- Administrator access to the Casdoor admin console

---

## Create a Facebook app {#create-a-facebook-app}

1. On [Meta for Developers](https://developers.facebook.com/apps/), create an app and select its type, for example **Consumer**.

   ![App type selection](/img/providers/OAuth/facebookselect.png)

1. Enter the name and the contact email. The dashboard of the app opens.

   ![Dashboard of the app](/img/providers/OAuth/dashboard.png)

1. Set up **Facebook Login** and select the **Web** platform.

   ![Facebook Login product](/img/providers/OAuth/facebooklogin.png)

   ![Web platform](/img/providers/OAuth/facebookweb.png)

1. Go to **Facebook Login** > **Settings** and add the callback URL of Casdoor, `https://<your-casdoor-host>/callback`, to **Valid OAuth Redirect URIs**. See [Redirect URL and callback URL](/docs/application/config#how-the-flow-works).

   ![Valid OAuth Redirect URIs](/img/providers/OAuth/facebookredirecturl.png)

1. In the top bar of the dashboard, switch the app from **In development** to **Live**.

   ![Mode switch in the top bar](/img/providers/OAuth/facebooktopbar.png)

1. Go to **Settings** > **Basic** and copy the **App ID** and the **App Secret**.

   ![App ID and App Secret](/img/providers/OAuth/facebookappclient.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Facebook`.
1. Enter the App ID as the **Client ID** and the App Secret as the **Client secret**.

   ![Facebook provider in Casdoor](/img/providers/OAuth/facebookclient.png)

1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
