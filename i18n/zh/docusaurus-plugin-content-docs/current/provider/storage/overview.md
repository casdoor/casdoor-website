---
title: 概述
description: 设置上传文件的 Casdoor 存储提供商
keywords:
  - 存储
  - 提供商
authors:
  - leo220yuyaodog
---

如果您需要使用文件存储服务，例如 `头像上传`， 您需要设置存储提供商，并在您的 `应用` 中应用它。

Casdoor 支持两种类型的批量操作 - **Local** 或 **Cloud**。 在本章中，您将学习如何添加一个存储提供商来使用这些服务。

## 项目

- `客户端ID`
- `客户端密钥`
- `地域节点 (外网)`
- `路径perfix`: 文件位置的路径前缀。

:::info

默认 `路径erfix` 是 `/`. 例如，当 `路径erfix` 为空时，默认文件路径：

```text
https://cdn.casbin.com/casdoor/avatar.png
```

您可以用 `abcd/xxxx`填充它，然后您可以将您的头像存储在：

```text
https://cdn.casbin.com/abcd/xxxx/casdoor/avatar.png
```

:::

- `存储桶`
- `域`: 您的云存储的 CDN 自定义域名。

## 本地设置

使用 **本地** 类型，您唯一需要配置的项目是 `域` 字段。 请跟随引导操作

```text
域/图像
```

例如， `http://127.0.0.1:7001/images`, `http://door.casbin.org/images` 都是允许的。

但是 `127.0.0.1:7001/images` 是错误的。

使用 `本地` 类型， `Client ID`， `Client secret` `Endpoint` 和 `Bucket` 已不再需要，您可以 **随意填写**, 并且它 **不能为空**。

## 云端

目前，我们支持 **AWS S3**, **Aliyun OSS**, **Tencent Cloud COS**, **MinIO** 和 **Azure Blob** 云服务商，正在添加更多云存储服务。

用 `Client ID`, `Client secret`, 填写相应字段 `Endpoint` 和 `Bucket` 从您的云端供应商控制台获得。

::::tip

使用 `非区域` 类型，您可能不需要用于自定义域的 `域` 字段。

:::
