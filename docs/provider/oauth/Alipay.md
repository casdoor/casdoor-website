---
title: Add Alipay as an OAuth provider
sidebar_label: Alipay
description: Let users sign in to Casdoor with their Alipay account, with certificate-based signing.
keywords: [Alipay, OAuth]
authors: [hsluoyz]
---

This guide explains how to let users sign in to Casdoor with their Alipay account. The Alipay provider signs its requests with certificates.

---

#### Learning outcomes

- Get the APPID and the certificates of an Alipay application.
- Store the certificates in Casdoor.
- Add Alipay as an OAuth provider in Casdoor.

#### What you need

- A developer account on the [Alipay Open Platform](https://open.alipay.com/). See [Preparation before access](https://opendocs.alipay.com/open/270/01didh).
- Administrator access to the Casdoor admin console

---

## Get the APPID and the certificates {#1-get-appid-and-certificates}

1. [Create an application](https://opendocs.alipay.com/open/200/105310) in the console of the Alipay Open Platform and note its APPID. See [Find the APPID](https://opendocs.alipay.com/common/02nebp).
1. Generate an RSA2 key pair as the [Alipay documentation](https://opendocs.alipay.com/common/056zub?pathHash=91c49771) describes. You get `appPrivateKey.txt` and `appPublicKey.txt`.
1. Upload the application certificate in the Alipay application and download three files: `alipayRootCert.crt`, `appCertPublicKey.crt`, and `alipayCertPublicKey.crt`.
1. Set the callback URL of the Alipay application to the callback URL of Casdoor, `https://<your-casdoor-host>/callback`. See [Redirect URL and callback URL](/docs/application/config#how-the-flow-works).

## Store the certificates in Casdoor

In the Casdoor admin console, open the **Certs** page and add two certificates.

The application certificate:

| Casdoor field | Value |
|---------------|--------|
| Type | `x509` |
| Certificate | content of `appCertPublicKey.crt` |
| Private key | content of `appPrivateKey.txt` |

The root certificate:

| Casdoor field | Value |
|---------------|--------|
| Type | `x509` |
| Certificate | content of `alipayCertPublicKey.crt` |
| Private key | content of `alipayRootCert.crt` |

## Add the provider in Casdoor {#2-create-the-alipay-oauth-provider-in-casdoor}

1. Go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Alipay`.
1. Enter the APPID as the **Client ID**, and select the application certificate and the root certificate that you created.
1. Save the provider.

## Troubleshooting

If the sign-in fails, for example with `asn1: syntax error: sequence truncated`, check the following:

- In the application certificate, **Certificate** is `appCertPublicKey.crt` and **Private key** is `appPrivateKey.txt`.
- In the root certificate, **Certificate** is `alipayCertPublicKey.crt` and **Private key** is `alipayRootCert.crt`.
- The APPID belongs to the Alipay application.
- The callback URL is set correctly in Alipay and in Casdoor.

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [Certificates](/docs/cert/overview)
- [Alipay Open Platform documentation](https://opendocs.alipay.com/)
