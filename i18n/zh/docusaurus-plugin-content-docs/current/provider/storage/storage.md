---
title: 存储
description: 设置上传文件的 Casdoor 存储提供商
keywords:
  - 存储
  - 提供商
---

如果您需要使用文件存储服务，例如 `头像上传`， 您需要设置存储提供商，并在您的 `应用` 中应用它。

Casdoor 支持两种类型的存储，`本地` 和 `云`。 在本章中，您将学习如何添加一个存储提供商来使用这些服务。

## 本地

使用 `本地` 类型， `Client ID`， `Client secret` `Endpoint` 和 `Bucket` 已不再需要，您可以 **随意填写**, 并且它 **不能为空**。

您唯一需要配置的项目是 `Domain` 字段。 请遵循格式：

```text
Domain/images
```

例如， `http://127.0.0.1:7001/images`, `http://door.casbin.org/images` 都是允许的。

但是 `127.0.0.1:7001/images` 是错误的。

## 云端

目前我们支持 `AWS S3` and `阿里云 OSS` 云供应商，并且正在添加更多云存储服务。

用 `Client ID`, `Client secret`, 填写相应字段 `Endpoint` 和 `Bucket` 从您的云端供应商控制台获得。

::::tip

使用 `非区域` 类型，您可能不需要用于自定义域的 `Domain` 字段。

:::

### 示例：

:::note

这里我使用 **阿里云 OSS** 作为示例

:::

AccessKey 是您访问阿里云 API 的密钥，拥有完全的帐户权限。

所以 [在阿里云工作台中创建了 AccessKey](https://help.aliyun.com/document_detail/53045.html)

然后创建 OSS 服务：

![创建 OSS](/img/providers/createaliyunoss.png)

在 Casdoor 填写必要的信息并保存：

![OSS](/img/providers/storage/oss.png)

然后您可以在应用程序中使用阿里云云存储服务。