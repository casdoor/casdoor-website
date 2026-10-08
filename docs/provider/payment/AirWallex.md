---
title: Take payments with AirWallex
sidebar_label: AirWallex
description: Use AirWallex as the payment provider of your Casdoor products.
keywords: [AirWallex, payment]
authors: [Cutsin]
---

This guide explains how to let users pay for your Casdoor products with AirWallex.

---

#### Learning outcomes

- Get the API key from AirWallex.
- Add AirWallex as a payment provider and add it to a product.

#### What you need

- An [AirWallex](https://www.airwallex.com/) account
- A [product](/docs/products/product) in Casdoor

---

## Get the API key {#1-get-credentials}

In the [AirWallex developer dashboard](https://www.airwallex.com/app/account/apiKeys), under **API Keys**, copy the **CLIENT ID** and the **API KEY**, or create a key with custom permissions.

![API keys in AirWallex](/img/providers/payment/airwallex_api_keys.png)

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `AirWallex`.
1. Fill in the fields:

   | Casdoor       | AirWallex   |
   |---------------|-------------|
   | Client ID     | CLIENT ID   |
   | Client secret | API KEY     |

   ![AirWallex provider in Casdoor](/img/providers/payment/airwallex_provider.png)

1. Save the provider.

## Add the provider to a product {#3-attach-to-a-product}

Add the provider to the **Payment providers** of the product and save it.

![AirWallex in the payment providers of a product](/img/providers/payment/airwallex_product.png)

<video src="/video/provider/payment/use_airwallex_buy_product.mp4" controls="controls" width="100%"></video>

## See also

- [Payment providers](/docs/provider/payment/overview)
