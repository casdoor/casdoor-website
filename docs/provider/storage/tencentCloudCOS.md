---
title: Tencent Cloud COS
description: Using Tencent Cloud COS as a storage provider for Casdoor
keywords: [Tencent Cloud COS, storage, provider]
authors: [UsherFall]
---

:::note

This is an example of **Tencent Cloud COS**.

:::

### Fill the necessary information in Casdoor

There are five required fields. `Client ID`, `Client secret`, `Endpoint`, `Bucket`, `Region ID`. The relationship corresponding to the Tencent Cloud COS account is as follows:

| Name                | Name in Tencent | is required |
|---------------------|-----------------|-------------|
| Client ID           | SecretId        | required    |
| Client secret       | SecretKey       | required    |
| Endpoint            | Endpoint        | required    |
| Bucket              | BucketName      | required    |
| Path prefix         |                 |             |
| Domain              | CDNDomain       |             |
| Region ID           | Region          | required    |

#### Tencent Cloud cos information

- SecretId and SecretKey

![tencentKey.png](/img/providers/storage/tencentKey.png)

- Endpoint, BucketName and Region

![tencentConfig.png](/img/providers/storage/tencentConfig.png)

- (Optional) CDNDomain

You can refer to the official documentation for configuration: [config CDN](https://cloud.tencent.com/document/product/436/18670#.E5.AF.B9.E8.87.AA.E5.AE.9A.E4.B9.89.E5.9F.9F.E5.90.8D.E9.85.8D.E7.BD.AE-cdn-.E5.8A.A0.E9.80.9F)

#### Config Casdoor provider

![tencentResult.png](/img/providers/storage/tencentResult.png)
