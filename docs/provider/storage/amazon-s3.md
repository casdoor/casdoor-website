---
title: Store files in Amazon S3
sidebar_label: Amazon S3
description: Store uploaded files, such as avatars, in an Amazon S3 bucket.
keywords: [Amazon S3, storage, provider]
authors: [UsherFall]
---

This guide explains how to store the uploaded files of Casdoor, such as avatars, in Amazon S3.

---

#### Learning outcomes

- Create an access key and prepare the bucket.
- Add Amazon S3 as a storage provider in Casdoor.
- Serve the files through a VPC endpoint or CloudFront.

#### What you need

- An AWS account and an S3 bucket
- Administrator access to the Casdoor admin console

---

## Prepare AWS

1. Create an access key and a secret access key. See [Managing access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
1. In the **Permissions** of the bucket, turn off **Block all public access**, or add a bucket policy that allows Casdoor, and save.

   ![Block all public access turned off](/img/providers/storage/amazonNoBlock.png)

1. In **Object Ownership**, turn on ACLs and set the ownership that you need.

   ![ACLs turned on](/img/providers/storage/amazonOwnership.png)

## Add the provider in Casdoor {#3-add-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Storage` and **Type** to `AWS S3`.
1. Fill in the fields:

   | Casdoor field    | In AWS / S3      | Required |
   |------------------|-------------------|----------|
   | Client ID        | Access key        | Yes      |
   | Client secret    | Secret access key | Yes      |
   | Endpoint         | Endpoint          | Yes      |
   | Endpoint (Intranet) | VPC endpoint   | No       |
   | Bucket           | Bucket name       | Yes      |
   | Path prefix      | —                 | No       |
   | Domain           | Bucket URL or CloudFront domain | Yes |
   | Region ID        | AWS region        | Yes      |

   **Endpoint** is the S3 REST API endpoint of the region, such as `https://s3.us-east-1.amazonaws.com`. See [Amazon S3 endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html). Don't use a website endpoint.

   Set **Domain** to the URL that serves the files, such as `https://<bucket>.s3.us-east-1.amazonaws.com` or the domain of a CloudFront distribution. Casdoor builds the URLs of uploaded files from it. If **Domain** is empty, Casdoor fills it with the endpoint, which doesn't contain the bucket name, so the file URLs don't work.

   ![Amazon S3 provider in Casdoor](/img/providers/storage/amazonProvider.png)

1. Save the provider.

## Optional settings {#optional}

- **Access through a VPC**: Set **Endpoint (Intranet)** to a VPC endpoint. See [Access AWS services through AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html).
- **Delivery through CloudFront**: [Create a distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.SimpleDistribution.html) and set **Domain** to the domain of the distribution.

  ![Domain of a CloudFront distribution](/img/providers/storage/amazonCloudFront.png)

## See also

- [Storage providers](/docs/provider/storage/overview)
