---
title: Add AD FS as an OAuth provider
sidebar_label: AD FS
description: Let users sign in to Casdoor with their account in Active Directory Federation Services (AD FS).
keywords: [AD FS, ADFS, Active Directory Federation Services]
authors: [ComradeProgrammer]
---

This guide explains how to let users sign in to Casdoor with their account in Active Directory Federation Services (AD FS).

---

#### Learning outcomes

- Register Casdoor as an OAuth confidential client in AD FS.
- Add AD FS as an OAuth provider in Casdoor.

#### What you need

- A running AD FS server. See the [AD FS documentation](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) and the [AD FS deployment guide](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/deployment/ad-fs-deployment-guide).
- Administrator access to the Casdoor admin console

---

## Register Casdoor in AD FS {#enable-oauth-confidential-client-in-ad-fs}

1. Register an application as described in [Enabling OAuth Confidential Clients with AD FS](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/development/enabling-oauth-confidential-clients-with-ad-fs).

   ![Registration of a confidential client in AD FS](/img/providers/OAuth/adfsconfidential1.png)

   ![Client secret of the confidential client](/img/providers/OAuth/adfsconfidential2.png)

1. Copy the client identifier and the client secret.

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `AD FS`.
1. Enter the client identifier as the **Client ID** and the secret as the **Client secret**.

   ![AD FS provider in Casdoor](/img/providers/OAuth/adfscasdoor.png)

1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
