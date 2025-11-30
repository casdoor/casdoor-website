---
title: Balance
description: Pay with account balance in Casdoor
keywords: [Balance, payment, wallet]
authors: [Copilot]
---

The Balance payment provider allows users to pay for products using their account balance instead of external payment gateways. This creates a wallet-like experience where users first recharge their account, then spend from that balance.

## How It Works

When a user purchases a product with the Balance provider, Casdoor deducts the product price from the user's balance field. The payment completes instantly without redirecting to any external service.

Before users can pay with balance, they need to have sufficient funds. You can set up a recharge product (with the "Is recharge" option enabled) that uses traditional payment providers like Stripe or PayPal. When users pay for the recharge product, the amount is added to their balance.

## Create a Balance Payment Provider

To set up the Balance payment provider in Casdoor:

| Name     | Value              |
| -------- | ------------------ |
| Category | Choose `Payment`   |
| Type     | Choose `Balance`   |

No additional configuration is required since Balance uses the built-in user balance system.

## Add the Provider to Your Product

After creating the Balance payment provider, add it to your product's payment provider list. Users will then see Balance as a payment option when purchasing that product.

For the complete user journey, you'll typically want to:

1. Create a recharge product with external payment providers (Stripe, PayPal, etc.)
2. Create regular products with the Balance provider

This way, users can top up their balance first, then make quick purchases from their wallet without entering payment details each time.
