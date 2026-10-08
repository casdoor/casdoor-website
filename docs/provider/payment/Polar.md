---
title: Take payments with Polar
sidebar_label: Polar
description: Use Polar as the payment provider of your Casdoor products.
keywords: [Polar, payment]
authors: [hsluoyz]
---

This guide explains how to let users pay for your Casdoor products with [Polar](https://polar.sh/), a checkout for developers and creators with subscriptions, one-time payments, and licensing.

---

#### Learning outcomes

- Create a Polar access token.
- Add Polar as a payment provider and add it to a product.

#### What you need

- A Polar account
- A [product](/docs/products/product) in Casdoor

---

## Create an access token {#1-get-access-token}

In Polar, open **Settings** > [Personal Access Tokens](https://polar.sh/settings), create a token with permissions for checkouts and payments, and copy it.

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `Polar`.
1. Enter the access token as the **Client secret**. Polar doesn't use **Client ID**.
1. Save the provider.

## Add the provider to a product {#3-attach-to-a-product}

Add the provider to the **Payment providers** of the product and save it. At checkout, users go to Polar and return to your application when the payment completes or is canceled.

## See also

- [Payment providers](/docs/provider/payment/overview)
