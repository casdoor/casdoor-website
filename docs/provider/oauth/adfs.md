---
title: AD FS
description: Add AD FS as a third party service to complete authentication
keywords: [AD FS, ADFS, Active Directory Federation Services]
---

To set up Active Directory Federation Service, please read the [ADFS](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) for the basic knowledge about the ADFS and 
[AD FS Deployment Guide](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/deployment/ad-fs-deployment-guide) for how to set up a AD FS server. Do ensure that you have a fully operational AD FS server before you move on to further steps.

### Step1 Enabling Oauth via AD FS

See [Enabling Oauth Confidential Clients with AD FS](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/development/enabling-oauth-confidential-clients-with-ad-fs) for details about creating an app step by step.

By the time you finish this step, you should have acquired clientId and clientSecret like this
![Create Baidu APP](/img/providers/OAuth/adfsconfidential1.png)
![Create Baidu APP](/img/providers/OAuth/adfsconfidential2.png)

In which the Client Identifier in first picture and the Secret in the second picture are supposed to be clientId and clientSecret in Oauth.

## Enable Casdoor AD FS Provider

Add a AD FS provider and fill the ```Client ID``` and ```Client Secrets``` in your Casdoor.

![Create Baidu APP](/img/providers/OAuth/adfscasdoor.png)
