---
title: Azure ACS
description: Using ACS as a SMS provider for Casdoor
keywords: [ACS, SMS, provider]
authors: [UsherFall]
---

## Obtain the necessary information in Azure

There are four required fields. `Client secret`, `Sender number`, `Template code`, `Provider Url`. I will show you how to obtain these infomations from Azure ACS.

- `Client secret

In Communication Service, you can create User Access Token which is the `Client secret` in Casdoor.

![azureToken.png](/img/providers/sms/azureToken.png)

- Sender number

`Sender number` is the phone number you create in Communication Service

![azurePhone.png](/img/providers/sms/azurePhone.png)

- Provider Url

`Provider Url` is the endpoint in Communication Service

![azureUrl.png](/img/providers/sms/azureUrl.png)

### Config Casdoor provider

The `template code` is the message you want to send. Enter your phone number in `SMS Test` to test.

![azureProvider.png](/img/providers/sms/azureProvider.png)
