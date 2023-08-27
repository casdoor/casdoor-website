---
title: MailHog
description: Using MailHog as the SMTP server
keywords: [email, mailhog]
authors: [Chinoholo0807]
---

In this guide, we will be using MailHog as the SMTP server. [MailHog](https://github.com/mailhog/MailHog) is an email-testing tool that operates with a fake SMTP server.

### Step 1: Deploy the MailHog service

The IP address for the MailHog service is `192.168.24.128`, and the SMTP service port is `1025`.

![MailHog configuration](/img/providers/mailhog_conf.png)

### Step 2: Create an email provider

Provide the necessary information and save the settings.

![MailHog email provider](/img/providers/mailhog_email_provider_conf.png)

### Step 3: Send a test email

First, click on the `Test SMTP Connection` button. If you see `provider: SMTP connected successfully`, it means that your Casdoor service can access the MailHog service.

Next, click on the `Send Testing Email` button. If you see `Email sent successfully`, it means that the test email has been sent successfully from the `From` address to the `Test Email`.

![Sending a test email using MailHog](/img/providers/mailhog_send_test_email.png)

![Receiving a test email using MailHog](/img/providers/mailhog_recv_test_email.png)
