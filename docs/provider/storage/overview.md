---
title: Overview
description: Set up a storage provider for upload files in Casdoor
keywords: [storage, provider]
authors: [leo220yuyaodog]
---

If you need to use file storage services such as `avatar upload`, you need to set up a storage provider and apply it in your `application`.

Casdoor supports two types of storage, **Local** and **Cloud**. In this chapter you will learn how to add a storage provider to use these services.

## Item

- `Client ID`: A unique identifier provided by the cloud storage provider.
- `Client secret`: A secure value known only to Casdoor and the cloud storage service.
- `Endpoint`: The public URL or domain of the cloud storage service.
- `Endpoint (Intranet)`: The internal or private URL or domain of the cloud storage service.
- `Path prefix`: Path prefix for the file location.

:::info

Default `Path prefix` is `/`. For example, when the `Path prefix` is empty, a default file path:

```text
https://cdn.casbin.com/casdoor/avatar.png
```

You can fill it with `abcd/xxxx`, and then you can store your avatar in:

```text
https://cdn.casbin.com/abcd/xxxx/casdoor/avatar.png
```

:::

- `Bucket`: A container used for storing files and data.
- `Domain`: The custom domain name of CDN for your cloud storage.
- `Region ID`: An identifier used to specify the data center region where the cloud storage service is located

## Local

We support uploading files to the local system.

## Cloud

We support **AWS S3**, **Azure Blob Storage**, **MinIO**, **Alibaba Cloud OSS**, **Tencent Cloud COS** and are adding more Cloud storage services.
