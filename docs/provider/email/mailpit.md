---
title: Mailpit
description: Using Mailpit as the SMTP server
keywords: [email, mailpit]
authors: [Attack825]
---

### Mailpit

In this guide, we will be using Mailpit as the SMTP server. [Mailpit](https://github.com/axllent/mailpit) is an email-testing tool that operates with a fake SMTP server.

### Step 1: Deploy the Mailpit service

The IP address for the Mailpit service is `127.0.0.1`. By default, the Mailpit SMTP server listens on port 1025 and does not use encryption or authentication.

![Mailpit configuration](/img/providers/mailpit_conf.png)

### Step 2: Create an email provider

Provide the necessary information and save the settings.

![Mailpit email provider](/img/providers/mailpit_email_provider_conf.png)

### Step 3: Send a test email

First, click on the `Test SMTP Connection` button. If you see `provider: SMTP connected successfully`, it means that your Casdoor service can access the Mailpit service.

Next, click on the `Send Testing Email` button. If you see `Email sent successfully`, it means that the test email has been sent successfully from the `From` address to the `Test Email`.

![Sending a test email using Mailpit](/img/providers/mailpit_send_test_email.png)

![Receiving a test email using Mailpit](/img/providers/mailpit_recv_test_email.png)
