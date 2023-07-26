---
title: Overview
description: Using SMS to complete authentication
keywords: [SMS]
authors: [kininaru]
---

We use [casdoor/go-sms-sender](https://github.com/casdoor/go-sms-sender) to send SMS for Casdoor. Now, `go-sms-sender` supports **Twilio, Submail, SmsBao, Alibaba Cloud, Tencent Cloud, Huawei Cloud** and **Volc** SMS APIs. You can raise an issue, or make a pull request if you want to support other SMS providers.

## Add a SMS provider

1. Click `Add` to add a new provider.
2. Select `SMS` in `Category`

   ![Select Category](/img/providers/sms/selectCategory.png)

3. Select your provider type

   ![Select Type](/img/providers/sms/selecttype.png)

4. Get your information from SMS provider and fill them out.
