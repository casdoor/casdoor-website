---
sidebar_position: 4
title: SMS
---

We use [casdoor/go-sms-sender](https://github.com/casdoor/go-sms-sender) to send SMS for Casdoor. Now, `go-sms-sender` supports Aliyun, Tencent Cloud and Volc SMS APIs. You can raise an issue, or make a pull request if you want to support other SMS providers.

## Add a SMS provider

1. Click `Add` to add a new provider.
2. Select `SMS` in `Category`

![Select Category](/img/providers/selectcategory.png)

3. Select your provider type (`Aliyun SMS`, `Tencent Cloud SMS` or `Volc Engine SMS`)

![Select Type](/img/providers/selecttype.png)

4. Get your information from Aliyun, Tencent Cloud or Volc Engine and fill them out.

### Example

:::note

Here, I use Aliyun SMS service as an example

:::

After I logged in my Aliyun workbench, click AccessKey to create ID and Secret.

![aliyun workbench](/img/providers/aliyunsms.png)

By creating AccessKey, I get my AccessKey ID and AccessKey Secret:

![AccessKey](/img/providers/accesskey.png)

Fill the `AccessKey ID` and `AccessKey Secret` to Casdoor `Client ID` and `Client Secret`.