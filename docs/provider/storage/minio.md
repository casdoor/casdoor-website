---
title: MinIO storage
description: Use MinIO as a Casdoor storage provider.
keywords: [MinIO, storage, provider, S3]
authors: [Chinoholo0807]
---

[MinIO](https://github.com/minio/minio) is S3-compatible object storage. Use it as a Casdoor storage provider for file uploads (e.g. avatars).

## 1. Deploy MinIO

Deploy MinIO with TLS enabled. From the MinIO console note the **API address**, create an **Access Key** and **Secret Key**, and create a **Bucket**.

![Deploy service](/img/providers/storage/minio_deploy.png)
![Create access key](/img/providers/storage/minio_create_key.png)
![Create bucket](/img/providers/storage/minio_create_bucket.png)

## 2. Add the provider in Casdoor

Create a **Storage** provider, set **Type** to **MinIO**, and fill in:

| Casdoor field   | Value from MinIO   |
|-----------------|--------------------|
| Client ID       | Access Key         |
| Client secret   | Secret Key         |
| Endpoint        | API address        |
| Bucket          | Bucket name        |

![Create a MinIO provider](/img/providers/storage/minio_provider_conf_detail.png)

## 3. Use in your application

Attach the provider to your application; uploads will go to MinIO.

<video src="/video/provider/storage/use_minio_in_app.mp4" controls="controls" width="100%"></video>
