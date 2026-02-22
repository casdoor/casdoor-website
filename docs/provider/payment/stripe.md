---
title: Stripe payment
description: Use Stripe as a payment provider in Casdoor.
keywords: [Stripe, payment]
authors: [Chinoholo0807]
---

## 1. Get API keys

Create an account at [Stripe](https://www.stripe.com/) and open the [Developer Dashboard](https://dashboard.stripe.com/test/apikeys). Under **API keys**, copy the **Publishable key** and **Secret key**.

![Stripe API keys](/img/providers/payment/stripe_api_keys.png)

## 2. Create the provider in Casdoor

Add a **Payment** provider, set **Type** to **Stripe**, and fill in:

| Casdoor field   | Value              |
|-----------------|--------------------|
| Client ID       | Publishable key    |
| Client secret   | Secret key         |

![Stripe provider](/img/providers/payment/stripe_provider.png)

## 3. Attach to your product

Add the Stripe provider to your product so users can pay with Stripe.

![Add Stripe payment provider for product](/img/providers/payment/stripe_product.png)

<video src="/video/provider/payment/use_stripe_buy_product.mp4" controls="controls" width="100%"></video>
