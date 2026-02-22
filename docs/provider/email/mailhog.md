---
title: MailHog email
description: Use MailHog as a local SMTP server for testing.
keywords: [email, mailhog]
authors: [Chinoholo0807]
---

[MailHog](https://github.com/mailhog/MailHog) is a test SMTP server that captures outgoing mail. Use your MailHog host and port (e.g. `192.168.24.128:1025`).

### 1. Run MailHog

Start the MailHog service so the SMTP server is reachable from Casdoor (e.g. `192.168.24.128`, port `1025`).

![MailHog configuration](/img/providers/mailhog_conf.png)

### 2. Create the email provider in Casdoor

**Providers** → **Add**. Set **Category** to **Email** and the type to the appropriate SMTP option. Set **Host** and **Port** to your MailHog address. No auth by default. Save.

![MailHog email provider](/img/providers/mailhog_email_provider_conf.png)

### 3. Test

Use **Test SMTP Connection**; you should see “SMTP connected successfully”. Use **Send Testing Email**; you should see “Email sent successfully” and the message in MailHog’s UI.

![Sending a test email using MailHog](/img/providers/mailhog_send_test_email.png)

![Receiving a test email using MailHog](/img/providers/mailhog_recv_test_email.png)
