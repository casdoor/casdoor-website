---
title: WeChatPay
description: Add Wechat OAuth provider to your application
keywords: [WeChatPay, payment]
authors: [Wrapping-2000]
---
## Get merchant ID and APIv3 key
Visit the [WeChat merchant platform](https://pay.weixin.qq.com/) to register and log in, this may take one to two business days. After successfully registering and logging in, you can get the `merchant ID` and `APIv3 key`. If you still don’t understand this, you can refer to the [WeChat payment merchant ID query guide](https://kf.qq.com/faq/200729EZ7fEj200729aumYR7.html) and [APIv3 key settings](https://kf.qq.com/faq/180830E36vyQ180830AZFZvu.html) for help.

## Add payment provider
### Step1. Select the WeChat Pay as the Payment type.

![wechat_select](/img/providers/payment/wechat_select.png)

### Step2. Fill the necessary information in Casdoor

There are two required fields. `Client ID`, `Client secret`. The relationship corresponding to the Azure Blob account is as follows:

|    Name       | Name in WeChat Pay |   is required |
|      ----     |--------------------|  ----         |
|Client ID      | merchant ID        | required     |
|Client secret  | APIv3 key          | required      |

The acquisition of `merchant ID` and `APIv3 key` is as mentioned before.

![wechat_provider](/img/providers/payment/wechat_provider.png)

The `provider URL` can be ignored.

### Step3. Save your configuration

Then you can use WeChat Pay in your application.
