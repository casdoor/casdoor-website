---
title: Test email with Mailpit
sidebar_label: Mailpit
description: Catch the emails of Casdoor in Mailpit, a local SMTP server for testing.
keywords: [email, mailpit]
authors: [Attack825]
---

This guide explains how to send the emails of Casdoor to [Mailpit](https://github.com/axllent/mailpit), an SMTP server for testing that catches all messages and shows them in a web UI.

---

#### Learning outcomes

- Point an email provider at Mailpit.
- Send a test email and read it in Mailpit.

#### What you need

- Mailpit running where Casdoor can reach it. By default, Mailpit listens on `127.0.0.1:1025` without TLS or authentication.
- Administrator access to the Casdoor admin console

---

## Run Mailpit

Start Mailpit, so that its SMTP server is reachable at `127.0.0.1:1025`, or at the host and port that you configured.

![Mailpit configuration](/img/providers/mailpit_conf.png)

## Add the provider in Casdoor {#2-create-the-email-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `Default`.
1. Set **Host** and **Port** to the address of Mailpit, for example `127.0.0.1` and `1025`. Leave **Username** and **Password** empty if Mailpit has no authentication.

   ![Mailpit settings in Casdoor](/img/providers/mailpit_email_provider_conf.png)

1. Save the provider.

## Verify the result {#3-test}

1. Click **Test SMTP Connection**. Casdoor reports `SMTP connected successfully`.
1. Click **Send Testing Email**. Casdoor reports `Email sent successfully`.

   ![Test email sent from Casdoor](/img/providers/mailpit_send_test_email.png)

1. Open the web UI of Mailpit. The message is there.

   ![Test email in Mailpit](/img/providers/mailpit_recv_test_email.png)

## See also

- [Test email with MailHog](/docs/provider/email/mailhog)
- [Email providers](/docs/provider/email/overview)
