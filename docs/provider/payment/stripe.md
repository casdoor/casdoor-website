---
title: Take payments with Stripe
sidebar_label: Stripe
description: Use Stripe as the payment provider of your Casdoor products.
keywords: [Stripe, payment]
authors: [Chinoholo0807]
---

This guide explains how to let users pay for your Casdoor products with Stripe.

---

#### Learning outcomes

- Get the API keys from Stripe.
- Add Stripe as a payment provider and add it to a product.

#### What you need

- A [Stripe](https://www.stripe.com/) account
- A [product](/docs/products/product) in Casdoor

---

## Get the API keys

In the [Stripe dashboard](https://dashboard.stripe.com/test/apikeys), under **API keys**, copy the **Publishable key** and the **Secret key**.

![API keys in the Stripe dashboard](/img/providers/payment/stripe_api_keys.png)

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `Stripe`.
1. Fill in the fields:

   | Casdoor field   | Value              |
   |-----------------|--------------------|
   | Client ID       | Publishable key    |
   | Client secret   | Secret key         |

   ![Stripe provider in Casdoor](/img/providers/payment/stripe_provider.png)

1. Save the provider.

## Add the provider to a product {#3-attach-to-your-product}

Add the provider to the **Payment providers** of the product and save it.

![Stripe in the payment providers of a product](/img/providers/payment/stripe_product.png)

<video src="/video/provider/payment/use_stripe_buy_product.mp4" controls="controls" width="100%"></video>

## See also

- [Payment providers](/docs/provider/payment/overview)
