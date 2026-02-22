---
title: Alipay
description: Add Alipay payment provider to your application
keywords: [Alipay, payment]
authors: [Chinoholo0807]
---

## Step 1. Preparation

You need a merchant account at [Alipay Open Platform](https://open.alipay.com/).

Before accessing the Alipay, there are some preparations that need to be done.

See [preparation before access](https://opendocs.alipay.com/open/270/01didh).

### 1.1 Get APPID

Login the Alipay Open Platform Console and [create an application](https://opendocs.alipay.com/open/200/105310).

How to get the `APPID` : [Alipay APPID Query Guide](https://opendocs.alipay.com/common/02nebp)

### 1.2 Configure Cert

Generate an RSA2 certificate per the [Alipay doc](https://opendocs.alipay.com/common/056zub?pathHash=91c49771) to obtain `appPrivateKey.txt` and `appPublicKey.txt`.

Upload the certificate to the application and download three files: `alipayRootCert.crt`, `appCertPublicKey.crt`, `alipayCertPublicKey.crt`.

Create a Cert named **App Cert** in Casdoor:

| Casdoor        | Value |
|----------------|--------|
| Type           | Payment (x509) |
| Certificate    | content of `appCertPublicKey.crt` |
| Private key    | content of `appPrivateKey.txt` |

![alipay app cert](/img/providers/payment/alipay_app_cert.png)

Create a Cert named **Root Cert** in Casdoor:

| Casdoor        | Value |
|----------------|--------|
| Type           | Payment (x509) |
| Certificate    | content of `alipayCertPublicKey.crt` |
| Private key    | content of `alipayRootCert.crt` |

![alipay root cert](/img/providers/payment/alipay_root_cert.png)

## Step 2.  Create an Alipay Payment provider

Next, create an Alipay Payment provider in Casdoor by filling in the necessary information.

| Casdoor   | Value |
|-----------|--------|
| Category  | Payment |
| Type      | Alipay |
| Client ID | APPID from step 1.1 |
| Cert      | App Cert from step 1.2 |
| Root Cert | Root Cert from step 1.2 |

![alipay provider](/img/providers/payment/alipay_provider.png)

## Step 3. Add the Alipay Pay Payment provider for your product

Finally, add the Alipay Payment provider for your product so that users can purchase the product using Alipay.

:::info Currency Requirement

Alipay only supports transactions in Chinese Yuan (CNY). When adding Alipay as a payment provider, ensure your product's currency is set to CNY. Products with other currencies will be rejected during creation or update to prevent payment failures.

:::

![add wechat pay payment provider for product](/img/providers/payment/alipay_product.png)

<video src="/video/provider/payment/use_alipay_buy_product.mp4" controls="controls" width="100%"></video>
