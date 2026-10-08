---
title: Send SMS with Amazon SNS
sidebar_label: Amazon SNS
description: Use Amazon Simple Notification Service (SNS) as the SMS provider of Casdoor.
keywords: [Amazon SNS, SMS, provider]
authors: [UsherFall]
---

This guide explains how to send the verification codes of Casdoor by SMS through Amazon Simple Notification Service (SNS).

---

#### Learning outcomes

- Get an access key that may publish to SNS.
- Add Amazon SNS as an SMS provider in Casdoor and test it.

#### What you need

- An AWS account with SMS configured in SNS
- Administrator access to the Casdoor admin console

---

## Get the credentials

1. In [IAM](https://console.aws.amazon.com/iam/), create an access key for a user that may publish to SNS, and copy the access key and the secret access key.

   ![Access key in IAM](/img/providers/sms/amazonAccess.png)

1. Note the region in which you configured SMS in SNS.

   ![Region in the AWS console](/img/providers/sms/amazonRegion.png)

:::caution
Protect SMS sending against abuse. Bots that trigger verification codes on purpose can create large SNS bills. Use a [captcha](/docs/provider/captcha/overview) on the sign-up and sign-in pages, and set a spending limit for SMS in SNS.
:::

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SMS` and **Type** to `Amazon SNS`.
1. Fill in the fields:

   | Casdoor field   | Amazon SNS / meaning     | Required |
   |-----------------|--------------------------|----------|
   | Client ID       | Access Key (IAM)         | Yes      |
   | Client secret   | Secret Access Key (IAM)  | Yes      |
   | Region          | AWS region for the topic | Yes      |
   | Template code   | Message template / body | Yes      |

   ![Amazon SNS provider in Casdoor](/img/providers/sms/amazonProvider.png)

1. Save the provider.

## Verify the result

Enter a phone number in **SMS Test** and send a test message.

## See also

- [SMS providers](/docs/provider/sms/overview)
