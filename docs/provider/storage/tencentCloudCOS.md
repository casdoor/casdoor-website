---
title: Store files in Tencent Cloud COS
sidebar_label: Tencent Cloud COS
description: Store uploaded files, such as avatars, in a Tencent Cloud COS bucket.
keywords: [Tencent Cloud COS, storage, provider]
authors: [UsherFall]
---

This guide explains how to store the uploaded files of Casdoor, such as avatars, in Tencent Cloud COS.

---

#### Learning outcomes

- Find the credentials and the bucket settings in Tencent Cloud.
- Add Tencent Cloud COS as a storage provider in Casdoor.

#### What you need

- A Tencent Cloud account and a COS bucket
- Administrator access to the Casdoor admin console

---

## Find the values in Tencent Cloud

1. Copy the SecretId and the SecretKey from the [API keys](https://console.cloud.tencent.com/cam/capi) page.

   ![API keys in Tencent Cloud](/img/providers/storage/tencentKey.png)

1. Copy the endpoint, the bucket name, and the region from the settings of the bucket.

   ![Bucket settings in COS](/img/providers/storage/tencentConfig.png)

1. Optionally, set up a CDN domain for the bucket. See [COS CDN configuration](https://cloud.tencent.com/document/product/436/18670).

## Add the provider in Casdoor {#configure-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Storage` and **Type** to `Tencent Cloud COS`.
1. Fill in the fields:

   | Casdoor field   | Tencent Cloud     | Required |
   |-----------------|-------------------|----------|
   | Client ID       | SecretId          | Yes      |
   | Client secret   | SecretKey         | Yes      |
   | Endpoint        | Endpoint          | Yes      |
   | Bucket          | BucketName        | Yes      |
   | Region ID       | Region            | Yes      |
   | Path prefix     | —                 | No       |
   | Domain          | CDN domain        | No       |

   ![Tencent Cloud COS provider in Casdoor](/img/providers/storage/tencentResult.png)

1. Save the provider.

## See also

- [Storage providers](/docs/provider/storage/overview)
