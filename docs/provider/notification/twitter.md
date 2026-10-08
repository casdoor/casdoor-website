---
title: Send notifications to Twitter
sidebar_label: Twitter
description: Send the notifications of Casdoor to a Twitter (X) user.
keywords: [Twitter, notification, provider, X]
authors: [UsherFall]
---

This guide explains how to send the notifications of Casdoor to a Twitter (X) user.

---

#### Learning outcomes

- Get the credentials of a Twitter app and the ID of the recipient.
- Add Twitter as a notification provider in Casdoor.

#### What you need

- A [Twitter developer account](https://developer.twitter.com/)
- Administrator access to the Casdoor admin console

---

## Get the credentials {#1-get-twitter-app-credentials}

1. Create a Twitter app and copy the API key, the API secret, the access token, and the access token secret. See [API key and secret](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/api-key-and-secret).

   ![Credentials of the Twitter app](/img/providers/notification/twitter_items.png)

1. Find the numeric user ID of the recipient. Twitter doesn't show it in its UI. Use a lookup service such as [TweeterID](https://tweeterid.com/).

## Add the provider in Casdoor {#3-configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Notification` and **Type** to `Twitter`.
1. Fill in the fields:

   | Casdoor       | Twitter           |
   |---------------|-------------------|
   | Client ID     | API Key           |
   | Client secret | API Secret        |
   | Client ID 2   | Access Token      |
   | Client secret 2 | Access Token Secret |
   | Chat ID       | Twitter ID        |

   ![Twitter notification provider in Casdoor](/img/providers/notification/twitter_provider.png)

1. Click **Send Testing Notification**, and save the provider.

## See also

- [Notification providers](/docs/provider/notification/overview)
