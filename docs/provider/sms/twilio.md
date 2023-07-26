---
title: Twilio
description: Using Twilio as a SMS provider for Casdoor
keywords: [Twilio, SMS, provider]
authors: [UsherFall]
---

## Fill the necessary information in Casdoor

There are four required fields. `Client ID`, `Client secret`, `Sender number`, `Template code`. The relationship corresponding to the Tencent Cloud COS account is as follows:

| Name          | Name in Twilio      | is required |
|---------------|---------------------|------------|
| Client ID     | Account SID         | required   |
| Client secret | Auth Token          | required   |
| Sender number | Twilio phone number | required   |
| Template code |                     | required   |

### Twilio information

- Account SID, Auth Token and Twilio phone number

![twilioInfo.png](/img/providers/sms/twilioInfo.png)

### Config Casdoor provider

You can configure the `template code` to suit your requirements, and then enter your phone number in `SMS Test` to test.

![twilioProvider.png](/img/providers/sms/twilioProvider.png)
