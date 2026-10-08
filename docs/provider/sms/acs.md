---
title: Send SMS with Azure Communication Services
sidebar_label: Azure ACS
description: Use Azure Communication Services (ACS) as the SMS provider of Casdoor.
keywords: [ACS, SMS, provider, Azure]
authors: [UsherFall]
---

This guide explains how to send the verification codes of Casdoor by SMS through Azure Communication Services (ACS).

---

#### Learning outcomes

- Get a token, a phone number, and the endpoint from Azure.
- Add Azure ACS as an SMS provider in Casdoor and test it.

#### What you need

- An Azure Communication Services resource with a phone number
- Administrator access to the Casdoor admin console

---

## Get the credentials

1. In your Communication Services resource, create a user access token.

   ![User access token in Azure](/img/providers/sms/azureToken.png)

1. Note a phone number that is provisioned in the resource.

   ![Phone number in Azure](/img/providers/sms/azurePhone.png)

1. Copy the endpoint URL of the resource.

   ![Endpoint of the resource](/img/providers/sms/azureUrl.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SMS` and **Type** to `Azure ACS`.
1. Fill in the fields:

   | Casdoor field   | Azure ACS / meaning      | Required |
   |-----------------|--------------------------|----------|
   | Client secret   | User Access Token (Communication Service) | Yes  |
   | Sender number   | Phone number from Communication Service   | Yes  |
   | Provider Url    | Communication Service endpoint            | Yes  |
   | Template code   | Message template / body  | Yes  |

   ![Azure ACS SMS provider in Casdoor](/img/providers/sms/azureProvider.png)

1. Save the provider.

## Verify the result

Enter a phone number in **SMS Test** and send a test message.

## See also

- [SMS providers](/docs/provider/sms/overview)
- [Send email with Azure Communication Services](/docs/provider/email/azureACS)
