---
title: Send email with Gmail
sidebar_label: Gmail
description: Send the emails of Casdoor from Gmail or Google Workspace, signing in to SMTP with OAuth 2.0 instead of an app password.
keywords: [email, Gmail, Google Workspace, SMTP, OAuth, XOAUTH2, service account]
authors: [hsluoyz]
---

This guide explains how to send the emails of Casdoor from a Gmail or Google Workspace mailbox without an app password. The `Gmail` type signs in to `smtp.gmail.com` with XOAUTH2: Casdoor gets an OAuth 2.0 token for the `https://mail.google.com/` scope from a Google JSON key, and signs in as the sending mailbox.

---

#### Learning outcomes

- Create a Google JSON key that may send as a mailbox.
- Add Gmail as an email provider in Casdoor and test it.

#### What you need

- A Google Workspace domain and a super administrator, or a personal Gmail account
- A Google Cloud project
- Administrator access to the Casdoor admin console

---

## About the JSON key

Casdoor accepts two kinds of Google JSON keys:

| Key | `type` in the JSON | Sends as | Use it for |
|---|---|---|---|
| Service account key with domain-wide delegation | `service_account` | The **From address**, any user of the Workspace domain | Google Workspace |
| User credentials with a refresh token | `authorized_user` | The account that granted the refresh token | Personal Gmail, or Workspace without delegation |

## Create a service account key (Google Workspace) {#service-account}

1. In the [Google Cloud console](https://console.cloud.google.com/), open your project, go to **IAM & Admin** > **Service accounts**, and create a service account, such as `casdoor-mail`. It needs no roles.
1. Open the service account. On the **Details** tab, copy the **Unique ID**, which is its client ID. On the **Keys** tab, click **Add key** > **Create new key** > **JSON**, and keep the downloaded file.
1. In the [Google Admin console](https://admin.google.com/), go to **Security** > **Access and data control** > **API controls** > **Manage Domain Wide Delegation**, and click **Add new**. Enter the client ID and the scope `https://mail.google.com/`, and click **Authorize**.

The delegation can take some minutes to apply.

## Create user credentials (personal Gmail) {#authorized-user}

1. In the Google Cloud console, configure the OAuth consent screen of your project and create an OAuth client ID of type **Desktop app**. Download its JSON file.
1. Get a refresh token for the `https://mail.google.com/` scope by signing in with the account that sends the emails. With the [gcloud CLI](https://cloud.google.com/sdk/docs/install):

   ```bash
   gcloud auth application-default login \
     --client-id-file=client_secret.json \
     --scopes=https://mail.google.com/
   ```

1. gcloud writes the credentials to `application_default_credentials.json` in its configuration folder (`~/.config/gcloud/` on Linux and macOS, `%APPDATA%\gcloud\` on Windows). The file has `"type": "authorized_user"`, the client ID, the client secret, and the refresh token.

While the consent screen of the project is in the **Testing** status, Google expires refresh tokens after 7 days. Publish the app to keep the token.

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `Gmail`. Casdoor fills in the host and the port.
1. Fill in the fields:

   | Field | Value |
   |---|---|
   | Google JSON key | The content of the JSON file of the service account key or the user credentials |
   | From address | The mailbox that sends the emails. With a service account, Casdoor signs in as this user. With user credentials, use the address of the account that granted the token, or one of its aliases |
   | From name | (Optional) The sender display name |
   | Host | `smtp.gmail.com` |
   | Port | `587` |
   | SSL mode | `Auto`, which uses STARTTLS on port 587 |

1. Write the **Email title** and the **Email content**. See [Templates](/docs/provider/email/overview#email-content-and-placeholders).
1. Save the provider.

**Enable proxy** sends both the token request and the SMTP connection through the SOCKS5 proxy of Casdoor. See [Proxy](/docs/provider/email/overview#proxy).

## Verify the result

1. Click **Test SMTP Connection**. Casdoor gets a token and signs in to SMTP as the **From address**, without sending an email.
1. Click **Send Testing Email** and check that the message arrives in the **Test Email** mailbox.

Then add the provider to your application. See [Add providers to an application](/docs/application/providers).

## Troubleshooting

| Error | Cause |
|---|---|
| `the from address of the Gmail email provider must be the mailbox that sends the emails` | **From address** is empty or isn't an email address |
| `the credentials of the Gmail email provider must be a Google JSON key` | **Google JSON key** isn't valid JSON |
| `the credentials of the Gmail email provider must be a "service_account" or "authorized_user" JSON key` | The JSON is another kind of key, such as an OAuth client ID file. See [About the JSON key](#about-the-json-key) |
| `oauth2: cannot fetch token` with `unauthorized_client` | The domain-wide delegation of the service account is missing, has another client ID, or lacks the `https://mail.google.com/` scope |
| `oauth2: cannot fetch token` with `invalid_grant` | The refresh token was revoked or expired, or the **From address** isn't a user of the Workspace domain |
| `535 5.7.8 Username and Password not accepted` | Gmail refused the token. Check that the **From address** is the account that the token was issued for |

## See also

- [Email providers](/docs/provider/email/overview)
- [Add providers to an application](/docs/application/providers)
