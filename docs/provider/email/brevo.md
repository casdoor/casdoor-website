---
title: Brevo email
description: Use Brevo (Sendinblue) as the SMTP provider for Casdoor.
keywords: [email, Brevo, SMTP]
authors: [UsherFall]
---

## 1. Enable Brevo SMTP

Activate SMTP for your Brevo account. See [Send transactional emails using Brevo SMTP](https://help.brevo.com/hc/en-us/articles/7924908994450). You may need to request activation via support.

![brevo_smtp](/img/providers/brevo_smtp.png)

## 2. Get SMTP settings

In the Brevo dashboard, open **SMTP & API** and note:

- **SMTP Server**
- **Port**
- **Login**
- **SMTP key** (password)

![brevo_conf](/img/providers/brevo_conf.png)

## 3. Configure the provider in Casdoor

Create an **Email** provider, set **Type** to the appropriate SMTP option, and enter **Host**, **Port**, **Username**, and **Password** (SMTP key). Set **From** to your verified sender.

![brevo_provider](/img/providers/brevo_provider.png)

- Use **Test SMTP Connection**; you should see “SMTP connected successfully”.
- Use **Send Testing Email**; you should see “Email sent successfully” and receive the test at the **Test Email** address.
