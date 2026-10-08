---
title: Add Google as an OAuth provider
sidebar_label: Google
description: Let users sign in to Casdoor with their Google account.
keywords: [Google, OAuth]
authors: [ErikQQY]
---

This guide explains how to let users sign in to Casdoor with their Google account.

---

#### Learning outcomes

- Create an OAuth client in Google Cloud.
- Add Google as an OAuth provider in Casdoor.
- Read the phone number of users from Google.

#### What you need

- A Google Cloud project. See the [Google API Console](https://console.developers.google.com).
- Administrator access to the Casdoor admin console

---

## Create an OAuth client in Google Cloud {#configure-in-google-cloud}

1. Create or select a project.

   ![New project in Google Cloud](/img/providers/OAuth/googlenewproject.png)

1. Go to **APIs & Services** > **OAuth consent screen** and configure the consent screen.

   ![OAuth consent screen](/img/providers/OAuth/oauthconsentscreen.png)

   ![App registration](/img/providers/OAuth/appregistration.png)

1. Go to **Credentials**, click **Create credentials**, and select **OAuth client ID**.

   ![Credentials page](/img/providers/OAuth/credential.png)

1. Select the application type, for example **Web application**, and add the callback URL of Casdoor, `https://<your-casdoor-host>/callback`, to **Authorized redirect URIs**. This is the URL of Casdoor, not of your own application. See [Redirect URL and callback URL](/docs/application/config#how-the-flow-works).

   ![OAuth client creation form](/img/providers/OAuth/createcredential.png)

1. Create the client and copy the **Client ID** and the **Client secret**.

   ![Client ID and client secret](/img/providers/OAuth/googleclient.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Google`.
1. Enter the **Client ID** and the **Client secret**.

   ![Google provider in Casdoor](/img/providers/OAuth/googleprovider.png)

1. Save the provider.

## Read the phone number of users {#optional-phone-number-scope}

Google returns the phone number only with an additional scope. You need it, for example, when you turn on **Get password**.

1. In Google Cloud, turn on the [Google People API](https://console.cloud.google.com/apis/library/people.googleapis.com).

   ![Google People API](/img/providers/OAuth/googleproviderpeopleapi.png)

1. In Casdoor, add the scope `https://www.googleapis.com/auth/user.phonenumbers.read` to the provider.

   ![Scope field of the Google provider](/img/providers/OAuth/googleproviderscope.png)

## Next steps

- Add the provider to an application. See [Add providers to an application](/docs/application/providers).
- Offer Google One Tap on the sign-in page. See [Google One Tap](/docs/provider/oauth/googleonetap).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
