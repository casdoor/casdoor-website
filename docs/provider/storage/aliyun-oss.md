---
title: Alibaba Cloud OSS
description: Use Alibaba Cloud OSS as a Casdoor storage provider (static credentials or RRSA).
keywords: [Alibaba Cloud OSS, storage, RRSA, RAM]
authors: [leo220yuyaodog]
---

Casdoor supports **Alibaba Cloud OSS** with two auth options: **static credentials** (AccessKey) or **RRSA** (RAM Roles for Service Accounts) for environments that provide OIDC tokens (e.g. Alibaba Cloud ACK).

## Static credentials

1. Create an AccessKey in the [Alibaba Cloud console](https://help.aliyun.com/document_detail/53045.html).
2. In Casdoor, create a **Storage** provider, set **Type** to **Alibaba Cloud OSS**, and fill **Client ID** (AccessKey ID), **Client secret** (AccessKey Secret), **Endpoint**, **Bucket**, and **Region** as needed.

![Create OSS](/img/providers/createaliyunoss.png)
![OSS](/img/providers/storage/oss.png)

## RRSA (no long-term credentials)

In environments that provide OIDC tokens (e.g. ACK with RRSA), set these environment variables from your [RAM console](https://ram.console.aliyun.com/):

```bash
ALIBABA_CLOUD_ROLE_ARN=acs:ram::YOUR_ACCOUNT_ID:role/YOUR_ROLE_NAME
ALIBABA_CLOUD_OIDC_PROVIDER_ARN=acs:ram::YOUR_ACCOUNT_ID:oidc-provider/YOUR_PROVIDER_NAME
ALIBABA_CLOUD_OIDC_TOKEN_FILE=/var/run/secrets/tokens/oidc-token
```

In the Casdoor storage provider, leave **Client ID** and **Client secret** empty. Casdoor will use the OIDC token to obtain temporary credentials. If RRSA is unavailable, it falls back to static credentials.

:::tip
For production on Alibaba Cloud ACK, RRSA is recommended: no stored secrets and short-lived tokens.
:::
