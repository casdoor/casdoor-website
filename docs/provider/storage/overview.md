---
title: Storage providers
sidebar_label: Overview
description: Configure where Casdoor stores uploaded files, such as avatars, on the local file system or in cloud object storage.
keywords: [storage, provider, S3, OSS, MinIO]
authors: [leo220yuyaodog]
---

A storage provider decides where Casdoor stores uploaded files, such as the avatars of users. Add a storage provider and then add it to your application.

## Storage types

| Type | Where files are stored |
|---|---|
| `Local File System` | On the file system of the Casdoor server. See [Local file system](/docs/provider/storage/localFileSystem) |
| `AWS S3` | In Amazon S3. See [Amazon S3](/docs/provider/storage/amazon-s3) |
| `Azure Blob` | In Azure Blob Storage. See [Azure Blob](/docs/provider/storage/azure) |
| `Google Cloud Storage` | In Google Cloud Storage. See [Google Cloud Storage](/docs/provider/storage/google-cloudstorage) |
| `Aliyun OSS` | In Alibaba Cloud OSS. See [Alibaba Cloud OSS](/docs/provider/storage/aliyun-oss) |
| `Tencent Cloud COS` | In Tencent Cloud COS. See [Tencent Cloud COS](/docs/provider/storage/tencentCloudCOS) |
| `MinIO` | In MinIO or another S3-compatible store. See [MinIO](/docs/provider/storage/minio) |
| `Synology` | On a Synology NAS. See [Synology NAS](/docs/provider/storage/synology-nas) |
| `Qiniu Cloud Kodo` | In Qiniu Cloud Kodo |
| `Casdoor` | In another Casdoor instance |

## Common fields {#provider-fields}

| Field | Description |
|-------|-------------|
| **Client ID** | Identifier from the cloud storage provider. |
| **Client secret** | Secret shared with the storage service. |
| **Endpoint** | Public URL/domain of the storage service. |
| **Endpoint (Intranet)** | Internal/private URL for same-datacenter access. |
| **Path prefix** | Prefix for object keys (default `/`). With prefix `abcd/xxxx`, a file is stored at e.g. `https://cdn.example.com/abcd/xxxx/casdoor/avatar.png`. |
| **Bucket** | Bucket/container name. |
| **Domain** | Custom CDN domain for serving files. |
| **Region ID** | Data center region (for cloud providers). |

## See also

- [Providers](/docs/provider/overview)
- [Configuration reference](/docs/basic/configuration): `defaultStorageProvider` sets the storage provider that Casdoor uses when an application has none.
