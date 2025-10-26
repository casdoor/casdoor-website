---
title: Overview
description: Using SMS for authentication
keywords: [SMS]
authors: [kininaru]
---

We use [casdoor/go-sms-sender](https://github.com/casdoor/go-sms-sender) to send SMS for Casdoor. The `go-sms-sender` library currently supports Twilio, Submail, SmsBao, Alibaba Cloud, Tencent Cloud, Huawei Cloud, and Volc SMS APIs. If you want to add support for other SMS providers, you can either raise an issue or submit a pull request.

## Adding an SMS provider

1. Click on `Add` to add a new provider.
2. Select `SMS` in the `Category` section.

   ![Select Category](/img/providers/sms/selectCategory.png)

3. Choose the type of your provider.

   ![Select Type](/img/providers/sms/selecttype.png)

4. Retrieve the necessary information from your SMS provider and fill out the corresponding fields.

## Proxy configuration

For SMS providers that use HTTP APIs (such as Custom HTTP SMS), you can enable proxy support if your server cannot directly access the SMS service. When enabled, SMS traffic will be routed through the SOCKS5 proxy configured in Casdoor's configuration file.

To enable proxy support, toggle the `Enable proxy` switch in the provider settings. This option is available for Custom HTTP SMS providers and helps when operating in restricted network environments.
