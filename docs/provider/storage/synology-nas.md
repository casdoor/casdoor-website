---
title: Synology NAS
description: Using Synology NAS as a storage provider for Casdoor
keywords: [Synology, NAS, storage, provider]
authors: [xiao-kong-long]
---

:::note

This is an example of **Synology NAS**.

:::

### Fill in the necessary information in Casdoor

There are five required fields: `Client ID`, `Client secret` and `Endpoint`. The corresponding relationship to the Synology NAS account is as follows:

| Name                | Name in Tencent | Required |
|---------------------|-----------------|----------|
| Client ID           | SecretId        | Yes      |
| Client secret       | SecretKey       | Yes      |
| Endpoint            | Endpoint        | Yes      |
| Bucket              |                 |          |
| Path prefix         |                 |          |
| Domain              |                 |          |
| Region ID           |                 |          |

#### Configure Casdoor provider

![synologyConfig.png](/img/providers/storage/synologyConfig.png)


You can refer to the official documentation for configuration: [link](https://www.synology.cn/zh-cn/support/developer#tool)
