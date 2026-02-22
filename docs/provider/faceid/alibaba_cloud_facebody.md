---
title: Alibaba Cloud FaceBody
description: Use Alibaba Cloud FaceBody for face verification.
keywords: [Alibaba Cloud FaceBody, faceid]
authors: [dacongda]
---

Alibaba Cloud FaceBody provides face detection, comparison, and human-body detection via API. It is used for scenarios such as face AR, biometric auth, and photo management.

## 1. Register and enable FaceBody

Sign in at [Alibaba Cloud FaceBody](https://vision.aliyun.com/facebody) and open the service.

![alibaba_cloud_faceid_register.png](/img/providers/faceid/alibaba_cloud_faceid_register.png)

## 2. Purchase CompareFace resource pack

On the [Face Body console](https://vision.console.aliyun.com/cn-shanghai/detail/facebody), purchase a **CompareFace** resource pack.

## 3. Create AccessKey

In the Alibaba Cloud console, create an **AccessKey** and **AccessSecret**. Save both.

![alibaba_cloud_faceid_accesskey.png](/img/providers/faceid/alibaba_cloud_faceid_accesskey.png)
![alibaba_cloud_faceid_accesskey.png](/img/providers/faceid/alibaba_cloud_faceid_create_accesskey.png)

## 4. Get endpoint

Find the endpoint for your region in [Aliyun FaceBody docs](https://help.aliyun.com/document_detail/40654.html). Example: region `cn-shanghai` → endpoint `facebody.cn-shanghai.aliyuncs.com`.

## 5. Create the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Face ID**, **Type** to **Alibaba Cloud FaceBody**. Enter **Client ID** (AccessKey ID), **Client Secret** (AccessSecret), and **Endpoint**. Save and add the provider to your application.
