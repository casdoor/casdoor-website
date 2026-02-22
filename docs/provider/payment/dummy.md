---
title: Dummy payment
description: Mock payment provider for testing and development.
keywords: [Dummy, payment, testing, development]
authors: [hsluoyz]
---

The **Dummy** provider simulates payment: no real gateway is called. Use it to test the purchase flow before going live.

**Behavior:** A purchase with Dummy is marked successful immediately and the user is redirected to the result page. No money is charged.

## Create the provider

**Providers** → **Add**. Set **Category** to **Payment**, **Type** to **Dummy**. No API keys or secrets are required.

## Use in a product

Add the Dummy provider to the product so test users can complete “purchases.” For production, replace it with a real provider (e.g. Stripe or PayPal).
