---
title: Email
description: Using email to complete authentication
keywords: [email]
authors: [kininaru]
---

## Add an Email provider

1. Click `Add` to add a new provider.
2. Select `Email` in `Category`

    ![Email provider](/img/providers/emailprovider.png)

3. Fill `Username`, `Password`, `Host`, `Port` of your smtp service.

    ![Email Config](/img/providers/emailconfig.png)

4. Fill customized `Email Title` and `Email Content` and save.

## Example

Here we use MailHog as the SMTP server. [MailHog](https://github.com/mailhog/MailHog) is an email-testing tool with a fake SMTP server underneath.

### Step1. Deploy the MailHog service

Here the IP address for the MailHog service is `192.168.24.128`, and the SMTP service port is `1025`.

![mailhog config](/img/providers/mailhog_conf.png)

### Step2. Create a Email provider

Fill the necessary information and save.

![mailhog email provider](/img/providers/mailhog_email_provider_conf.png)

### Step3. Sending Test Email

First, click on the `Test SMTP Connection` button, if you see `provider: SMTP connected successfully`, it means that your Casdoor service can access the MailHog service.

Second, click on the `Send Testing Email` button, if you see `Email sent successfully`, it means that the test email has been successfully sent from the `From address` to the `Test Email`.

![mailhog send test email](/img/providers/mailhog_send_test_email.png)

![mailhog recv test email](/img/providers/mailhog_recv_test_email.png)
