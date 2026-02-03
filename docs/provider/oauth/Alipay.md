---
title: Alipay
description: Add Alipay OAuth provider to your application
keywords: [Alipay, OAuth]
authors: [hsluoyz]
---

To set up the Alipay OAuth provider, you need to have a developer account at Alipay Open Platform and configure OAuth application credentials.

## Step 1. Preparation

First, you need to have a developer account at Alipay Open Platform.

Before accessing Alipay OAuth, there are some preparations that need to be done.

You can refer to the documentation [preparation before access](https://opendocs.alipay.com/open/270/01didh) for more information.

### 1.1 Get APPID

Login to the Alipay Open Platform Console and [create an application](https://opendocs.alipay.com/open/200/105310).

How to get the `APPID`: [Alipay APPID Query Guide](https://opendocs.alipay.com/common/02nebp)

### 1.2 Configure Cert

Generate an RSA2 certificate based on the [document](https://opendocs.alipay.com/common/056zub?pathHash=91c49771) and then you can obtain the `appPrivateKey.txt` and `appPublicKey.txt`.

Upload the certificate to the application and then you can download three files: `alipayRootCert.crt`, `appCertPublicKey.crt`, `alipayCertPublicKey.crt`.

Create a Cert called `App Cert` at Casdoor:

| Name          | Name in Alipay |
|---------------|-------------------|
|Type           |   choose `x509`   |
| Certificate   | content of `appCertPublicKey.crt`   |
| Private key   | content of `appPrivateKey.txt`   |

Create a Cert called `Root Cert` at Casdoor:

| Name          | Name in Alipay |
|---------------|-------------------|
|Type           |   choose `x509`   |
| Certificate   | content of `alipayCertPublicKey.crt`   |
| Private key   | content of `alipayRootCert.crt`   |

:::info Set the authorization callback URL correctly

In the Alipay App config, the callback URL must be **your Casdoor's callback URL**, and the `Redirect URL` in Casdoor should be **your application's callback URL**.

For more details, please read [App config](/docs/application/config#further-understanding).

:::

## Step 2. Create an Alipay OAuth provider

Next, create an Alipay OAuth provider in Casdoor by filling in the necessary information.

| Name          | Name in Alipay|
|---------------|-------------------|
|Category       |   choose `OAuth`  |
|Type           |   choose `Alipay` |
| Client ID     | `APPID` obtained from Step 1.1  |
| Cert          | `App Cert` configured at Step 1.2    |
| Root Cert     | `Root Cert` configured at Step 1.2  |

Add the Alipay OAuth provider and fill in the `Client ID` (APPID), select the `Cert` and `Root Cert` in your Casdoor.

Now you can use Alipay as a third-party service to complete authentication.

## Troubleshooting

If you encounter errors during the login process, such as "asn1: syntax error: sequence truncated", please verify that:

1. The certificates are correctly configured in Casdoor
2. The App Cert contains the content of `appCertPublicKey.crt` in the Certificate field and `appPrivateKey.txt` in the Private key field
3. The Root Cert contains the content of `alipayCertPublicKey.crt` in the Certificate field and `alipayRootCert.crt` in the Private key field
4. The APPID matches the application you created in Alipay Open Platform
5. The callback URL is correctly configured in both Alipay and Casdoor

For more information about Alipay OAuth, please visit the [Alipay Open Platform documentation](https://opendocs.alipay.com/).
