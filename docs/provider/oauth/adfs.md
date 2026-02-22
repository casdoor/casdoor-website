---
title: AD FS OAuth
description: Add AD FS (Active Directory Federation Services) as an OAuth provider.
keywords: [AD FS, ADFS, Active Directory Federation Services]
authors: [ComradeProgrammer]
---

You need a working AD FS server. See the [AD FS documentation](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) and [AD FS deployment guide](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/deployment/ad-fs-deployment-guide).

## Enable OAuth confidential client in AD FS

Follow [Enabling OAuth Confidential Clients with AD FS](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/development/enabling-oauth-confidential-clients-with-ad-fs) to register an app and obtain a **client ID** and **client secret**.

![AD FS confidential client](/img/providers/OAuth/adfsconfidential1.png)
![AD FS confidential client](/img/providers/OAuth/adfsconfidential2.png)

Use the client identifier as **Client ID** and the secret as **Client secret** in Casdoor.

## Add the provider in Casdoor

**Providers** → **Add**. Set **Category** to **OAuth**, **Type** to **AD FS**. Enter the **Client ID** and **Client secret** from AD FS.

![AD FS provider in Casdoor](/img/providers/OAuth/adfscasdoor.png)
