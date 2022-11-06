---
title: Overview
description: Set up a storage provider for upload files in Casdoor
keywords: [storage, provider]
---

If you need to use file storage services such as `avatar upload`, you need to set up a storage provider and apply it in your `application`.

Casdoor supports two types of storage, **Local** and **Cloud**. In this chapter you will learn how to add a storage provider to use these services.

## Item

- `Client ID`
- `Client secret`
- `Endpoint`
- `Path perfix`: Path prefix for the file location.

:::info

Default `Path perfix` is `/`. For example, when the `Path perfix` is empty, a default file path:

```text
https://cdn.casbin.com/casdoor/avatar.png
```

You can fill it with `abcd/xxxx`, and then you can store your avatar in:

```text
https://cdn.casbin.com/abcd/xxxx/casdoor/avatar.png
```

:::

- `Bucket`
- `Domain`: The custom domain name of CDN for your cloud storage.

## Local

With **Local** type, the only item that you need to configure is `Domain` field. Please follow the format:

```text
Domain/images
```

For example, `http://127.0.0.1:7001/images`, `http://door.casbin.org/images` are all allowed.

But `127.0.0.1:7001/images` is wrong.

The `Client ID`, `Client secret`, `Endpoint` and `Bucket` field are no longer needed, you can **fill in it at will**, and it **cannot** be empty.

## Cloud-Based

Currently, we support **AWS S3**, **Aliyun OSS**, **Tencent Cloud COS**, **MinIO** and **Azure Blob** cloud vendors, and are adding more Cloud storage services.

Fill in the corresponding fields with `Client ID`, `Client secret`, `Endpoint` and `Bucket` obtained from your cloud vendor console.

:::tip

With `Non-local` type, you probably don’t need the `Domain` field, which is used for custom domain.

:::
