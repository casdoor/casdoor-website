---
title: Send email with Azure Communication Services
sidebar_label: Azure ACS
description: Use Azure Communication Services (ACS) as the email provider of Casdoor.
keywords: [email, Azure ACS, Communication Services]
authors: [UsherFall]
---

This guide explains how to send the emails of Casdoor through [Azure Communication Services](https://learn.microsoft.com/en-us/azure/communication-services/) (ACS).

---

#### Learning outcomes

- Prepare an Email Communication Service with a verified domain.
- Add Azure ACS as an email provider in Casdoor.

#### What you need

- An Azure subscription
- Administrator access to the Casdoor admin console

---

## Prepare Azure Communication Services

1. [Create an Email Communication Service](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/create-email-communication-resource).
1. Add a domain: a [free Azure managed domain](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/add-azure-managed-domains) or a [custom domain](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/add-custom-verified-domains).
1. [Connect the domain](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/connect-email-communication-resource?pivots=azure-portal) to your Communication Services resource.
1. Copy the endpoint and the key of the resource.

   ![Endpoint and key of the resource](/img/providers/azureACS_info.png)

## Add the provider in Casdoor {#configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `Azure ACS`.
1. Fill in the fields:

   | Casdoor     | Azure ACS   |
   |-------------|-------------|
   | From Address| Verified sender (must use a verified domain) |
   | Secret key  | Private Key  |
   | Host        | Endpoint    |

   The **From address** must belong to a verified domain in ACS.

   ![Azure ACS provider in Casdoor](/img/providers/azureACS_provider.png)

1. Save the provider.

<video src="/video/provider/email/use_azureACS_as_email_provider.mp4" controls="controls" width="100%"></video>

## See also

- [Email providers](/docs/provider/email/overview)
- [Azure Communication Services SMS](/docs/provider/sms/acs)
