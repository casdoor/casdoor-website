---
title: Brevo
description: Using Brevo as the SMTP server
keywords: [email, Brevo]
authors: [UsherFall]
---

In this guide, we will be using Brevo as the SMTP server.

### Step 1: Request the activation of your Brevo SMTP account

Refer to the documentation to activate Brevo SMTP: [Send transactional emails using Brevo SMTP](https://help.brevo.com/hc/en-us/articles/7924908994450)

In my case, when I created a ticket to activate my smtp account, I got this reply:

![brevo_smtp](/img/providers/brevo_smtp.png)

### Step 2: Get Brevo SMTP configuration

In your Brevo dashboard, find **SMTP&API**, get `SMTP Server`, `Port`, `Login`, `SMTP key value`

![brevo_conf](/img/providers/brevo_conf.png)

### Step 3: Configure Casdoor email Provider

Now create an email provider in Casdoor. Fill in the necessary information.

![brevo_provider](/img/providers/brevo_provider.png)

Click on the `Test SMTP Connection` button. If you see `provider: SMTP connected successfully`, it means that your Casdoor service can access the Brevo service.

Next, click on the `Send Testing Email` button. If you see `Email sent successfully`, it means that the test email has been sent successfully from the `From` address to the `Test Email`.
