---
sidebar_position: 4
title: SMS Providers
---

We use [casdoor/go-sms-sender](https://github.com/casdoor/go-sms-sender) to send SMS for Casdoor. Now, `go-sms-sender` supports Aliyun and Tencent Cloud SMS APIs. You can raise an issue, or make a pull request if you want to support other SMS providers.

## Add a SMS provider

1. Add a new provider the same way we mentioned in [OAuth](/docs/provider/OAuth)
2. Select `Phone` in `Category`
3. Select your provider type (`Aliyun` or `Tencent Cloud`)
4. Get your information from Aliyun or Tencent Cloud and fill them out

