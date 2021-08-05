---
sidebar_position: 5
title: Storage
---

If you need to use file storage services such as `avatar upload`, you need to set up a storage provider and apply it in your `application`.

Casdoor supports two types of storage, `Local` and `Cloud`. In this chapter you will learn how to add a storage provider to use these services.

## Local

With `Local` type, the `Client ID`, `Client secret`, `Endpoint` and `Bucket` field is no longer needed, you can **fill in it at will**, it **cannot be empty**.

The only item that you need to configure is `Domain` field, please follow the format:

```
Domain/images
```

For example, `http://127.0.0.1:7001/images`, `http://door.casbin.org/images` are all allowed.

But `127.0.0.1:7001/images` is wrong.

## Cloud-Based

Currently we support `AWS s3` and `aliyun` cloud vendors, and are still being added.

Fill in the corresponding fields with `Client ID`, `Client secret`, `Endpoint` and `Bucket` obtained from your cloud vendor console.

:::tip

With `Non-local` type, you probably don’t need the `Domain` field, which is used for custom domain.

:::

