---
title: Amazon S3 storage
description: Use Amazon S3 as a Casdoor storage provider.
keywords: [Amazon S3, storage, provider]
authors: [UsherFall]
---

Configure Casdoor to store files (e.g. avatars) in **Amazon S3**.

## 1. Create credentials

Create and save an **access key** and **secret access key** in the AWS console. See [Managing access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

## 2. Configure the bucket

- In the bucket **Permissions**, turn off “Block all public access” (or configure a policy that allows Casdoor) and save.
- In **Object Ownership**, enable **ACLs** and set ownership as needed.

![uncheck block](/img/providers/storage/amazonNoBlock.png)
![check ACLs enabled](/img/providers/storage/amazonOwnership.png)

## 3. Add the provider in Casdoor

| Casdoor field    | In AWS / S3      | Required |
|------------------|-------------------|----------|
| Client ID        | Access key        | Yes      |
| Client secret    | Secret access key | Yes      |
| Endpoint         | Endpoint          | Yes      |
| Endpoint (intranet) | VPC endpoint   | No       |
| Bucket           | Bucket name       | Yes      |
| Path prefix      | —                 | No       |
| Domain           | CloudFront domain | No       |
| Region ID        | AWS region        | Yes      |

Endpoint format: [Website endpoints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteEndpoints.html).

![Amazon S3 provider](/img/providers/storage/amazonProvider.png)

## Optional

- **VPC access**: [Access AWS services through AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html).
- **CloudFront**: [Create a distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.SimpleDistribution.html), then set **Domain** in the provider to the distribution domain.

![domain](/img/providers/storage/amazonCloudFront.png)
