---
title: Alibaba Cloud FaceBody
description: Add libaba Cloud FaceBody as a third-party faceid service to complete authentication
keywords: [libaba Cloud FaceBody]
authors: [dacongda]
---

## Introduction

Based on face detection, analysis/comparison technology in images or videos, and human body detection technology, it provides independent modules for face/human body detection and localization, face attribute recognition and face comparison. It can provide developers and enterprises with high-performance online API services for various scenarios such as face AR, biometric identification and authentication, large-scale face retrieval, and photo management.

## How to use?

The steps to use alibaba cloud facebody are shown below.

### Step1: Register alibaba cloud facebody

First, visit [Alibaba Cloud Facebody website](https://vision.aliyun.com/facebody) and open a facebody account.

![alibaba_cloud_faceid_register.png](/img/providers/faceid/alibaba_cloud_faceid_register.png)

### Step 2: Create a client secret

Go to console and create AccessKey and AccessSecret

![alibaba_cloud_faceid_accesskey.png](/img/providers/faceid/alibaba_cloud_faceid_accesskey.png)


![alibaba_cloud_faceid_accesskey.png](/img/providers/faceid/alibaba_cloud_faceid_create_accesskey.png)


### Step 3: Find Endpoint

You can find your endpoint ID in [Aliyun doc](https://help.aliyun.com/document_detail/40654.html)


### Step 4: Create Alibaba Cloud Facebody provider in Casdoor

The last step is to add an Alibaba Cloud Facebody Face ID provider and fill in the `Client ID`, `Client Secret` and `Endpoint` in your Casdoor.