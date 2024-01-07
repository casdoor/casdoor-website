---
title: Google Cloud Storage
description: Using Google Cloud Storage as a storage provider for Casdoor
keywords: [Google Cloud Storage, storage, provider]
authors: [sp71]
---

:::note

This is an example of **Google Cloud Storage**.

:::

### Create security credentials

Follow the document: [Cloud Storage Authentication](https://cloud.google.com/storage/docs/authentication?hl=en#service_accounts) to create a [service account](https://cloud.google.com/iam/docs/keys-create-delete) with the correct [IAM permissions](https://cloud.google.com/storage/docs/access-control/iam-permissions) to access the bucket in the GCP console.

### Configure Casdoor

| Name                 | Name in Google      | Is Required |
|----------------------|-------------------- |-------------|
| Service Account JSON | Service Account Key | Required    |
| Endpoint             | Endpoint            |             |
| Bucket               | Bucket name         | Required    |

![Google Cloud Storage provider](/img/providers/storage/googleProvider.png)
