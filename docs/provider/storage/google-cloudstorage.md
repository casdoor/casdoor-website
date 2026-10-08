---
title: Store files in Google Cloud Storage
sidebar_label: Google Cloud Storage
description: Store uploaded files, such as avatars, in a Google Cloud Storage bucket with a service account.
keywords: [Google Cloud Storage, storage, provider]
authors: [sp71]
---

This guide explains how to store the uploaded files of Casdoor, such as avatars, in Google Cloud Storage.

---

#### Learning outcomes

- Create a service account key with access to the bucket.
- Add Google Cloud Storage as a storage provider in Casdoor.

#### What you need

- A Google Cloud project with a Cloud Storage bucket
- Administrator access to the Casdoor admin console

---

## Create a service account key {#1-create-credentials-in-gcp}

1. [Create a service account](https://cloud.google.com/iam/docs/keys-create-delete) and grant it [IAM permissions](https://cloud.google.com/storage/docs/access-control/iam-permissions) on the bucket. See [Authentication for Cloud Storage](https://cloud.google.com/storage/docs/authentication?hl=en#service_accounts).
1. Create a key for the service account and download it as a JSON file.

## Add the provider in Casdoor {#2-configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Storage` and **Type** to `Google Cloud Storage`.
1. Fill in the fields:

   | Casdoor field       | GCP / meaning       | Required |
   |---------------------|---------------------|----------|
   | Service Account JSON| Service account key (JSON content) | Yes |
   | Endpoint            | Endpoint (optional) | No       |
   | Bucket              | Bucket name         | Yes      |

   ![Google Cloud Storage provider in Casdoor](/img/providers/storage/googleProvider.png)

1. Save the provider.

## See also

- [Storage providers](/docs/provider/storage/overview)
