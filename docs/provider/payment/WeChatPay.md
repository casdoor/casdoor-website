---
title: WeChat Pay
description: Use WeChat Pay as a payment provider in Casdoor.
keywords: [WeChat Pay, payment]
authors: [Wrapping-2000, Chinoholo0807]
---

You need a [WeChat Merchant](https://pay.weixin.qq.com/index.php/public/wechatpay_en) account. See [preparation before access](https://pay.weixin.qq.com/docs/merchant/products/native-payment/preparation.html).

## 1. Get credentials

### API Key v3

In WeChat Merchant Platform: **Account Settings** → **API Security** → **Set APIv3 Secret**. Copy the **API Key v3**. See [APIv3 Key Settings](https://kf.qq.com/faq/180830E36vyQ180830AZFZvu.html).

![wechat api key v3](/img/providers/payment/wechat_apikey_v3.png)

### Merchant certificate

**Account Settings** → **API Security** → **API Certificate** → download the certificate. Get the [Certificate Serial Number](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay7_0.shtml#part-5) and [Private Key](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay3_1.shtml). In Casdoor, create a **Cert** and fill in the certificate details.

![wechat merchant certificate](/img/providers/payment/wechat_mch_cert.png)
![wechat_cert](/img/providers/payment/wechat_cert.png)

### Merchant ID and App ID

- [Merchant ID](https://kf.qq.com/faq/200729EZ7fEj200729aumYR7.html)
- [App ID](https://pay.weixin.qq.com/static/pay_setting/appid_protocol.shtml)

## 2. Create the provider in Casdoor

Add a **Payment** provider, set **Type** to **WeChat Pay**, and fill in:

| Casdoor field   | Value           |
|-----------------|-----------------|
| Client ID       | Merchant ID     |
| Client secret   | API Key v3      |
| App ID          | App ID          |
| Cert            | The Cert above  |

![wechat pay provider](/img/providers/payment/wechat_payment_provider.png)

## 3. Attach to your product

Add the WeChat Pay provider to your product so users can pay with WeChat Pay.

![add wechat pay payment provider for product](/img/providers/payment/wechat_product.png)

<video src="/video/provider/payment/use_wechatpay_buy_product.mp4" controls="controls" width="100%"></video>

## JSAPI payment (in-WeChat browser)

Casdoor supports [JSAPI](https://pay.weixin.qq.com/docs/merchant/products/jsapi-payment/introduction.html) and [Native](https://pay.weixin.qq.com/docs/merchant/products/native-payment/introduction.html) payment. For JSAPI (payment inside the WeChat app), configure a [WeChat OAuth provider](/docs/provider/oauth/Wechat) that uses the **WeChat Media Platform**. The **Client ID 2** of that WeChat OAuth provider must match the **App ID** of this WeChat Pay provider.

![relation between wechat pay payment provider and wechat oauth provider](/img/providers/payment/wechat_jsapi_conf.png)

After users sign in via WeChat (e.g. in the WeChat in-app browser), they can pay with WeChat Pay via JSAPI.

<video src="/video/provider/payment/use_wechatpay_via_jsapi.mp4" controls="controls" width="100%" align="center"></video>
