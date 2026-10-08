---
title: Payment providers
sidebar_label: Overview
description: Add payment providers to products, so that users can pay for them with a payment service or with their account balance.
keywords: [Payment, product]
authors: [Chinoholo0807]
---

A payment provider lets users pay for the [products](/docs/products/product) that you sell in Casdoor. You add one or more payment providers to a product, and users choose one at checkout.

## Supported types

| Type | Service |
|---|---|
| `Stripe` | See [Stripe](/docs/provider/payment/stripe) |
| `PayPal` | See [PayPal](/docs/provider/payment/paypal) |
| `Alipay` | See [Alipay](/docs/provider/payment/Alipay) |
| `WeChat Pay` | See [WeChat Pay](/docs/provider/payment/WeChatPay) |
| `AirWallex` | See [AirWallex](/docs/provider/payment/AirWallex) |
| `Adyen` | See [Adyen](/docs/provider/payment/Adyen) |
| `Paddle` | See [Paddle](/docs/provider/payment/Paddle) |
| `Polar` | See [Polar](/docs/provider/payment/Polar) |
| `FastSpring` | See [FastSpring](/docs/provider/payment/FastSpring) |
| `Lemon Squeezy` | See [Lemon Squeezy](/docs/provider/payment/LemonSqueezy) |
| `Balance` | Pays from the account balance of the user. See [Balance](/docs/provider/payment/Balance) |
| `Dummy` | Simulates payments for tests. See [Dummy](/docs/provider/payment/dummy) |

## Add a payment provider

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and select the **Type**.
1. Fill in the credentials of the service. The page of each service lists the fields.
1. Save the provider.
1. Open the product and add the provider to its **Payment providers**.

   ![Payment providers of a product](/img/providers/payment/add_payment_provider.png)

1. Save the product.

## See also

- [Products](/docs/products/product)
- [Payments](/docs/products/payment)
