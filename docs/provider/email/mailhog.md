---
title: Test email with MailHog
sidebar_label: MailHog
description: Catch the emails of Casdoor in MailHog, a local SMTP server for testing.
keywords: [email, mailhog]
authors: [Chinoholo0807]
---

This guide explains how to send the emails of Casdoor to [MailHog](https://github.com/mailhog/MailHog), an SMTP server for testing that catches all messages and shows them in a web UI.

---

#### Learning outcomes

- Point an email provider at MailHog.
- Send a test email and read it in MailHog.

#### What you need

- MailHog running where Casdoor can reach it
- Administrator access to the Casdoor admin console

---

## Run MailHog

Start MailHog, so that its SMTP server is reachable from Casdoor. This guide uses the host `192.168.24.128` and the port `1025`.

![MailHog configuration](/img/providers/mailhog_conf.png)

## Add the provider in Casdoor {#2-create-the-email-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `Default`.
1. Set **Host** and **Port** to the address of MailHog. MailHog needs no authentication by default.

   ![MailHog settings in Casdoor](/img/providers/mailhog_email_provider_conf.png)

1. Save the provider.

## Verify the result {#3-test}

1. Click **Test SMTP Connection**. Casdoor reports `SMTP connected successfully`.
1. Click **Send Testing Email**. Casdoor reports `Email sent successfully`.

   ![Test email sent from Casdoor](/img/providers/mailhog_send_test_email.png)

1. Open the web UI of MailHog. The message is there.

   ![Test email in MailHog](/img/providers/mailhog_recv_test_email.png)

## See also

- [Test email with Mailpit](/docs/provider/email/mailpit)
- [Email providers](/docs/provider/email/overview)
