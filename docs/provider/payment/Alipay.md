---
title: Alipay
description: Add Alipay payment provider to your application
keywords: [Alipay, payment]
authors: [Chinoholo0807]
---

## Step 1. Preparation

First, you need to have a merchant account at Alipay Open Platform.

Before accessing the Alipay, there are some preparations that need to be done.

You can refer to the documentation [preparation before access](https://opendocs.alipay.com/open/270/01didh) for more information.

### 1.1 Get APPID

Login the Alipay Open Platform Console and [create an application](https://opendocs.alipay.com/open/200/105310).

How to get the `APPID` : [Alipay APPID Query Guide](https://opendocs.alipay.com/common/02nebp)

### 1.2 Configure Cert

Generate an RSA2 certificate based on the [document](https://opendocs.alipay.com/common/056zub?pathHash=91c49771) and then you can obtain the `appPrivateKey.txt` and `appPublicKey.txt`.

Upload the certificate to the applicaiton and then you can download three files: `alipayRootCert.crt`, `appCertPublicKey.crt`, `alipayCertPublicKey.crt`.

Create a Cert called `App Cert` at Casoor:

| Name          | Name in Alipay |
|---------------|--------------------|
|Type           |   choose `Payment`  |
| Certificate   | content of `appCertPublicKey.crt`   |
| Private key     | content of `appPrivateKey.txt`   |

![alipay app cert](/img/providers/payment/alipay_app_cert.png)

Create a Cert called `Root Cert` at Casoor:

| Name          | Name in Alipay |
|---------------|--------------------|
|Type           |   choose `Payment`  |
| Certificate   | content of `alipayCertPublicKey.crt`   |
| Private key     | content of `alipayRootCert.crt`   |

![alipay root cert](/img/providers/payment/alipay_root_cert.png)

## Step 2.  Create an Alipay Payment provider

Next, create an Alipay Payment provider in Casdoor by filling in the necessary information.

| Name          | Name in Alipay|
|---------------|--------------------|
|Category       |   choose `Payment` |
|Type           |   choose `Alipay`  |
| Client ID     | `APPID` obtained from Step 1.1  |
| Cert          | `App Cert` configured at Step 1.2    |
| Root Cert     |  `Root Cert` configured at Step 1.2  |

![alipay provider](/img/providers/payment/alipay_provider.png)

## Step 3. Add the Alipay Pay Payment provider for your product

Finally, add the Alipay Payment provider for your product so that users can purchase the product using Alipay.

![add wechat pay payment provider for product](/img/providers/payment/alipay_product.png)

<video src="/video/provider/payment/use_alipay_buy_product.mp4" controls="controls" width="100%"></video>
