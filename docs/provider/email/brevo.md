---
title: Send email with Brevo
sidebar_label: Brevo
description: Use the SMTP relay of Brevo (formerly Sendinblue) as the email provider of Casdoor.
keywords: [email, Brevo, SMTP]
authors: [UsherFall]
---

This guide explains how to send the emails of Casdoor through the SMTP relay of Brevo, formerly Sendinblue.

---

#### Learning outcomes

- Turn on SMTP for a Brevo account and get the SMTP settings.
- Add Brevo as an email provider in Casdoor and test it.

#### What you need

- A Brevo account
- Administrator access to the Casdoor admin console

---

## Prepare Brevo

1. Activate SMTP for your Brevo account. See [Send transactional emails using Brevo SMTP](https://help.brevo.com/hc/en-us/articles/7924908994450). You may have to ask the Brevo support to activate it.

   ![SMTP activation in Brevo](/img/providers/brevo_smtp.png)

1. In the Brevo dashboard, open **SMTP & API** and note the SMTP server, the port, the login, and the SMTP key.

   ![SMTP settings in Brevo](/img/providers/brevo_conf.png)

## Add the provider in Casdoor {#3-configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `Default`.
1. Enter the SMTP server as the **Host**, the **Port**, the login as the **Username**, and the SMTP key as the **Password**. Set **From address** to your verified sender.

   ![Brevo SMTP settings in Casdoor](/img/providers/brevo_provider.png)

1. Save the provider.

## Verify the result

1. Click **Test SMTP Connection**. Casdoor reports `SMTP connected successfully`.
1. Click **Send Testing Email**. Casdoor reports `Email sent successfully`, and the message arrives at the **Test Email** address.

## See also

- [Email providers](/docs/provider/email/overview)
