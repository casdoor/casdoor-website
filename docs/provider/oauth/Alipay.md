---
title: Alipay OAuth
description: Add Alipay as an OAuth provider (certificate-based).
keywords: [Alipay, OAuth]
authors: [hsluoyz]
---

You need an [Alipay Open Platform](https://open.alipay.com/) developer account. See [preparation before access](https://opendocs.alipay.com/open/270/01didh).

## 1. Get APPID and certificates

### APPID

[Create an application](https://opendocs.alipay.com/open/200/105310) in the Alipay Open Platform console and note the **APPID**. See [APPID query guide](https://opendocs.alipay.com/common/02nebp).

### Certificates

Generate an RSA2 key pair per [Alipay docs](https://opendocs.alipay.com/common/056zub?pathHash=91c49771). You get `appPrivateKey.txt` and `appPublicKey.txt`. Upload the app certificate in the Alipay app and download: `alipayRootCert.crt`, `appCertPublicKey.crt`, `alipayCertPublicKey.crt`.

In Casdoor **Certs**, create two certs:

**App Cert**

| Casdoor field | Value |
|---------------|--------|
| Type | `x509` |
| Certificate | content of `appCertPublicKey.crt` |
| Private key | content of `appPrivateKey.txt` |

**Root Cert**

| Casdoor field | Value |
|---------------|--------|
| Type | `x509` |
| Certificate | content of `alipayCertPublicKey.crt` |
| Private key | content of `alipayRootCert.crt` |

:::info
In Alipay, the callback URL must be **Casdoor’s callback URL**. In Casdoor, the application **Redirect URL** is your application’s callback URL. See [Application config](/docs/application/config#how-the-flow-works).
:::

## 2. Create the Alipay OAuth provider in Casdoor

**Providers** → **Add**. Set **Category** to **OAuth**, **Type** to **Alipay**. Fill **Client ID** with the APPID and select the **App Cert** and **Root Cert** you created.

## Troubleshooting

If you see "asn1: syntax error: sequence truncated" or login failures:

1. App Cert: **Certificate** = `appCertPublicKey.crt`, **Private key** = `appPrivateKey.txt`.
2. Root Cert: **Certificate** = `alipayCertPublicKey.crt`, **Private key** = `alipayRootCert.crt`.
3. APPID matches the Alipay application.
4. Callback URL is set correctly in both Alipay and Casdoor.

See [Alipay Open Platform](https://opendocs.alipay.com/).
