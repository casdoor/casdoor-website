---
title: Alibaba Cloud IDaaS SAML
description: Use Alibaba Cloud IDaaS (EIAM) as a SAML IdP for Casdoor.
keywords: [Alibaba Cloud IDaaS, SAML, EIAM]
authors: [seriouszyx]
---

## Create SAML application in Alibaba Cloud IDaaS

Login to the [Alibaba Cloud management console](https://account.aliyun.com/), search and go to the Application Indentity Service (IDentity-as-a-Service, IDaaS).

![Alibaba Cloud IDaaS](/img/providers/SAML/aliyun.png)

Click **EIAM Instance List** and open the free version.

![Alibaba Cloud EIAM](/img/providers/SAML/aliyun_eiam.png)

An instance will be created and run automatically after opening. Click on the instance name or the **Manage** button to enter the IDaaS management console.

![Alibaba Cloud EIAM List](/img/providers/SAML/aliyun_eiam_list.png)

After entering the IDaaS management console, click **Add Application**, search for **SAML**, and click **Add Application**.

![Add Alibaba Cloud SAML](/img/providers/SAML/aliyun_saml_add.png)

Click **Add SigningKey**.

![Add Signing Key](/img/providers/SAML/aliyun_saml_signingkey.png)

Fill in all required information and submit.

![Fill in Signing Key](/img/providers/SAML/aliyun_saml_signingkey_input.png)

Select the added SigningKey.

![Select added Signing Key](/img/providers/SAML/aliyun_saml_signingkey_select.png)

Fill in all the required information below and submit.

- IDP IdentityId: Keep the same as Issuer URL in Casdoor.
- SP Entity ID & SP ACS URL (SSO Location): Use placeholders for now; after configuring Casdoor, set both to `https://<your-casdoor-domain>/api/acs`.
- Assertion Attribute: Directly fill in as username.
- Account Association Mode: Account Association

:::note

The ACS URL (`/api/acs`) only accepts POST requests. Ensure your IdP is configured to use HTTP POST binding.

:::

![Update information of Signing Key](/img/providers/SAML/aliyun_saml_signingkey_update.png)

## Account authorization & association

After the application is successfully added, an authorization prompt will pop up. Do not authorize it now, add an account and then authorize it.

Go to **Organizations and Groups** and click on **New Account**.

![Add account](/img/providers/SAML/aliyun_account.png)

Fill in all required information and submit.

![Fill in account information](/img/providers/SAML/aliyun_account_add.png)

Go to **Application Authorization**, select the accounts you want to authorize and click **Save**.

![Account authorizationn](/img/providers/SAML/aliyun_account_authorization.png)

Go to the **Application List**, click **View application sub-accounts**, and then click **Add account association**.

![View sub-account](/img/providers/SAML/aliyun_subaccount_view.png)
![Add sub-account](/img/providers/SAML/aliyun_subaccount_add.png)

Fill in the primary and sub accounts that need to be associated and click **Save**.

The primary account exists in IDaaS, and the sub account is the ID of the user in Casdoor.

![Associate](/img/providers/SAML/aliyun_subaccount_input.png)

## Export IDaaS Metadata

Go to the **Application List**, click **View Application Details** and click **Export IDaaS SAML Metadata**.

![Export](/img/providers/SAML/aliyun_saml_metadata.png)

## Configure in Casdoor

Create a new provider in Casdoor.

Set **Category** to **SAML**, **Type** to **Alibaba Cloud IDaaS**. Copy the content of metadata and paste it to the **Metadata** input. The values of **Endpoint**, **IdP** and **Issuer URL** will be generated automatically after clicking the **Parse** button.

![Casdoor provider](/img/providers/SAML/aliyun_casdoor.png)

Copy the **SP ACS URL** and the **SP Entity ID** and click the **Save** button.

Edit the application you want to configure in Casdoor. Select the provider just added and click the button **Save**.

![Add provider for app](/img/providers/SAML/aliyun_casdoor_provider.png)

## Modify SAML application in Alibaba Cloud IDaaS

Disable the application and then click **Modify Application**.

![Modify SAML app](/img/providers/SAML/aliyun_saml_modify.png)

Fill in **SP Entity ID** and **SP ACS URL(SSO Location)** with the content copied in Casdoor. Submit and enable application.

![Modify SAML app](/img/providers/SAML/aliyun_saml_modify_input.png)

## Test

Open the application’s login page; an IDaaS icon appears. Click it to sign in via Alibaba Cloud IDaaS; after success you are logged into Casdoor.

![Casdoor login](/img/providers/SAML/aliyun_casdoor_login.gif)
