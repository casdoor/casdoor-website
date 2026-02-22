---
title: Azure Communication Services email
description: Use Azure Communication Services (ACS) as the email provider.
keywords: [email, Azure ACS, Communication Services]
authors: [UsherFall]
---

Use [Azure Communication Services](https://learn.microsoft.com/en-us/azure/communication-services/) for sending email. Complete:

- [Create and manage Email Communication Service](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/create-email-communication-resource)
- [Get a free Azure managed domain](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/add-azure-managed-domains) or [Add a custom domain](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/add-custom-verified-domains)
- [Connect domain](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/connect-email-communication-resource?pivots=azure-portal)

Copy your **Endpoint** and **Private Key** from the resource.

![azureACS_info](/img/providers/azureACS_info.png)

## Configure the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Email**, **Type** to the option for Azure ACS. Map:

| Casdoor     | Azure ACS   |
|-------------|-------------|
| From Address| Verified sender (must use a verified domain) |
| Secret key  | Private Key  |
| Host        | Endpoint    |

:::note
**From Address** must use a verified email domain in ACS.
:::

![azureACS_provider](/img/providers/azureACS_provider.png)

<video src="/video/provider/email/use_azureACS_as_email_provider.mp4" controls="controls" width="100%"></video>
