---
title: SendGrid
description: Using SendGrid as Email Provider
keywords: [email, SendGrid]
authors: [UsherFall]
---

In this guide, we will be using SendGrid as Email Provider.

### Step 1: Create API key for your SendGrid account

Expand the **Settings** from the left navigation bar, click on the **API Keys** option from this list. Here, you will see all of your API keys if you have generated any in the past. To generate a new one, you need to click on **Create API Key** and pay attention to the permissions.

![sendgrid_apikey](/img/providers/sendgrid_apikey.png)

### Step 2: Sender Verification

Refer to the document to verify your email sender, you can choose **Single Sender Verification** or **Domain Authentication**: [Sender Identity](https://docs.sendgrid.com/for-developers/sending-email/sender-identity)

### Step 3: Configure Casdoor email Provider

Now create an SendGrid email provider in Casdoor. Fill in the fields below:

| Required fields | Description                          |
|-----------------|--------------------------------------|
| Secret key      | Your SendGrid's API Key              |
| From address    | Your verified Email address (domain) |


| Default fields | Description                            |
|-----------------|-----------------------------------|
| Endpoint        | Default: /v3/mail/send            |
| Host            | Default: https://api.sendgrid.com |

| Email fields  | Description                                |
|---------------|--------------------------------------------|
| From name     | Your Email Sender's display name           |
| Email title   | Your Email's title                         |
| Email content | Support HTML template                      |
| Test Email    | Your recipient's email address for testing |



![sendgrid_email_provider_fields](/img/providers/sendgrid_email_provider_fields.png)

Click on the `Send Testing Email` button. Check your `Test Email` address for Testing Email.
