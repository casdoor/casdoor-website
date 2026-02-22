---
title: Twilio SMS
description: Use Twilio as an SMS provider for verification codes.
keywords: [Twilio, SMS, provider]
authors: [UsherFall]
---

Configure a **SMS** provider in Casdoor with **Type** set to **Twilio**. Map Twilio values to Casdoor fields:

| Casdoor field   | Twilio              | Required |
|-----------------|---------------------|----------|
| Client ID       | Account SID         | Yes      |
| Client secret   | Auth Token         | Yes      |
| Sender number   | Twilio phone number | Yes      |
| Template code   | Your SMS template   | Yes      |

Get **Account SID**, **Auth Token**, and the **Twilio phone number** from the [Twilio Console](https://console.twilio.com/).

![twilioInfo.png](/img/providers/sms/twilioInfo.png)

Set the **Template code** to match your Twilio template, then use **SMS Test** with a phone number to verify.

![twilioProvider.png](/img/providers/sms/twilioProvider.png)
