---
title: MinIO
description: Using MinIO as a storage provider for Casdoor
keywords: [MinIO, storage, provider]
authors: [Chinoholo0807]
---

:::note

This is an example of how to configure a **MinIO** provider.

:::

[MinIO](https://github.com/minio/minio) is a High Performance Object Storage Service that is API compatible with Amazon S3 cloud storage service.

### Step1. Deploy the MinIO service

First, deploy the MinIO service with TLS enabled. You can get the `API address` from console.

![deploy service](/img/providers/storage/minio_deploy.png)

Second, create the `Access Key` and `Secret key`.

![created access key](/img/providers/storage/minio_create_key.png)

Third, create the `Bucket`.

![created bucket](/img/providers/storage/minio_create_bucket.png)

### Step2. Create a MinIO provider in Casdoor

Now create a MinIO provider in Casdoor. Fill the necessary information.

|    Name       |   Name in MinIO |
|      ----     |   ----          |  
|Category       |   choose `Storage`                   |
|Type           |   choose `MinIO`                     |
|Client ID      |   `Access Key` obtained from Step1   |
|Client secret  |   `Secret Key` obtained from Step1   |
|Endpoint       |   `API address` obtained from Step1  |
|Bucket         |   `Bucket` obtained from Step1       |
<!-- ![create a MinIO provider](/img/providers/storage/minio_provider_conf.png) -->

![create a MinIO provider](/img/providers/storage/minio_provider_conf_detail.png)

### Step3. Use MinIO storage service in your application

Now you can use MinIO storage service in your application.

<video src="/video/provider/storage/use_minio_in_app.mp4" controls="controls" width="100%"></video>

### (Optional) Use CDN service

You can integrate other cloud CDN services with MinIO by simply filling in the CDN domain name in the `domain` field.

![config minio domain](/img/providers/storage/minio_provider_domain.png)
