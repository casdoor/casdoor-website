---
title: Alibaba Cloud
description: Integrate Alibaba Cloud for Chinese ID card verification
keywords: [Alibaba Cloud, ID Verification, identity, KYC, China]
authors: [hsluoyz]
---

Alibaba Cloud (Aliyun) offers a financial-grade ID verification service that specializes in validating Chinese national ID cards (身份证). This service verifies whether the provided ID number matches the real name through government databases, making it ideal for applications serving users in mainland China.

## Getting Started

You'll need an Alibaba Cloud account with the ID Verification service enabled. If you don't have one, register at [aliyun.com](https://www.aliyun.com/).

To obtain your credentials:

1. Log in to your Alibaba Cloud console
2. Navigate to the AccessKey management page
3. Create an AccessKey pair - you'll get an Access Key ID and Secret Access Key
4. Enable the Real Person Verification service in your account

The service uses the [Id2MetaVerify API](https://help.aliyun.com/zh/id-verification/financial-grade-id-verification/server-side-integration-2) to verify Chinese ID cards against government records.

## Configuration

Create a new provider in Casdoor:

1. Go to **Providers** and click **Add**
2. Set **Category** to "ID Verification"
3. Select **Type** as "Alibaba Cloud"
4. Fill in the credentials:
   - **Access key**: Your Alibaba Cloud Access Key ID
   - **Secret access key**: Your Alibaba Cloud Secret Access Key
   - **Endpoint**: Leave empty to use the default (`cloudauth.cn-shanghai.aliyuncs.com`) or specify a custom endpoint
5. Save and add the provider to your application

## Usage

When users verify their identity, Casdoor submits their ID card number (身份证号) and real name (姓名) to Alibaba Cloud. The service checks whether these details match the records in China's national ID database.

Verification succeeds when:

- The ID card number format is valid
- The ID card exists in the government database  
- The provided name matches the registered name for that ID card

After successful verification, the user's identity fields are locked and cannot be changed.

## Requirements

- Users must have Chinese national ID cards (18-digit ID numbers)
- Both the ID card number and real name fields must be filled in before verification
- Your Alibaba Cloud account must have sufficient API call quotas

## Testing

Test your configuration from the provider edit page in Casdoor. Make sure to use valid test credentials provided by Alibaba Cloud to avoid consuming your production quota during development.
