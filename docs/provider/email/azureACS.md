---
title: Azure ACS
description: Using Azure ACS as the email provider
keywords: [email, Azure ACS]
authors: [UsherFall]
---

In this guide, we will be using ACS as the Email Provider.

### Step 1: Config ACS

Follow the documentation below, complete configuration.
- [Create and manage Email Communication Service](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/create-email-communication-resource)
- [Get a free Azure managed domain](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/add-azure-managed-domains) or [Add a custom domain](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/add-custom-verified-domains)
- [Connect domain](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/connect-email-communication-resource?pivots=azure-portal)

Copy your `Endpoint` and `Private Key` for usage

![azureACS_info](/img/providers/azureACS_info.png)

### Step 2: Configure Casdoor email Provider

Now create an email provider in Casdoor, fill in the necessary information. The relationship between the fields and Slack is as follows:

:::note

`From Address` must be a verified email domain.

:::

| Name         | Name in Azure ACS |
|--------------|-------------------|
| From Address |                   |
| App ID       | Private Key       |
| Host         | Endpoint          |

![azureACS_provider](/img/providers/azureACS_provider.png)

<video src="/video/provider/email/use_azureACS_as_email_provider.mp4" controls="controls" width="100%"></video>
