---
title: Lemon Squeezy
description: Use Lemon Squeezy as a payment provider for subscriptions and one-time purchases.
keywords: [Lemon Squeezy, payment]
authors: [hsluoyz]
---

[Lemon Squeezy](https://www.lemonsqueezy.com/) handles payments, subscriptions, and tax for software and digital products.

## 1. Get credentials

In the [Lemon Squeezy](https://www.lemonsqueezy.com/) dashboard: **Settings** → **API** to create an **API key**. In store settings, note your **Store ID**. Keep both for the next step.

## 2. Create the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Payment**, **Type** to **Lemon Squeezy**. Map:

| Casdoor       | Lemon Squeezy |
|---------------|----------------|
| Client ID     | Store ID       |
| Client secret | API Key        |

## 3. Attach to a product

Add this provider to the product in Casdoor. Set the product’s **name** (or identifier) to the **Variant ID** from the Lemon Squeezy product. Checkout redirects users to Lemon Squeezy.

:::tip
Configure webhooks in the Lemon Squeezy dashboard for reliable payment status. Without webhooks, status is inferred from checkout expiry.
:::
