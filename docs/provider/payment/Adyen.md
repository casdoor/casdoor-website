---
title: Adyen
description: Use Adyen as a payment provider for online, mobile, and in-store.
keywords: [Adyen, payment]
authors: [hsluoyz]
---

[Adyen](https://www.adyen.com/) provides a unified payment platform with fraud protection and global acquiring.

## 1. Get credentials

Sign in to the [Adyen Customer Area](https://www.adyen.com/). Under **Developers** → **API credentials**, create a web service API credential and generate an API key with payment permissions. Note your **merchant account name** (from the credential or dashboard). Copy the API key and merchant account name.

## 2. Create the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Payment**, **Type** to **Adyen**. Map:

| Casdoor        | Adyen                |
|----------------|----------------------|
| Client ID 2    | Merchant account name|
| Client secret  | API key              |

**Client ID** is not used for Adyen.

## 3. Attach to a product

Add the Adyen provider to the product in Casdoor. Checkout redirects users to Adyen’s hosted page. Payments are created dynamically; Adyen supports cards, digital wallets, and local methods based on your account.

:::note
Test vs live is determined by Casdoor’s `runmode` in `conf/app.conf`. Use test API credentials in development.
:::
