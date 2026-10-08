---
title: Send SMS with Alibaba Cloud
sidebar_label: Alibaba Cloud
description: Use the SMS service of Alibaba Cloud as the SMS provider of Casdoor.
keywords: [Alibaba Cloud, SMS, provider]
authors: [UsherFall]
---

This guide explains how to send the verification codes of Casdoor by SMS through the SMS service of Alibaba Cloud.

---

#### Learning outcomes

- Get an AccessKey, a signature, and a template code from Alibaba Cloud.
- Add Alibaba Cloud as an SMS provider in Casdoor and test it.

#### What you need

- An Alibaba Cloud account with the SMS service
- Administrator access to the Casdoor admin console

---

## Get the credentials

1. In the [Alibaba Cloud console](https://ram.console.aliyun.com/manage/ak), create or copy an AccessKey ID and AccessKey Secret.

   ![SMS service in the Alibaba Cloud console](/img/providers/sms/aliyunsms.png)

   ![AccessKey of Alibaba Cloud](/img/providers/sms/accesskey.png)

1. In the console of the SMS service, configure a signature.

   ![Signature in the SMS console](/img/providers/sms/alibabaSign.png)

1. Create or select an SMS template and copy its code.

   ![Template code in the SMS console](/img/providers/sms/alibabaCode.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SMS` and **Type** to `Aliyun SMS`.
1. Fill in the fields:

   | Casdoor field   | Alibaba Cloud   | Required |
   |-----------------|-----------------|----------|
   | Client ID       | AccessKey ID    | Yes      |
   | Client secret   | AccessKey Secret| Yes      |
   | Sign Name       | Signature       | Yes      |
   | Template code   | Template code   | Yes      |

   ![Alibaba Cloud SMS provider in Casdoor](/img/providers/sms/alibabaProvider.png)

1. Save the provider.

## Verify the result

Enter a phone number in **SMS Test** and send a test message.

## See also

- [SMS providers](/docs/provider/sms/overview)
- [Send SMS with Alibaba Cloud PNVS](/docs/provider/sms/pnvs)
