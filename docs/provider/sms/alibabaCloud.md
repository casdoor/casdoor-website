---
title: Alibaba Cloud
description: Using Alibaba Cloud as a SMS provider for Casdoor
keywords: [Alibaba Cloud, SMS, provider]
authors: [UsherFall]
---

## Fill the necessary information in Casdoor

There are four required fields. `Client ID`, `Client secret`, `Sign Name`, `Template code`. The relationship corresponding to the Alibaba Cloud account is as follows:

| Name          | Name in Alibaba  | is required |
|---------------|------------------|------------|
| Client ID     | AccessKey ID     | required   |
| Client secret | AccessKey Secret | required   |
| Sign Name     | Signature        | required   |
| Template code | Template code    | required   |
| SMS Test      |                  |            |

### Alibaba information

- AccessKey ID and AccessKey Secret

After I logged in my Aliyun workbench, click AccessKey to create ID and Secret.

![aliyun workbench](/img/providers/sms/aliyunsms.png)

By creating AccessKey, I get my AccessKey ID and AccessKey Secret:

![AccessKey](/img/providers/sms/accesskey.png)

- Signature

![alibabaSign](/img/providers/sms/alibabaSign.png)

- Template code

![alibabaCode](/img/providers/sms/alibabaCode.png)

### Config Casdoor provider

Enter your phone number in `SMS Test` to test

![alibabaProvider](/img/providers/sms/alibabaProvider.png)
