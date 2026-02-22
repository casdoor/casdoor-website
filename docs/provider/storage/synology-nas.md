---
title: Synology NAS storage
description: Use Synology NAS as a storage provider (S3-compatible).
keywords: [Synology, NAS, storage, provider]
authors: [xiao-kong-long]
---

Configure Synology NAS (or its S3-compatible API) as the backend. You need **Client ID**, **Client secret**, and **Endpoint** at minimum.

| Casdoor field | Synology / meaning | Required |
|---------------|--------------------|----------|
| Client ID     | SecretId (access key) | Yes   |
| Client secret | SecretKey          | Yes      |
| Endpoint      | S3 API endpoint    | Yes      |
| Bucket        | Bucket name        | No       |
| Path prefix   | Path prefix        | No       |
| Domain        | Custom domain      | No       |
| Region ID     | Region             | No       |

See [Synology developer documentation](https://www.synology.cn/zh-cn/support/developer#tool) for creating and configuring the S3-compatible endpoint and keys.

![synologyConfig.png](/img/providers/storage/synologyConfig.png)
