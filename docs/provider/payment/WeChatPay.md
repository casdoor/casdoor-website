---
title: Take payments with WeChat Pay
sidebar_label: WeChat Pay
description: Use WeChat Pay as the payment provider of your Casdoor products, with Native payment and JSAPI payment inside WeChat.
keywords: [WeChat Pay, payment]
authors: [Wrapping-2000, Chinoholo0807]
---

This guide explains how to let users pay for your Casdoor products with WeChat Pay. Casdoor supports [Native payment](https://pay.weixin.qq.com/docs/merchant/products/native-payment/introduction.html), with a QR code, and [JSAPI payment](https://pay.weixin.qq.com/docs/merchant/products/jsapi-payment/introduction.html), inside the WeChat app.

---

#### Learning outcomes

- Get the API key, the certificate, and the IDs from WeChat Pay.
- Add WeChat Pay as a payment provider and add it to a product.
- Turn on payment inside the WeChat app.

#### What you need

- A [WeChat Pay merchant](https://pay.weixin.qq.com/index.php/public/wechatpay_en) account. See [Preparation before access](https://pay.weixin.qq.com/docs/merchant/products/native-payment/preparation.html).
- A [product](/docs/products/product) in Casdoor

---

## Get the credentials {#1-get-credentials}

1. On the WeChat Pay merchant platform, go to **Account Settings** > **API Security** > **Set APIv3 Secret** and copy the API key v3. See [APIv3 key settings](https://kf.qq.com/faq/180830E36vyQ180830AZFZvu.html).

   ![API key v3 setting](/img/providers/payment/wechat_apikey_v3.png)

1. Go to **Account Settings** > **API Security** > **API Certificate** and download the merchant certificate. Note its [serial number](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay7_0.shtml#part-5) and its [private key](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay3_1.shtml).

   ![Merchant certificate download](/img/providers/payment/wechat_mch_cert.png)

1. Store the certificate on the **Certs** page of Casdoor.

   ![Merchant certificate in Casdoor](/img/providers/payment/wechat_cert.png)

1. Note your [merchant ID](https://kf.qq.com/faq/200729EZ7fEj200729aumYR7.html) and your [App ID](https://pay.weixin.qq.com/static/pay_setting/appid_protocol.shtml).

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `WeChat Pay`.
1. Fill in the fields:

   | Casdoor field   | Value           |
   |-----------------|-----------------|
   | Client ID       | Merchant ID     |
   | Client secret   | API Key v3      |
   | App ID          | App ID          |
   | Cert            | The Cert above  |

   ![WeChat Pay provider in Casdoor](/img/providers/payment/wechat_payment_provider.png)

1. Save the provider.

## Add the provider to a product {#3-attach-to-your-product}

Add the provider to the **Payment providers** of the product and save it.

![WeChat Pay in the payment providers of a product](/img/providers/payment/wechat_product.png)

<video src="/video/provider/payment/use_wechatpay_buy_product.mp4" controls="controls" width="100%"></video>

## Pay inside the WeChat app {#jsapi-payment-in-wechat-browser}

For JSAPI payment, users sign in with WeChat in the built-in browser of the WeChat app and then pay there. Configure a [WeChat OAuth provider](/docs/provider/oauth/Wechat) for the same official account as the payment provider, and add both to the application.

![Relation between the WeChat Pay provider and the WeChat OAuth provider](/img/providers/payment/wechat_jsapi_conf.png)

<video src="/video/provider/payment/use_wechatpay_via_jsapi.mp4" controls="controls" width="100%" align="center"></video>

## See also

- [Payment providers](/docs/provider/payment/overview)
