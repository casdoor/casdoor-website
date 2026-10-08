---
title: Add Alibaba Cloud IDaaS as a SAML provider
sidebar_label: Alibaba Cloud IDaaS
description: Let users of Alibaba Cloud IDaaS (EIAM) sign in to Casdoor through SAML.
keywords: [Alibaba Cloud IDaaS, SAML, EIAM]
authors: [seriouszyx]
---

This guide explains how to let the users of Alibaba Cloud IDaaS (EIAM) sign in to Casdoor through SAML.

---

#### Learning outcomes

- Create a SAML application in IDaaS and associate its accounts with Casdoor users.
- Add Alibaba Cloud IDaaS as a SAML provider in Casdoor.

#### What you need

- An Alibaba Cloud account
- Administrator access to the Casdoor admin console

---

## Create a SAML application in IDaaS {#create-saml-application-in-alibaba-cloud-idaas}

1. In the [Alibaba Cloud console](https://account.aliyun.com/), open IDaaS (Identity as a Service).

   ![IDaaS in the console](/img/providers/SAML/aliyun.png)

1. Click **EIAM Instance List** and open the free version. Alibaba Cloud creates and starts an instance.

   ![EIAM instances](/img/providers/SAML/aliyun_eiam.png)

1. Click the name of the instance, or **Manage**, to open the IDaaS console.

   ![EIAM instance list](/img/providers/SAML/aliyun_eiam_list.png)

1. Click **Add Application**, search for **SAML**, and click **Add Application**.

   ![SAML application template](/img/providers/SAML/aliyun_saml_add.png)

1. Click **Add SigningKey**, fill in the form, and submit. Then select the new signing key.

   ![Add SigningKey](/img/providers/SAML/aliyun_saml_signingkey.png)

   ![SigningKey form](/img/providers/SAML/aliyun_saml_signingkey_input.png)

   ![SigningKey selection](/img/providers/SAML/aliyun_saml_signingkey_select.png)

1. Fill in the application and submit:

   | Field | Value |
   |---|---|
   | IDP IdentityId | The same value as **Issuer URL** in Casdoor |
   | SP Entity ID, SP ACS URL (SSO Location) | Placeholders for now. You replace them after configuring Casdoor |
   | Assertion Attribute | `username` |
   | Account Association Mode | Account Association |

   ![Application settings](/img/providers/SAML/aliyun_saml_signingkey_update.png)

## Associate accounts {#account-authorization--association}

After the application is added, IDaaS asks you to authorize it. Don't authorize it yet.

1. Go to **Organizations and Groups**, click **New Account**, fill in the form, and submit.

   ![New Account](/img/providers/SAML/aliyun_account.png)

   ![Account form](/img/providers/SAML/aliyun_account_add.png)

1. Go to **Application Authorization**, select the accounts to authorize, and click **Save**.

   ![Application Authorization](/img/providers/SAML/aliyun_account_authorization.png)

1. Go to the **Application List**, click **View application sub-accounts**, and then **Add account association**.

   ![Sub-accounts of the application](/img/providers/SAML/aliyun_subaccount_view.png)

   ![Add account association](/img/providers/SAML/aliyun_subaccount_add.png)

1. Enter the primary account, which exists in IDaaS, and the sub-account, which is the ID of the user in Casdoor. Click **Save**.

   ![Account association form](/img/providers/SAML/aliyun_subaccount_input.png)

## Export the metadata {#export-idaas-metadata}

In the **Application List**, click **View Application Details** and **Export IDaaS SAML Metadata**.

![Export IDaaS SAML Metadata](/img/providers/SAML/aliyun_saml_metadata.png)

## Add the provider in Casdoor {#configure-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SAML` and **Type** to `Aliyun IDaaS`.
1. Paste the metadata into **Metadata** and click **Parse**. Casdoor fills in **Endpoint**, **IdP**, and **Issuer URL**.

   ![Alibaba Cloud IDaaS provider in Casdoor](/img/providers/SAML/aliyun_casdoor.png)

1. Copy the **SP ACS URL** and the **SP Entity ID**, and save the provider.
1. Open the edit page of your application, add the provider on the **Providers** tab, and save.

   ![Provider in the application](/img/providers/SAML/aliyun_casdoor_provider.png)

## Complete the IDaaS application {#modify-saml-application-in-alibaba-cloud-idaas}

1. In IDaaS, disable the application and click **Modify Application**.

   ![Modify Application](/img/providers/SAML/aliyun_saml_modify.png)

1. Enter the **SP Entity ID** and the **SP ACS URL (SSO Location)** that you copied from Casdoor. The ACS URL accepts only `POST`.

   ![SP values in IDaaS](/img/providers/SAML/aliyun_saml_modify_input.png)

1. Submit and enable the application.

## Verify the result {#test}

Open the sign-in page of the application and click the IDaaS button. After you sign in at IDaaS, you are signed in to Casdoor.

![Recording of the sign-in through IDaaS](/img/providers/SAML/aliyun_casdoor_login.gif)

## See also

- [SAML providers](/docs/provider/saml/overview)
