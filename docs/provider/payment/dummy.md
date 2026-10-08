---
title: Test purchases with the Dummy provider
sidebar_label: Dummy
description: Simulate payments to test the purchase flow of Casdoor products without a payment service.
keywords: [Dummy, payment, testing, development]
authors: [hsluoyz]
---

This guide explains the Dummy payment provider. It simulates payments without calling a payment service, so that you can test the purchase flow before you go live.

---

#### Learning outcomes

- Add the Dummy provider and test a purchase.

#### What you need

- A [product](/docs/products/product) in Casdoor

---

## Add the provider {#create-the-provider}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `Dummy`. The provider needs no credentials.
1. Save the provider.

## Test a purchase {#use-in-a-product}

1. Add the provider to the **Payment providers** of the product and save it.
1. Buy the product with the Dummy provider.

Casdoor marks the payment as successful at once and shows the result page. No money is charged.

Before you go live, replace the Dummy provider with a real one, such as Stripe or PayPal.

## See also

- [Payment providers](/docs/provider/payment/overview)
