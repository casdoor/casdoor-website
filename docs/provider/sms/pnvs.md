---
title: Send SMS with Alibaba Cloud PNVS
sidebar_label: Alibaba Cloud PNVS
description: Use the Phone Number Verification Service (PNVS) of Alibaba Cloud as the SMS provider of Casdoor.
keywords: [Alibaba Cloud, PNVS, SMS, provider]
authors: [hsluoyz]
---

This guide explains how to send the verification codes of Casdoor through the Phone Number Verification Service (PNVS) of Alibaba Cloud.

---

#### Learning outcomes

- Get an AccessKey with access to PNVS.
- Add Alibaba Cloud PNVS as an SMS provider in Casdoor and test it.

#### What you need

- An Alibaba Cloud account with PNVS
- Administrator access to the Casdoor admin console

---

## Get the credentials

In the [RAM console of Alibaba Cloud](https://ram.console.aliyun.com/manage/ak), create or copy an AccessKey ID and AccessKey Secret of an account that may use the `dypnsapi` service.

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SMS` and **Type** to `Alibaba Cloud PNVS SMS`.
1. Fill in the fields:

   | Casdoor field | Alibaba Cloud | Required |
   |---------------|---------------|----------|
   | Client ID | AccessKey ID | Yes |
   | Client secret | AccessKey Secret | Yes |

1. The provider uses the region `cn-hangzhou` by default. If your PNVS service is in another region, set the region on the provider.
1. Save the provider.

## Verify the result

Enter a phone number in **SMS Test** and send a test message.

## See also

- [SMS providers](/docs/provider/sms/overview)
- [Send SMS with Alibaba Cloud](/docs/provider/sms/alibabaCloud)
