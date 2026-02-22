---
title: Paddle
description: Use Paddle as a payment provider for digital products and subscriptions.
keywords: [Paddle, payment]
authors: [hsluoyz]
---

[Paddle](https://www.paddle.com/) handles payments, tax, and subscriptions for digital products.

## 1. Get API key

Sign in at [Paddle](https://www.paddle.com/). In [Developer Tools → Authentication](https://sandbox-vendors.paddle.com/authentication-v2), create an API key with permission to create transactions. Copy the key.

## 2. Create the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Payment**, **Type** to **Paddle**. Put the API key in **Client secret**. **Client ID** is not used for Paddle.

## 3. Attach to a product

Add the Paddle provider to the product in Casdoor. Checkout redirects users to Paddle. Paddle creates transactions dynamically; you do not need to pre-create products in Paddle.

:::note
Sandbox vs production is determined by Casdoor’s `runmode` in `conf/app.conf`.
:::
