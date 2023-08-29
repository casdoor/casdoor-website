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
