---
title: Take payments with Alipay
sidebar_label: Alipay
description: Use Alipay as the payment provider of your Casdoor products, with certificate-based signing.
keywords: [Alipay, payment]
authors: [Chinoholo0807]
---

This guide explains how to let users pay for your Casdoor products with Alipay.

---

#### Learning outcomes

- Get the APPID and the certificates of an Alipay merchant application.
- Store the certificates in Casdoor.
- Add Alipay as a payment provider and add it to a product.

#### What you need

- A merchant account on the [Alipay Open Platform](https://open.alipay.com/). See [Preparation before access](https://opendocs.alipay.com/open/270/01didh).
- A [product](/docs/products/product) in Casdoor whose currency is CNY

---

## Prepare Alipay {#step-1-preparation}

1. [Create an application](https://opendocs.alipay.com/open/200/105310) in the console of the Alipay Open Platform and note its APPID. See [Find the APPID](https://opendocs.alipay.com/common/02nebp).
1. Generate an RSA2 key pair as the [Alipay documentation](https://opendocs.alipay.com/common/056zub?pathHash=91c49771) describes. You get `appPrivateKey.txt` and `appPublicKey.txt`.
1. Upload the certificate to the application and download three files: `alipayRootCert.crt`, `appCertPublicKey.crt`, and `alipayCertPublicKey.crt`.

## Store the certificates in Casdoor {#12-configure-cert}

1. On the **Certs** page of the Casdoor admin console, add a certificate named `App Cert`:

   | Casdoor        | Value |
   |----------------|--------|
   | Type           | Payment (x509) |
   | Certificate    | content of `appCertPublicKey.crt` |
   | Private key    | content of `appPrivateKey.txt` |

   ![App Cert in Casdoor](/img/providers/payment/alipay_app_cert.png)

1. Add a certificate named `Root Cert`:

   | Casdoor        | Value |
   |----------------|--------|
   | Type           | Payment (x509) |
   | Certificate    | content of `alipayCertPublicKey.crt` |
   | Private key    | content of `alipayRootCert.crt` |

   ![Root Cert in Casdoor](/img/providers/payment/alipay_root_cert.png)

## Add the provider in Casdoor {#step-2-create-an-alipay-payment-provider}

1. Go to **Identity** > **Providers** and add a provider with the following values:

   | Casdoor   | Value |
   |-----------|--------|
   | Category  | Payment |
   | Type      | Alipay |
   | Client ID | APPID from step 1.1 |
   | Cert      | App Cert from step 1.2 |
   | Root Cert | Root Cert from step 1.2 |

   ![Alipay payment provider in Casdoor](/img/providers/payment/alipay_provider.png)

1. Save the provider.

## Add the provider to a product {#step-3-add-the-alipay-pay-payment-provider-for-your-product}

Add the provider to the **Payment providers** of the product and save it.

![Alipay in the payment providers of a product](/img/providers/payment/alipay_product.png)

:::info
Alipay supports only Chinese yuan (CNY). Set the currency of the product to CNY. Casdoor rejects a product with Alipay in another currency when you save it.
:::

<video src="/video/provider/payment/use_alipay_buy_product.mp4" controls="controls" width="100%"></video>

## See also

- [Payment providers](/docs/provider/payment/overview)
- [Add Alipay as an OAuth provider](/docs/provider/oauth/Alipay)
