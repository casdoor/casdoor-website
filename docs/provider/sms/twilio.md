---
title: Twilio
description: Using Twilio as an SMS provider for Casdoor
keywords: [Twilio, SMS, provider]
authors: [UsherFall]
---

## Fill in the necessary information in Casdoor

There are four required fields: `Client ID`, `Client secret`, `Sender number`, and `Template code`. The corresponding relationship to the Twilio account is as follows:

| Name          | Name in Twilio      | Required   |
|---------------|---------------------|------------|
| Client ID     | Account SID         | Required   |
| Client secret | Auth Token          | Required   |
| Sender number | Twilio phone number | Required   |
| Template code |                     | Required   |

### Twilio information

- Account SID, Auth Token, and Twilio phone number

![twilioInfo.png](/img/providers/sms/twilioInfo.png)

### Configure Casdoor provider

You can configure the `template code` to suit your requirements, and then enter your phone number in `SMS Test` to test.

![twilioProvider.png](/img/providers/sms/twilioProvider.png)
