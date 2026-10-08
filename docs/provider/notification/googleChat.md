---
title: Send notifications to Google Chat
sidebar_label: Google Chat
description: Send the notifications of Casdoor to Google Chat with the credentials of a service account.
keywords: [Google Chat, notification, provider]
authors: [UsherFall]
---

This guide explains how to send the notifications of Casdoor to Google Chat. Casdoor authenticates with the JSON credentials of a service account, as [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials) use them.

---

#### Learning outcomes

- Add Google Chat as a notification provider with service account credentials.

#### What you need

- A Google Cloud service account with access to Google Chat, and its JSON key
- Administrator access to the Casdoor admin console

---

## Add the provider in Casdoor {#configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Notification` and **Type** to `Google Chat`.
1. Paste the complete JSON key of the service account into **Metadata**. The key has this form:

   ```json
   {
     "type": "service_account",
     "project_id": "",
     "private_key_id": "",
     "private_key": "",
     "client_email": "",
     "client_id": "",
     "auth_uri": "",
     "token_uri": "",
     "auth_provider_x509_cert_url": "",
     "client_x509_cert_url": ""
   }
   ```

   ![Google Chat notification provider in Casdoor](/img/providers/notification/google_chat_provider.png)

1. Click **Send Testing Notification**, and save the provider.

## See also

- [Notification providers](/docs/provider/notification/overview)
