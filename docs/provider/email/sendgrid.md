---
title: SendGrid email
description: Use SendGrid as an email provider for verification and notifications.
keywords: [email, SendGrid]
authors: [UsherFall]
---

## 1. Create an API key

In the [SendGrid](https://sendgrid.com/) dashboard, go to **Settings** → **API Keys**. Click **Create API Key** and set the permissions you need.

![sendgrid_apikey](/img/providers/sendgrid_apikey.png)

## 2. Verify sender

Verify your sender via **Single Sender Verification** or **Domain Authentication**. See [Sender Identity](https://docs.sendgrid.com/for-developers/sending-email/sender-identity).

## 3. Configure the provider in Casdoor

Create an **Email** provider, set **Type** to **SendGrid**, and fill in:

**Required**

| Field         | Description                    |
|---------------|--------------------------------|
| Secret Key    | Your SendGrid API key          |
| From Address  | Verified sender email or domain |

**Defaults** (can override)

| Field    | Default                     |
|----------|-----------------------------|
| Endpoint | `/v3/mail/send`             |
| Host     | `https://api.sendgrid.com`  |

**Optional**

| Field          | Description                    |
|----------------|--------------------------------|
| From Name      | Sender display name            |
| Email Title    | Subject                        |
| Email Content  | Body (HTML supported)          |
| Test Email     | Recipient for **Send Testing Email** |

![sendgrid_email_provider_fields](/img/providers/sendgrid_email_provider_fields.png)

Use **Send Testing Email** and check the **Test Email** inbox to confirm delivery.
