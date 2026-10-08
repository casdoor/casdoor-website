---
title: Send email with SendGrid
sidebar_label: SendGrid
description: Use the SendGrid API as the email provider of Casdoor.
keywords: [email, SendGrid]
authors: [UsherFall]
---

This guide explains how to send the emails of Casdoor through the API of [SendGrid](https://sendgrid.com/).

---

#### Learning outcomes

- Create a SendGrid API key and verify a sender.
- Add SendGrid as an email provider in Casdoor and test it.

#### What you need

- A SendGrid account
- Administrator access to the Casdoor admin console

---

## Prepare SendGrid

1. In the SendGrid dashboard, go to **Settings** > **API Keys**, click **Create API Key**, and select the permissions that you need. Copy the key.

   ![API key creation in SendGrid](/img/providers/sendgrid_apikey.png)

1. Verify your sender with **Single Sender Verification** or **Domain Authentication**. See [Sender Identity](https://docs.sendgrid.com/for-developers/sending-email/sender-identity).

## Add the provider in Casdoor {#3-configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `SendGrid`.
1. Fill in the required fields:

   | Field         | Description                    |
   |---------------|--------------------------------|
   | Secret Key    | Your SendGrid API key          |
   | From Address  | Verified sender email or domain |

1. Optionally, change the defaults:

   | Field    | Default                     |
   |----------|-----------------------------|
   | Endpoint | `/v3/mail/send`             |
   | Host     | `https://api.sendgrid.com`  |

1. Optionally, fill in the remaining fields:

   | Field          | Description                    |
   |----------------|--------------------------------|
   | From Name      | Sender display name            |
   | Email Title    | Subject                        |
   | Email Content  | Body (HTML supported)          |
   | Test Email     | Recipient for **Send Testing Email** |

   ![SendGrid provider in Casdoor](/img/providers/sendgrid_email_provider_fields.png)

1. Save the provider.

## Verify the result

Click **Send Testing Email** and check that the message arrives at the **Test Email** address.

## See also

- [Email providers](/docs/provider/email/overview)
