---
title: Google OAuth
description: Add Google as an OAuth provider.
keywords: [Google, OAuth]
authors: [ErikQQY]
---

Configure Google OAuth in the [Google API Console](https://console.developers.google.com).

## Configure in Google Cloud

1. Create or select a project. Open **APIs & Services** → **OAuth consent screen** and configure the consent screen.
2. Go to **Credentials** → **Create credentials** → **OAuth client ID**. Choose application type (e.g. Web application) and set **Authorized redirect URIs**.

![Setting up the project](/img/providers/OAuth/googlenewproject.png)
![Configure consent](/img/providers/OAuth/oauthconsentscreen.png)
![Registering the app](/img/providers/OAuth/appregistration.png)
![Credentials](/img/providers/OAuth/credential.png)
![Creating a credential](/img/providers/OAuth/createcredential.png)

:::info
**Authorized redirect URIs** in Google must be **Casdoor’s callback URL**. In Casdoor, the application **Redirect URL** is your application’s callback URL. See [Application config](/docs/application/config#further-understanding).
:::

3. After creating the client, copy the **Client ID** and **Client Secret**.

![Client](/img/providers/OAuth/googleclient.png)

## Add the provider in Casdoor

Create an **OAuth** provider, set **Type** to **Google**, and enter the **Client ID** and **Client Secret**.

![Google Provider](/img/providers/OAuth/googleprovider.png)

### Optional: phone number scope

If you enable **Get password** (or need the user’s phone number), enable the [Google People API](https://console.cloud.google.com/apis/library/people.googleapis.com) and add the scope `https://www.googleapis.com/auth/user.phonenumbers.read` to the provider.

![Google People Api](/img/providers/OAuth/googleproviderpeopleapi.png)
![Google Provider Scope](/img/providers/OAuth/googleproviderscope.png)
