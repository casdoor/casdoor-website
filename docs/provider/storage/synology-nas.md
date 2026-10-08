---
title: Store files on a Synology NAS
sidebar_label: Synology NAS
description: Store uploaded files on a Synology NAS through its S3-compatible API.
keywords: [Synology, NAS, storage, provider]
authors: [xiao-kong-long]
---

This guide explains how to store the uploaded files of Casdoor on a Synology NAS through its S3-compatible API.

---

#### Learning outcomes

- Add a Synology NAS as a storage provider in Casdoor.

#### What you need

- A Synology NAS with an S3-compatible endpoint and keys. See the [Synology developer documentation](https://www.synology.cn/zh-cn/support/developer#tool).
- Administrator access to the Casdoor admin console

---

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Storage` and **Type** to `Synology`.
1. Fill in the fields. At least **Client ID**, **Client secret**, and **Endpoint** are required.

   | Casdoor field | Synology / meaning | Required |
   |---------------|--------------------|----------|
   | Client ID     | SecretId (access key) | Yes   |
   | Client secret | SecretKey          | Yes      |
   | Endpoint      | S3 API endpoint    | Yes      |
   | Bucket        | Bucket name        | No       |
   | Path prefix   | Path prefix        | No       |
   | Domain        | Custom domain      | No       |
   | Region ID     | Region             | No       |

   ![Synology provider in Casdoor](/img/providers/storage/synologyConfig.png)

1. Save the provider.

## See also

- [Storage providers](/docs/provider/storage/overview)
