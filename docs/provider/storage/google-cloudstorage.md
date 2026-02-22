---
title: Google Cloud Storage
description: Use Google Cloud Storage as a storage provider.
keywords: [Google Cloud Storage, storage, provider]
authors: [sp71]
---

## 1. Create credentials in GCP

Create a [service account](https://cloud.google.com/iam/docs/keys-create-delete) with [IAM permissions](https://cloud.google.com/storage/docs/access-control/iam-permissions) for your bucket. See [Cloud Storage authentication](https://cloud.google.com/storage/docs/authentication?hl=en#service_accounts). Download the **service account key** (JSON).

## 2. Configure the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Storage**, **Type** to **Google Cloud Storage**. Fill in:

| Casdoor field       | GCP / meaning       | Required |
|---------------------|---------------------|----------|
| Service Account JSON| Service account key (JSON content) | Yes |
| Endpoint            | Endpoint (optional) | No       |
| Bucket              | Bucket name         | Yes      |

![Google Cloud Storage provider](/img/providers/storage/googleProvider.png)
