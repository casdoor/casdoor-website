---
title: AD FS
description: Add AD FS as a third-party service to complete authentication.
keywords: [AD FS, ADFS, Active Directory Federation Services]
authors: [ComradeProgrammer]
---

To set up Active Directory Federation Service, please refer to the [AD FS documentation](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) for a basic understanding of ADFS, and consult the [AD FS Deployment Guide](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/deployment/ad-fs-deployment-guide) for instructions on setting up an AD FS server. Ensure that you have a fully operational AD FS server before proceeding to the next steps.

### Step 1: Enabling OAuth via AD FS

For detailed instructions on creating an app step by step, refer to the [Enabling OAuth Confidential Clients with AD FS](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/development/enabling-oauth-confidential-clients-with-ad-fs) guide.

By the end of this step, you should have obtained a client ID and client secret as shown in the following screenshots:

![Create Baidu APP](/img/providers/OAuth/adfsconfidential1.png)
![Create Baidu APP](/img/providers/OAuth/adfsconfidential2.png)

The client identifier in the first picture and the secret in the second picture should be used as the client ID and client secret in the OAuth setup.

## Enabling Casdoor AD FS Provider

Add an AD FS provider and enter the "Client ID" and "Client Secret" in your Casdoor settings.

![Create Baidu APP](/img/providers/OAuth/adfscasdoor.png)
