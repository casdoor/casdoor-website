---
title: Alibaba Cloud
description: Integrate Alibaba Cloud for ID card verification
keywords: [Alibaba Cloud, ID Verification, identity, KYC]
authors: [hsluoyz]
---

Alibaba Cloud (Aliyun) provides financial-grade ID verification that connects directly to government databases. Unlike document verification services, it validates whether an ID number matches a real name through official records. This makes it ideal for applications serving users in regions where Alibaba Cloud has database access.

## Setting Up

You'll need an Alibaba Cloud account with the ID Verification service enabled. Register at [aliyun.com](https://www.aliyun.com/) if you don't have one yet. Once you're in, navigate to the AccessKey management page and create an AccessKey pair. You'll receive an Access Key ID and Secret Access Key—keep these safe as you'll need them for Casdoor. Don't forget to enable the Real Person Verification service in your account settings.

The service uses Alibaba Cloud's [Id2MetaVerify API](https://help.aliyun.com/zh/id-verification/financial-grade-id-verification/server-side-integration-2) under the hood, which queries government ID databases to confirm that an ID card number matches the provided name.

## Configuring in Casdoor

Head to the Providers section in your Casdoor admin console and click Add. Set the Category to "ID Verification" and Type to "Alibaba Cloud". Fill in your Access Key ID and Secret Access Key in the respective fields. For the endpoint, you can leave it empty to use the default (`cloudauth.cn-shanghai.aliyuncs.com`) or specify a custom one if needed. Save the provider and add it to your application's provider list.

## How Verification Works

When users verify their identity, Casdoor sends their ID card number and real name to Alibaba Cloud. The service checks these details against national ID database records. Verification succeeds when the ID card number format is valid, the ID card exists in the government database, and the provided name matches exactly.

The service supports both 15-digit and 18-digit national ID card numbers. Users must fill in both their ID card number and real name before initiating verification. After successful verification, their identity fields lock automatically to prevent any future changes.

## Testing and Production

Test your configuration from the provider edit page in Casdoor before going live. Make sure to use valid test credentials provided by Alibaba Cloud during development—this avoids consuming your production quota while you're still setting things up. Your Alibaba Cloud account needs sufficient API call quotas for production use.
