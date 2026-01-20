---
title: Alibaba Cloud OSS
description: Using Alibaba Cloud OSS as a storage provider for Casdoor
keywords: [Alibaba Cloud OSS, storage, provider, RRSA, RAM roles]
authors: [leo220yuyaodog]
---

Casdoor supports Alibaba Cloud OSS (Object Storage Service) for file storage, offering two authentication methods: static credentials and RRSA (RAM Roles for Service Accounts).

## Authentication Methods

### Using Static Credentials

The traditional approach uses an AccessKey to authenticate with Alibaba Cloud API. This requires full account permissions and is suitable for most deployment scenarios.

To create an AccessKey, follow the instructions in the [Alibaba Cloud workbench](https://help.aliyun.com/document_detail/53045.html).

Create the OSS service:

![Create OSS](/img/providers/createaliyunoss.png)

Fill in the necessary information in Casdoor and save:

![OSS](/img/providers/storage/oss.png)

### Using RRSA (RAM Roles for Service Accounts)

RRSA enables zero-credential authentication by exchanging OIDC tokens for temporary STS credentials. This is particularly useful in Kubernetes environments where managing static credentials becomes cumbersome.

When running Casdoor in an environment that provides OIDC tokens (like Alibaba Cloud ACK with RRSA enabled), you can authenticate without storing long-term credentials. Simply set the following environment variables:

```bash
ALIBABA_CLOUD_ROLE_ARN=acs:ram::YOUR_ACCOUNT_ID:role/YOUR_ROLE_NAME
ALIBABA_CLOUD_OIDC_PROVIDER_ARN=acs:ram::YOUR_ACCOUNT_ID:oidc-provider/YOUR_PROVIDER_NAME
ALIBABA_CLOUD_OIDC_TOKEN_FILE=/var/run/secrets/tokens/oidc-token
```

In the Casdoor storage provider configuration, leave the Client ID and Client Secret fields empty or set them to `rrsa`. Casdoor will automatically detect the RRSA environment and handle authentication using the OIDC token.

If RRSA credentials cannot be obtained, Casdoor gracefully falls back to static credentials, ensuring your application continues to work even during configuration changes.

:::tip

For production deployments in Alibaba Cloud ACK, RRSA is the recommended approach as it eliminates credential management overhead and enhances security through short-lived tokens.

:::

You can now use Alibaba Cloud storage services in your application with improved security and flexibility.
