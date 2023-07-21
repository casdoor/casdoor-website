---
title: Amazon S3
description: Using Amazon S3S as a storage provider for Casdoor
keywords: [Amazon S3, storage, provider]
authors: [UsherFall]
---

:::note

This is an example of **Amazon S3**.

:::

### Create security credentials

Follow the document: [Managing access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html), Create and save your `access key` and `secret access key` in amazon console.

### Config your bucket

In your bucket permissons options, uncheck the "block" then save changes.

![uncheck block](/img/providers/storage/amazonNoBlock.png)

Edit the object ownership, check ACLs enabled

![check ACLs enabled](/img/providers/storage/amazonOwnership.png)

### Config Casdoor

Fill the necessary information, includes the `Client ID` and `Client Secret` obtained from the `access key` and `secret access key` in the previous step. You can refer to this documentation for information on the formatting of the `endpoint`: [Website endpoints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteEndpoints.html)

![amazon s3 provider](/img/providers/storage/amazonProvider.png)
