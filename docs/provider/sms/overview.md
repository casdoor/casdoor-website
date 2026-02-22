---
title: SMS provider overview
description: Configure SMS providers for verification codes using go-sms-sender.
keywords: [SMS, verification, Twilio, Alibaba, Tencent]
authors: [kininaru]
---

Casdoor sends SMS via [casdoor/go-sms-sender](https://github.com/casdoor/go-sms-sender). Supported providers include Twilio, Submail, SmsBao, Alibaba Cloud, Tencent Cloud, Huawei Cloud, and Volc. To add another provider, open an issue or submit a PR in that repo.

## Add an SMS provider

1. Click **Add** and select **SMS** under **Category**.
2. Choose the provider **Type** (e.g. Twilio, Alibaba Cloud).
3. Get credentials from the SMS provider and fill the required fields.

![Select Category](/img/providers/sms/selectCategory.png)
![Select Type](/img/providers/sms/selecttype.png)

## Proxy

For HTTP-based SMS providers (e.g. Custom HTTP SMS), you can enable **Enable proxy** so traffic goes through the SOCKS5 proxy set in Casdoor’s config. Useful when the server cannot reach the SMS API directly.
