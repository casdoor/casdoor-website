---
title: Amazon S3
description: Using Amazon S3 as a storage provider for Casdoor
keywords: [Amazon S3, storage, provider]
authors: [UsherFall]
---

:::note

This is an example of **Amazon S3**.

:::

### Create security credentials

Follow the document: [Managing access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to create and save your `access key` and `secret access key` in the Amazon console.

### Configure your bucket

In your bucket permissions options, uncheck the "block" option and save the changes.

![uncheck block](/img/providers/storage/amazonNoBlock.png)

Edit the object ownership and check **ACLs enabled**.

![check ACLs enabled](/img/providers/storage/amazonOwnership.png)

### Configure Casdoor

| Name                | Name in Amazon    | Is Required |
|---------------------|-------------------|-------------|
| Client ID           | Access key        | Required    |
| Client secret       | Secret access key | Required    |
| Endpoint            | Endpoint          | Required    |
| Endpoint (intranet) | VPC endpoint      |             |
| Bucket              | Bucket name       | Required    |
| Path prefix         |                   |             |
| Domain              | CloudFront domain |             |
| Region ID           | AWS region        | Required    |

Fill in the necessary information, including the `Client ID` and `Client Secret` obtained from the `access key` and `secret access key` in the previous step. You can refer to this documentation for information on the formatting of the `endpoint`: [Website endpoints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteEndpoints.html)

![Amazon S3 provider](/img/providers/storage/amazonProvider.png)

### (Optional) Use VPC

You can refer to the official documentation for configuration: [Access AWS services through AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html)

### (Optional) Use CloudFront distribution

Follow the document to configure CloudFront: [Configure CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.SimpleDistribution.html)

In the domain field, enter your distribution domain name.

![domain](/img/providers/storage/amazonCloudFront.png)
