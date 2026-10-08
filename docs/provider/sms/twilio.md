---
title: Send SMS with Twilio
sidebar_label: Twilio
description: Use Twilio as the SMS provider of Casdoor.
keywords: [Twilio, SMS, provider]
authors: [UsherFall]
---

This guide explains how to send the verification codes of Casdoor by SMS through Twilio.

---

#### Learning outcomes

- Get the credentials and the phone number from Twilio.
- Add Twilio as an SMS provider in Casdoor and test it.

#### What you need

- A Twilio account with a phone number
- Administrator access to the Casdoor admin console

---

## Get the credentials

In the [Twilio Console](https://console.twilio.com/), copy the Account SID, the Auth Token, and your Twilio phone number.

![Account SID, Auth Token, and phone number in the Twilio Console](/img/providers/sms/twilioInfo.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SMS` and **Type** to `Twilio SMS`.
1. Fill in the fields:

   | Casdoor field   | Twilio              | Required |
   |-----------------|---------------------|----------|
   | Client ID       | Account SID         | Yes      |
   | Client secret   | Auth Token         | Yes      |
   | Sender number   | Twilio phone number | Yes      |
   | Template code   | Your SMS template   | Yes      |

   ![Twilio provider in Casdoor](/img/providers/sms/twilioProvider.png)

1. Save the provider.

## Verify the result

Enter a phone number in **SMS Test** and send a test message.

## See also

- [SMS providers](/docs/provider/sms/overview)
