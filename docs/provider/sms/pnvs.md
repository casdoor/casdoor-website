---
title: Alibaba Cloud PNVS SMS
description: Use Alibaba Cloud PNVS (Personal Number Verification Service) as an SMS provider.
keywords: [Alibaba Cloud, PNVS, SMS, provider]
authors: [hsluoyz]
---

Create a **SMS** provider in Casdoor and set **Type** to **Alibaba Cloud PNVS SMS**. Map fields as follows:

| Casdoor field | Alibaba Cloud | Required |
|---------------|---------------|----------|
| Client ID | AccessKey ID | Yes |
| Client secret | AccessKey Secret | Yes |

## Get credentials

In the [Alibaba Cloud RAM console](https://ram.console.aliyun.com/manage/ak), create or copy an AccessKey ID and AccessKey Secret for an account that has access to the `dypnsapi` service.

## Region

The provider defaults to region `cn-hangzhou`. If your PNVS service is in a different region, configure it in Casdoor's provider settings.

## Configure and test

Fill in the provider fields and use **SMS Test** with a phone number to verify that messages are delivered.
