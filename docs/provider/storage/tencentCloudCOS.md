---
title: Tencent Cloud COS
description: Use Tencent Cloud COS as a Casdoor storage provider.
keywords: [Tencent Cloud COS, storage, provider]
authors: [UsherFall]
---

## Field mapping

| Casdoor field   | Tencent Cloud     | Required |
|-----------------|-------------------|----------|
| Client ID       | SecretId          | Yes      |
| Client secret   | SecretKey         | Yes      |
| Endpoint        | Endpoint          | Yes      |
| Bucket          | BucketName        | Yes      |
| Region ID       | Region            | Yes      |
| Path prefix     | —                 | No       |
| Domain          | CDN domain        | No       |

Get **SecretId** and **SecretKey** from the [Tencent Cloud API Key](https://console.cloud.tencent.com/cam/capi) page. Get **Endpoint**, **BucketName**, and **Region** from your COS bucket settings.

![tencentKey.png](/img/providers/storage/tencentKey.png)
![tencentConfig.png](/img/providers/storage/tencentConfig.png)

Optional: use a custom CDN domain — see [Tencent COS CDN configuration](https://cloud.tencent.com/document/product/436/18670).

## Configure in Casdoor

Create a **Storage** provider, set **Type** to **Tencent Cloud COS**, and fill in the fields above.

![tencentResult.png](/img/providers/storage/tencentResult.png)
