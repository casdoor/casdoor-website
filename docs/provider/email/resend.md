---
title: Send email with Resend
sidebar_label: Resend
description: Use the Resend API as the email provider of Casdoor.
keywords: [email, Resend]
authors: [hsluoyz]
---

This guide explains how to send the emails of Casdoor through [Resend](https://resend.com/). Resend is an API-based service, so you need only an API key, not an SMTP host or credentials.

---

#### Learning outcomes

- Create a Resend API key and verify a domain.
- Add Resend as an email provider in Casdoor and test it.

#### What you need

- A Resend account
- Administrator access to the Casdoor admin console

---

## Prepare Resend

1. In the [Resend dashboard](https://resend.com/api-keys), click **Create API Key** and give it **Sending access**, or full access if you also use webhooks.
1. Go to **Domains**, add your sending domain, and complete the DNS verification. For tests, you can use the shared domain of Resend, `onboarding@resend.dev`. In production, use a verified domain of your own.

## Add the provider in Casdoor {#3-configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `Resend`.
1. Fill in the fields:

   | Field          | Description                                   |
   |----------------|-----------------------------------------------|
   | Secret Key     | Your Resend API key                           |
   | From Address   | Verified sender address (e.g. `no-reply@yourdomain.com`) |
   | From Name      | (Optional) Sender display name                |
   | Email Title    | Email subject template                        |
   | Email Content  | Email body (HTML supported)                   |

   Leave **Host**, **Port**, and **Username** empty. Resend doesn't use them.

1. Save the provider.

## Verify the result

Click **Send Testing Email** and check that the message arrives, before you add the provider to an application.

## See also

- [Email providers](/docs/provider/email/overview)
