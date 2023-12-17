---
title: Alibaba Cloud
description: Using Alibaba Cloud as an SMS provider for Casdoor
keywords: [Alibaba Cloud, SMS, provider]
authors: [UsherFall]
---

## Fill in the necessary information in Casdoor

There are four required fields: `Client ID`, `Client secret`, `Sign Name`, and `Template code`. The corresponding relationship with the Alibaba Cloud account is as follows:

| Name          | Name in Alibaba  | is required |
|---------------|------------------|------------|
| Client ID     | AccessKey ID     | required   |
| Client secret | AccessKey Secret | required   |
| Sign Name     | Signature        | required   |
| Template code | Template code    | required   |

### Alibaba information

- AccessKey ID and AccessKey Secret

After logging into my Alibaba Cloud workbench, I click on "AccessKey" to create an ID and Secret.

![Alibaba Cloud workbench](/img/providers/sms/aliyunsms.png)

By creating an AccessKey, I obtain my AccessKey ID and AccessKey Secret:

![AccessKey](/img/providers/sms/accesskey.png)

- Signature

![Alibaba Signature](/img/providers/sms/alibabaSign.png)

- Template code

![Alibaba Template Code](/img/providers/sms/alibabaCode.png)

### Configure Casdoor provider

Enter your phone number in the `SMS Test` field to test.

![Alibaba Provider Configuration](/img/providers/sms/alibabaProvider.png)
