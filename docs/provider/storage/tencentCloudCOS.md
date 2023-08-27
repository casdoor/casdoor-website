---
title: Tencent Cloud COS
description: Using Tencent Cloud COS as a storage provider for Casdoor
keywords: [Tencent Cloud COS, storage, provider]
authors: [UsherFall]
---

:::note

This is an example of **Tencent Cloud COS**.

:::

### Fill in the necessary information in Casdoor

There are five required fields: `Client ID`, `Client secret`, `Endpoint`, `Bucket`, and `Region ID`. The corresponding relationship to the Tencent Cloud COS account is as follows:

| Name                | Name in Tencent | Required |
|---------------------|-----------------|----------|
| Client ID           | SecretId        | Yes      |
| Client secret       | SecretKey       | Yes      |
| Endpoint            | Endpoint        | Yes      |
| Bucket              | BucketName      | Yes      |
| Path prefix         |                 |          |
| Domain              | CDNDomain       |          |
| Region ID           | Region          | Yes      |

#### Tencent Cloud COS information

- SecretId and SecretKey

![tencentKey.png](/img/providers/storage/tencentKey.png)

- Endpoint, BucketName, and Region

![tencentConfig.png](/img/providers/storage/tencentConfig.png)

- (Optional) CDNDomain

You can refer to the official documentation for configuration: [Config CDN](https://cloud.tencent.com/document/product/436/18670#.E5.AF.B9.E8.87.AA.E5.AE.9A.E4.B9.89.E5.9F.9F.E5.90.8D.E9.85.8D.E7.BD.AE-cdn-.E5.8A.A0.E9.80.9F)

#### Configure Casdoor provider

![tencentResult.png](/img/providers/storage/tencentResult.png)
