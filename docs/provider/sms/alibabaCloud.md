---
title: Alibaba Cloud SMS
description: Use Alibaba Cloud as an SMS provider for verification codes.
keywords: [Alibaba Cloud, SMS, provider]
authors: [UsherFall]
---

Create a **SMS** provider in Casdoor and set **Type** to **Alibaba Cloud**. Map fields as follows:

| Casdoor field   | Alibaba Cloud   | Required |
|-----------------|-----------------|----------|
| Client ID       | AccessKey ID    | Yes      |
| Client secret   | AccessKey Secret| Yes      |
| Sign Name       | Signature       | Yes      |
| Template code   | Template code   | Yes      |

## Get credentials in Alibaba Cloud

- **AccessKey ID / AccessKey Secret** — In the [Alibaba Cloud console](https://ram.console.aliyun.com/manage/ak), create or copy an AccessKey.

![Alibaba Cloud workbench](/img/providers/sms/aliyunsms.png)
![AccessKey](/img/providers/sms/accesskey.png)

- **Signature** — Configure in the SMS service console.

![Alibaba Signature](/img/providers/sms/alibabaSign.png)

- **Template code** — Create or select an SMS template and use its code.

![Alibaba Template Code](/img/providers/sms/alibabaCode.png)

## Configure and test in Casdoor

Fill in the provider fields and use **SMS Test** with a phone number to verify.

![Alibaba Provider Configuration](/img/providers/sms/alibabaProvider.png)
