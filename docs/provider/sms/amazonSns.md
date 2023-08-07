---
title: Amazon SNS
description: Using Amazon SNS as a SMS provider for Casdoor
keywords: [Amazon SNS, SMS, provider]
authors: [UsherFall]
---

## Obtain the necessary information in Amazon

There are four required fields. `Access Key`, `Secret access key`, `Region`, `Template code`. I will show you how to obtain these infomations from Amazon SNS.

- Access Key and secret

In Identity and Access Management (IAM), you can create `Access Key` and `Secret access key`

![amazonAccess.png](/img/providers/sms/amazonAccess.png)

- Region

The `Region` is related to the topic you created

![amazonRegion.png](/img/providers/sms/amazonRegion.png)

### Config Casdoor provider

`template code` is the message you want to send. Enter your phone number in `SMS Test` to test.

![amazonProvider.png](/img/providers/sms/amazonProvider.png)
