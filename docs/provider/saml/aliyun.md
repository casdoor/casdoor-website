---
title: Aliyun IDaaS
description: Using Aliyun IDaaS to authenticate users
keywords: [Aliyun IDaaS]
authors: [seriouszyx]
---

## Create SAML application in Aliyun IDaaS

Login to the [Aliyun management console](https://account.aliyun.com/), search and go to the Application Indentity Service (IDentity-as-a-Service, IDaaS).

![Aliyun IDaaS](/img/providers/SAML/aliyun.png)

Click **EIAM Instance List** and open the free version.

![Aliyun EIAM](/img/providers/SAML/aliyun_eiam.png)

An instance will be created and run automatically after opening. Click on the instance name or the **Manage** button to enter the IDaaS management console.

![Aliyun EIAM List](/img/providers/SAML/aliyun_eiam_list.png)

After entering the IDaaS management console, click **Add Application**, search for **SAML**, and click **Add Application**.

![Add Aliyun SAML](/img/providers/SAML/aliyun_saml_add.png)

Click **Add SigningKey**.

![Add Signing Key](/img/providers/SAML/aliyun_saml_signingkey.png)

Fill in all required information and submit.

![Fill in Signing Key](/img/providers/SAML/aliyun_saml_signingkey_input.png)

Select the added SigningKey.

![Select added Signing Key](/img/providers/SAML/aliyun_saml_signingkey_select.png)

Fill in all the required information below and submit.

- IDP IdentityId: Keep the same as Issuer URL in Casdoor.
- SP Entity ID & SP ACS URL(SSO Location): Now fill in whatever you want. After completing the configuration of Casdoor, you need to come to modify.
- Assertion Attribute: Directly fill in as username.
- Account Association Mode: Account Association

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

Go to the **Application List**, click **View Application Details** and click **Export IDaaS SAML Metadadta**.

![Export](/img/providers/SAML/aliyun_saml_metadata.png)

## Configure in Casdoor

Create a new provider in Casdoor.

Select category as **SAML**, type as **Aliyun IdaaS**. Copy the content of metadata and paste it to the **Metadata** input. The values of **Endpoint**, **IdP** and **Issuer URL** will be generated automatically after clicking the **Parse** button.

![Casdoor provider](/img/providers/SAML/aliyun_casdoor.png)

Copy the **SP ACS URL** and the **SP Entity ID** and click the **Save** button.

Edit the application you want to configure in Casdoor. Select the provider just added and click the button **Save**.

![Add provider for app](/img/providers/SAML/aliyun_casdoor_provider.png)

## Modify SAML application in Aliyun IDaaS

Disable the application and then click **Modify Application**.

![Modify SAML app](/img/providers/SAML/aliyun_saml_modify.png)

Fill in **SP Entity ID** and **SP ACS URL(SSO Location)** with the content copied in Casdoor. Submit and enable application.

![Modify SAML app](/img/providers/SAML/aliyun_saml_modify_input.png)

## Validate the effect

Go to the application you just configured and you can find that there is an icon in the login page.

Click the icon and jump to the Aliyun IDaaS login page, and then successfully login to the Casdoor after authentication.

![Casdoor login](/img/providers/SAML/aliyun_casdoor_login.gif)
