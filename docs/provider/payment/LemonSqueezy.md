---
title: Take payments with Lemon Squeezy
sidebar_label: Lemon Squeezy
description: Use Lemon Squeezy as the payment provider of your Casdoor products.
keywords: [Lemon Squeezy, payment]
authors: [hsluoyz]
---

This guide explains how to let users pay for your Casdoor products with [Lemon Squeezy](https://www.lemonsqueezy.com/), which handles payments, subscriptions, and tax for software and digital products.

---

#### Learning outcomes

- Get an API key and the store ID from Lemon Squeezy.
- Add Lemon Squeezy as a payment provider and add it to a product.

#### What you need

- A Lemon Squeezy account with a store and a product
- A [product](/docs/products/product) in Casdoor

---

## Get the credentials {#1-get-credentials}

1. In the Lemon Squeezy dashboard, go to **Settings** > **API** and create an API key.
1. In the settings of your store, note the store ID.

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `Lemon Squeezy`.
1. Fill in the fields:

   | Casdoor       | Lemon Squeezy |
   |---------------|----------------|
   | Client ID     | Store ID       |
   | Client secret | API Key        |

1. Save the provider.

## Add the provider to a product {#3-attach-to-a-product}

1. Set the name of the Casdoor product to the variant ID of the product in Lemon Squeezy.
1. Add the provider to the **Payment providers** of the product and save it.

At checkout, users go to Lemon Squeezy.

:::tip
Configure webhooks in the Lemon Squeezy dashboard, so that Casdoor learns the payment status reliably. Without webhooks, Casdoor infers the status from the expiry of the checkout.
:::

## See also

- [Payment providers](/docs/provider/payment/overview)
