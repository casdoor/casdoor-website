---
title: Take payments with Adyen
sidebar_label: Adyen
description: Use Adyen as the payment provider of your Casdoor products.
keywords: [Adyen, payment]
authors: [hsluoyz]
---

This guide explains how to let users pay for your Casdoor products with [Adyen](https://www.adyen.com/). Users pay on the hosted checkout page of Adyen, with cards, digital wallets, and the local payment methods of your Adyen account.

---

#### Learning outcomes

- Get an API key and the merchant account name from Adyen.
- Add Adyen as a payment provider and add it to a product.

#### What you need

- An Adyen account
- A [product](/docs/products/product) in Casdoor

---

## Get the credentials {#1-get-credentials}

1. Sign in to the Adyen Customer Area and go to **Developers** > **API credentials**.
1. Create a web service API credential and generate an API key with payment permissions.
1. Copy the API key and note the name of your merchant account.

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `Adyen`.
1. Fill in the fields. Adyen doesn't use **Client ID**.

   | Casdoor        | Adyen                |
   |----------------|----------------------|
   | Client ID 2    | Merchant account name|
   | Client secret  | API key              |

1. Save the provider.

## Add the provider to a product {#3-attach-to-a-product}

Add the provider to the **Payment providers** of the product and save it. At checkout, Casdoor creates the payment and sends the user to Adyen.

:::note
The `runmode` in `conf/app.conf` of Casdoor decides whether Casdoor uses the test or the live environment of Adyen. Use test credentials in development.
:::

## See also

- [Payment providers](/docs/provider/payment/overview)
