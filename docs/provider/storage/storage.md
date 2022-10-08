---
title: Storage
description: Set up a storage provider for upload files in Casdoor
keywords: [storage, provider]
---

If you need to use file storage services such as `avatar upload`, you need to set up a storage provider and apply it in your `application`.

Casdoor supports two types of storage, `Local` and `Cloud`. In this chapter you will learn how to add a storage provider to use these services.

## Local

With `Local` type, the `Client ID`, `Client secret`, `Endpoint` and `Bucket` field are no longer needed, you can **fill in it at will**, and it **cannot be empty**.

The only item that you need to configure is `Domain` field. Please follow the format:

```
Domain/images
```

For example, `http://127.0.0.1:7001/images`, `http://door.casbin.org/images` are all allowed.

But `127.0.0.1:7001/images` is wrong.

## Cloud-Based

Currently we support `AWS S3` and `Aliyun OSS` cloud vendors, and are adding more Cloud storage services.

Fill in the corresponding fields with `Client ID`, `Client secret`, `Endpoint` and `Bucket` obtained from your cloud vendor console.

:::tip

With `Non-local` type, you probably don’t need the `Domain` field, which is used for custom domain.

:::

### Example

:::note

Here, I use **Aliyun OSS** as an example

:::

The AccessKey is your key to access Aliyun API, with full account permissions.

So [created AccessKey](https://help.aliyun.com/document_detail/53045.html) in Aliyun workbench.

Then create OSS service:

![Create OSS](/img/providers/createaliyunoss.png)

Fill the necessary information in Casdoor and save:

![OSS](/img/providers/storage/oss.png)

Then you can use Aliyun cloud storage services in your application.