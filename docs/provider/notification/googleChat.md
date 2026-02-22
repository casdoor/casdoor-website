---
title: Google Chat notification
description: Use Google Chat as a notification provider via a service account.
keywords: [Google Chat, notification, provider]
authors: [UsherFall]
---

Google Chat notifications use **Application Default Credentials** (service account JSON). See [How Application Default Credentials work](https://cloud.google.com/docs/authentication/application-default-credentials).

The credential JSON has this shape:

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

## Configure the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Notification**, **Type** to **Google Chat**. Paste the full service account JSON into the **Application credential** / metadata field (as required by the provider form).

![google_chat_provider](/img/providers/notification/google_chat_provider.png)
