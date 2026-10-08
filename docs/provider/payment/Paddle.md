---
title: Take payments with Paddle
sidebar_label: Paddle
description: Use Paddle as the payment provider of your Casdoor products.
keywords: [Paddle, payment]
authors: [hsluoyz]
---

This guide explains how to let users pay for your Casdoor products with [Paddle](https://www.paddle.com/), which handles payments, tax, and subscriptions for digital products.

---

#### Learning outcomes

- Create a Paddle API key.
- Add Paddle as a payment provider and add it to a product.

#### What you need

- A Paddle account
- A [product](/docs/products/product) in Casdoor

---

## Create an API key {#1-get-api-key}

In Paddle, open [Developer Tools > Authentication](https://sandbox-vendors.paddle.com/authentication-v2), create an API key that may create transactions, and copy it.

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `Paddle`.
1. Enter the API key as the **Client secret**. Paddle doesn't use **Client ID**.
1. Save the provider.

## Add the provider to a product {#3-attach-to-a-product}

Add the provider to the **Payment providers** of the product and save it. At checkout, Casdoor creates a transaction in Paddle and sends the user there. You don't create the products in Paddle beforehand.

:::note
The `runmode` in `conf/app.conf` of Casdoor decides whether Casdoor uses the sandbox or the production environment of Paddle.
:::

## See also

- [Payment providers](/docs/provider/payment/overview)
