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

- Get the API key, the certificate, the IDs, and the WeChat Pay public key from WeChat Pay.
- Add WeChat Pay as a payment provider and add it to a product.
- Turn on payment inside the WeChat app.

#### What you need

- A [WeChat Pay merchant](https://pay.weixin.qq.com/index.php/public/wechatpay_en) account. See [Preparation before access](https://pay.weixin.qq.com/docs/merchant/products/native-payment/preparation.html).
- A [product](/docs/products/product) in Casdoor

---

## Get the credentials {#1-get-credentials}

1. On the WeChat Pay merchant platform, go to **Account Settings** > **API Security** > **Set APIv3 Secret** and copy the API key v3. See [APIv3 key settings](https://kf.qq.com/faq/180830E36vyQ180830AZFZvu.html).

   ![API key v3 setting](/img/providers/payment/wechat_apikey_v3.png)

1. Go to **Account Settings** > **API Security** > **API Certificate** and download the merchant API certificate. The download contains the certificate `apiclient_cert.pem` and its [private key](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay3_1.shtml) `apiclient_key.pem`.

   ![Merchant certificate download](/img/providers/payment/wechat_mch_cert.png)

1. On the **Certs** page of Casdoor, add a cert. Paste the content of `apiclient_cert.pem` into **Certificate** and the content of `apiclient_key.pem` into **Private key**. Casdoor reads the [serial number](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay7_0.shtml#part-5) from the certificate. You can also put the serial number itself into **Certificate**.

   ![Merchant certificate in Casdoor](/img/providers/payment/wechat_cert.png)

1. Note your [merchant ID](https://kf.qq.com/faq/200729EZ7fEj200729aumYR7.html) and your [App ID](https://pay.weixin.qq.com/static/pay_setting/appid_protocol.shtml).

1. Find out how WeChat Pay signs its responses for your merchant account. Go to **Account Settings** > **API Security**:

   - If the page has a **WeChat Pay public key** (微信支付公钥) section, your account uses the public key mode. New merchant accounts use this mode. Download the public key file `pub_key.pem` and copy the public key ID, which starts with `PUB_KEY_ID_`.
   - If the page has a **Platform certificate** (平台证书) section and no public key, your account uses the platform certificate mode. You don't need anything else: Casdoor downloads the platform certificates with your merchant certificate.

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `WeChat Pay`.
1. Fill in the fields:

   | Casdoor field | Public key mode                         | Platform certificate mode |
   |---------------|-----------------------------------------|---------------------------|
   | Client ID     | Merchant ID                             | Merchant ID               |
   | Client secret | API Key v3                              | API Key v3                |
   | App ID        | App ID                                  | App ID                    |
   | Public key ID | The ID that starts with `PUB_KEY_ID_`   | Empty                     |
   | Cert          | The cert above                          | The cert above            |
   | Public key    | The content of `pub_key.pem`            | Empty                     |

   When both **Public key ID** and **Public key** are set, Casdoor verifies the responses of WeChat Pay with this public key. Otherwise it downloads the platform certificates, which fails with `RESOURCE_NOT_EXISTS` for an account in the public key mode.

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

## Troubleshooting

| Error | Cause and fix |
|---|---|
| `RESOURCE_NOT_EXISTS` when paying | The merchant account uses the public key mode and has no platform certificate. Fill in **Public key ID** and **Public key**. |
| `invalid header field value for Authorization` | An older Casdoor version reads **Certificate** as the serial number, so the PEM breaks the request header. Upgrade Casdoor, or put the serial number of the merchant certificate into **Certificate**. |
| `SIGN_ERROR` | The private key, the serial number, or the merchant ID don't belong together. Check that the cert holds the certificate and private key of this merchant. |

## See also

- [Payment providers](/docs/provider/payment/overview)
