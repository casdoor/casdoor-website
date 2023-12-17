---
title: SendGrid
description: Using SendGrid as the SMTP server
keywords: [email, SendGrid]
authors: [UsherFall]
---

In this guide, we will be using SendGrid as the SMTP server.

### Step 1: Create API key for your SendGrid account

Expand the **Settings** from the left navigation bar, click on the **API Keys** option from this list. Here, you will see all of your API keys if you have generated any in the past. To generate a new one, you need to click on **Create API Key** and pay attention to the permissions.

![sendgrid_apikey](/img/providers/sendgrid_apikey.png)

### Step 2: Sender Verification

Refer to the document to verify your email sender, you can choose **Single Sender Verification** or **Domain Authentication**: [Sender Identity](https://docs.sendgrid.com/for-developers/sending-email/sender-identity)

### Step 3: Configure Casdoor email Provider

Now create an email provider in Casdoor. Fill in the required fields below:

| Required fields | Remark                    |
|-----------------|---------------------------|
| Username        | Enter "apikey"            |
| Password        | Your SendGrid's API key   |
| From Address    | Your verified sender      |
| Host            | Enter "smtp.sendgrid.net" |
| Port            | Default is 465            |

![sendgrid_provider](/img/providers/sendgrid_provider.png)

Click on the `Test SMTP Connection` button. If you see `provider: SMTP connected successfully`, it means that your Casdoor service can access the SendGrid service.

Next, click on the `Send Testing Email` button. If you see `Email sent successfully`, it means that the test email has been sent successfully from the `From` address to the `Test Email`.
