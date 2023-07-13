---
title: MailHog
description: Using MailHog as the SMTP server
keywords: [email,mailhog]
authors: [Chinoholo0807]
---

Here we use MailHog as the SMTP server. [MailHog](https://github.com/mailhog/MailHog) is an email-testing tool with a fake SMTP server underneath.

### Step1. Deploy the MailHog service

Here the IP address for the MailHog service is `192.168.24.128`, and the SMTP service port is `1025`.

![mailhog config](/img/providers/mailhog_conf.png)

### Step2. Create an email provider

Fill the necessary information and save.

![mailhog email provider](/img/providers/mailhog_email_provider_conf.png)

### Step3. Send the test email

First, click on the `Test SMTP Connection` button, if you see `provider: SMTP connected successfully`, it means that your Casdoor service can access the MailHog service.

Second, click on the `Send Testing Email` button, if you see `Email sent successfully`, it means that the test email has been successfully sent from the `From address` to the `Test Email`.

![mailhog send test email](/img/providers/mailhog_send_test_email.png)

![mailhog recv test email](/img/providers/mailhog_recv_test_email.png)
