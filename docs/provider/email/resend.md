---
title: Resend email
description: Use Resend as an email provider for verification and notifications.
keywords: [email, Resend]
authors: [hsluoyz]
---

[Resend](https://resend.com/) is an API-based email service. Unlike SMTP providers, it requires only an API key — no host, port, or credentials.

## 1. Create an API key

In the [Resend dashboard](https://resend.com/api-keys), click **Create API Key**. Grant it **Sending access** (or full access if you also need webhooks).

## 2. Verify your domain

Go to **Domains** in the Resend dashboard and add your sending domain. Follow the DNS verification steps. You can also use Resend's shared domain (`onboarding@resend.dev`) for testing, but a verified custom domain is required for production.

## 3. Configure the provider in Casdoor

Create an **Email** provider, set **Type** to **Resend**, and fill in:

| Field          | Description                                   |
|----------------|-----------------------------------------------|
| Secret Key     | Your Resend API key                           |
| From Address   | Verified sender address (e.g. `no-reply@yourdomain.com`) |
| From Name      | (Optional) Sender display name                |
| Email Title    | Email subject template                        |
| Email Content  | Email body (HTML supported)                   |

Host, Port, and Username fields are not used for Resend and can be left empty.

Use **Send Testing Email** to verify delivery before enabling the provider for your application.
