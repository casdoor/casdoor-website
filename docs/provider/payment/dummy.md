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

Casdoor sends the user straight to the payment result page without calling any payment service. After about one second, the result page notifies Casdoor, which marks the payment as paid. No money is charged.

Only the user who made the payment or an admin of its organization can complete a Dummy payment.

:::caution
The Dummy provider is for development and testing only. Don't leave it in the **Payment providers** of a product in production: any user who can choose it at checkout gets the product without paying.
:::

Before you go live, replace the Dummy provider with a real one, such as Stripe or PayPal.

## See also

- [Payment providers](/docs/provider/payment/overview)
