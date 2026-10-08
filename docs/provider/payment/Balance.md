---
title: Let users pay from their balance
sidebar_label: Balance
description: Let users pay for products from their account balance in Casdoor, and top up the balance with a recharge product.
keywords: [Balance, payment, wallet]
authors: [hsluoyz]
---

This guide explains the Balance payment provider. With it, users pay for products from their account balance in Casdoor, without being sent to an external payment service.

---

#### Learning outcomes

- Let users top up their balance.
- Add the Balance provider and add it to products.

#### What you need

- At least one external payment provider, such as [Stripe](/docs/provider/payment/stripe) or [PayPal](/docs/provider/payment/paypal), for the top-up
- [Products](/docs/products/product) in Casdoor

---

## Let users top up their balance

Users need enough balance before they can pay with it.

1. Create a product for the top-up and turn on **Is recharge**.
1. Add an external payment provider, such as Stripe or PayPal, to the product.

When a user buys this product, Casdoor adds the amount to the balance of the user.

## Add the provider {#create-the-provider}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `Balance`. The provider needs no credentials.
1. Save the provider.

## Add the provider to products {#use-in-products}

Add the provider to the **Payment providers** of the products that users may pay from their balance. At checkout, users with enough balance see the option **Balance**. Casdoor deducts the price from the balance.

A typical setup is one recharge product with an external provider, and regular products that accept Balance. Users then pay from their balance without entering payment details again.

## See also

- [Payment providers](/docs/provider/payment/overview)
- [Products](/docs/products/product)
