---
title: Store files in Alibaba Cloud OSS
sidebar_label: Alibaba Cloud OSS
description: Store uploaded files in Alibaba Cloud OSS with an AccessKey or with RAM Roles for Service Accounts (RRSA).
keywords: [Alibaba Cloud OSS, storage, RRSA, RAM]
authors: [leo220yuyaodog]
---

This guide explains how to store the uploaded files of Casdoor in Alibaba Cloud OSS. Casdoor authenticates with a static AccessKey, or with RAM Roles for Service Accounts (RRSA) in environments that provide OpenID Connect (OIDC) tokens, such as Alibaba Cloud ACK.

---

#### Learning outcomes

- Add Alibaba Cloud OSS as a storage provider with an AccessKey.
- Use RRSA instead of stored credentials.

#### What you need

- An Alibaba Cloud account and an OSS bucket
- Administrator access to the Casdoor admin console

---

## Use an AccessKey {#static-credentials}

1. Create an AccessKey in the [Alibaba Cloud console](https://help.aliyun.com/document_detail/53045.html).

   ![AccessKey creation](/img/providers/createaliyunoss.png)

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Storage` and **Type** to `Aliyun OSS`.
1. Fill in the AccessKey ID as the **Client ID** and the AccessKey Secret as the **Client secret**, and set **Endpoint**, **Bucket**, and **Region ID**.

   ![Alibaba Cloud OSS provider in Casdoor](/img/providers/storage/oss.png)

1. Save the provider.

## Use RRSA {#rrsa-no-long-term-credentials}

With RRSA, Casdoor stores no long-lived secret and uses short-lived tokens. This is the recommended setup on Alibaba Cloud ACK.

1. Set the following environment variables for Casdoor, with the values from the [RAM console](https://ram.console.aliyun.com/):

   ```bash
   ALIBABA_CLOUD_ROLE_ARN=acs:ram::YOUR_ACCOUNT_ID:role/YOUR_ROLE_NAME
   ALIBABA_CLOUD_OIDC_PROVIDER_ARN=acs:ram::YOUR_ACCOUNT_ID:oidc-provider/YOUR_PROVIDER_NAME
   ALIBABA_CLOUD_OIDC_TOKEN_FILE=/var/run/secrets/tokens/oidc-token
   ```

1. In the storage provider, leave **Client ID** and **Client secret** empty.

Casdoor then exchanges the OIDC token for temporary credentials. If RRSA isn't available, Casdoor uses the static credentials.

## See also

- [Storage providers](/docs/provider/storage/overview)
- [Host the frontend files on a CDN](/docs/deployment/deploy-cdn)
