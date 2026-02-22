---
title: Storage provider overview
description: Configure local or cloud storage for file uploads (e.g. avatars).
keywords: [storage, provider, S3, OSS, MinIO]
authors: [leo220yuyaodog]
---

Use a **Storage** provider when you need file storage (e.g. avatar uploads). Add the provider and attach it to your application. Casdoor supports **Local** (filesystem) and **Cloud** (object storage) types.

## Provider fields

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

## Local storage

Files are stored on the server’s local filesystem.

## Cloud storage

Supported: **AWS S3**, **Azure Blob Storage**, **MinIO**, **Alibaba Cloud OSS**, **Tencent Cloud COS**. More providers may be added over time.
