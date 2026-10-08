---
title: Store files in MinIO
sidebar_label: MinIO
description: Store uploaded files, such as avatars, in MinIO or another S3-compatible object store.
keywords: [MinIO, storage, provider, S3]
authors: [Chinoholo0807]
---

This guide explains how to store the uploaded files of Casdoor, such as avatars, in [MinIO](https://github.com/minio/minio), an S3-compatible object store.

---

#### Learning outcomes

- Prepare MinIO with an access key and a bucket.
- Add MinIO as a storage provider in Casdoor.

#### What you need

- A MinIO deployment with TLS
- Administrator access to the Casdoor admin console

---

## Prepare MinIO {#1-deploy-minio}

1. Deploy MinIO with TLS and note its API address.

   ![MinIO console](/img/providers/storage/minio_deploy.png)

1. In the MinIO console, create an access key and a secret key.

   ![Access key creation in MinIO](/img/providers/storage/minio_create_key.png)

1. Create a bucket.

   ![Bucket creation in MinIO](/img/providers/storage/minio_create_bucket.png)

## Add the provider in Casdoor {#2-add-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Storage` and **Type** to `MinIO`.
1. Fill in the fields:

   | Casdoor field   | Value from MinIO   |
   |-----------------|--------------------|
   | Client ID       | Access Key         |
   | Client secret   | Secret Key         |
   | Endpoint        | API address        |
   | Bucket          | Bucket name        |

   ![MinIO provider in Casdoor](/img/providers/storage/minio_provider_conf_detail.png)

1. Save the provider.

## Verify the result {#3-use-in-your-application}

Add the provider to your application and upload a file, for example an avatar. The file appears in the MinIO bucket.

<video src="/video/provider/storage/use_minio_in_app.mp4" controls="controls" width="100%"></video>

## See also

- [Storage providers](/docs/provider/storage/overview)
- [MinIO integration](/docs/integration/go/minio): Sign users in to MinIO with Casdoor.
