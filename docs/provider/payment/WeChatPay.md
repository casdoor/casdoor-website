---
title: WeChat Pay
description: Add WeChat Pay payment provider to your application
keywords: [WeChat Pay, payment]
authors: [Wrapping-2000, Chinoholo0807]
---

## Step 1. Preparation

First, you need to have a merchant account at [WeChat Merchant Platform](https://pay.weixin.qq.com/index.php/public/wechatpay_en).

Before accessing the WeChat Pay, there are some preparations that need to be done.

You can refer to the documentation [preparation before access](https://pay.weixin.qq.com/docs/merchant/products/native-payment/preparation.html) for more information.

### 1.1 Get API Key v3

Log in to WeChat Merchant Platform, select `Account Settings > API Security >Set APIv3 Secret`, and click `Set APIv3 secret` to get the `API Key v3`.

![wechat api key v3](/img/providers/payment/wechat_apikey_v3.png)

How to get `API Key v3` : [APIv3 Key Settings](https://kf.qq.com/faq/180830E36vyQ180830AZFZvu.html)

### 1.2 Get Merchant Certificate

You can log in to WeChat Merchant Platform, and select `Account Settings > API Security > API Certificate` to download the certificate.

![wechat merchant certificate](/img/providers/payment/wechat_mch_cert.png)

After download the certificate, get the `Certificate Serial Number` according to [How to view the Certificate Serial Number](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay7_0.shtml#part-5) and `Private Key` according to [How to get Private Key of Certificate](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay3_1.shtml).

Then, create a `Cert` at Casdoor and fill the necessary information.

![wechat_cert](/img/providers/payment/wechat_cert.png)

### 1.3 Get Merchant ID and App ID

How to get `Merchant ID` : [WeChat Pay Merchant ID Query Guide](https://kf.qq.com/faq/200729EZ7fEj200729aumYR7.html)

How to get `App ID` : [WeChat Pay APPID Query Guide](https://pay.weixin.qq.com/static/pay_setting/appid_protocol.shtml)

## Step 2.  Create a WeChat Pay Payment provider

There are four required fields: `Client ID`, `Client secret`, `App ID`, `Provider URL`. The relationship corresponding to the Azure Blob account is as follows:

| Name          | Name in WeChat Pay |
|---------------|--------------------|
|Category       |   choose `Payment` |
|Type           |   choose `WeChat Pay`  |
|Client ID     | `Merchant ID` obtained from Step 1.3  |
|Client secret | `API Key v3` obtained from Step 1.1  |
|App ID        | `App ID` obtained from Step 1.3 |
|Cert          | `Cert` configured at Step 1.2 |

![wechat pay provider](/img/providers/payment/wechat_provider.png)

## Step 3. Add the WeChat Pay Payment provider for your product

Finally, add the WeChat Pay Payment provider for your product so that users can purchase the product using WeChat Pay.

![add wechat pay payment provider for product](/img/providers/payment/wechat_product.png)

<video src="/video/provider/payment/use_wechatpay_buy_product.mp4" controls="controls" width="100%"></video>
