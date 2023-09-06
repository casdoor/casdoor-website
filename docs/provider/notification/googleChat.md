---
title: Google Chat
description: Using Google Chat as a notification provider for Casdoor
keywords: [Google Chat, notification, provider]
authors: [UsherFall]
---

## Step 1: Get Application Default Credentials

In order to integrate notify with a Google Chat Application, `Application Credentials` must be supplied. For more information on Google Application credential JSON see: [How Application Default Credentials works](https://cloud.google.com/docs/authentication/application-default-credentials)

The json will look like this:

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


## Step 3: Configure Casdoor Google Chat Provider

Fill in the `Application credential` in the metadata.

![google_chat_provider](/img/providers/notification/google_chat_provider.png)
