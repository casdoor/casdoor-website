---
title: Amazon SNS
description: Using Amazon SNS as an SMS provider for Casdoor
keywords: [Amazon SNS, SMS, provider]
authors: [UsherFall]
---

## Obtaining the necessary information in Amazon

There are four required fields: `Access Key`, `Secret Access Key`, `Region`, and `Template code`. I will show you how to obtain this information from Amazon SNS.

- Access Key and Secret Access Key

In Identity and Access Management (IAM), you can create an `Access Key` and `Secret Access Key`.

![amazonAccess.png](/img/providers/sms/amazonAccess.png)

- Region

The `Region` is related to the topic you created.

![amazonRegion.png](/img/providers/sms/amazonRegion.png)

### Configuring the Casdoor provider

The `Template code` is the message you want to send. Enter your phone number in the `SMS Test` to test.

![amazonProvider.png](/img/providers/sms/amazonProvider.png)
