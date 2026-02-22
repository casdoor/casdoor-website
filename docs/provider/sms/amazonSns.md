---
title: Amazon SNS SMS
description: Use Amazon SNS as an SMS provider for verification codes.
keywords: [Amazon SNS, SMS, provider]
authors: [UsherFall]
---

Create a **SMS** provider in Casdoor and set **Type** to **Amazon SNS**. You need: **Access Key**, **Secret Access Key**, **Region**, and **Template code**.

| Casdoor field   | Amazon SNS / meaning     | Required |
|-----------------|--------------------------|----------|
| Client ID       | Access Key (IAM)         | Yes      |
| Client secret   | Secret Access Key (IAM)  | Yes      |
| Region          | AWS region for the topic | Yes      |
| Template code   | Message template / body | Yes      |

## Get credentials in AWS

- **Access Key / Secret Access Key** — In [IAM](https://console.aws.amazon.com/iam/), create or copy an access key for the user that can publish to SNS.

![amazonAccess.png](/img/providers/sms/amazonAccess.png)

- **Region** — Use the region where your SNS topic (or SMS is configured) lives.

![amazonRegion.png](/img/providers/sms/amazonRegion.png)

## Configure and test in Casdoor

Fill in the provider fields. **Template code** is the message content (or template ID) to send. Use **SMS Test** with a phone number to verify.

![amazonProvider.png](/img/providers/sms/amazonProvider.png)
