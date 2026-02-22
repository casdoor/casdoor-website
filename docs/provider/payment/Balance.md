---
title: Balance payment
description: Let users pay with their Casdoor account balance (wallet).
keywords: [Balance, payment, wallet]
authors: [Copilot]
---

The **Balance** payment provider lets users pay for products from their account balance instead of an external gateway. Casdoor deducts the price from the user’s balance; no redirect to a third party.

Users need sufficient balance before they can pay. Create a **recharge** product (enable **Is recharge**) and attach external providers (e.g. Stripe, PayPal). When users buy that product, the amount is added to their balance. Then they can use **Balance** to pay for other products.

## Create the provider

In Casdoor **Providers** → **Add**:

| Field    | Value        |
|----------|--------------|
| Category | **Payment**  |
| Type     | **Balance**  |

No Client ID or secret; Balance uses the built-in user balance.

## Use in products

Add the Balance provider to your product’s payment provider list. Users will see “Balance” at checkout when they have enough funds.

Typical setup: one recharge product (Stripe/PayPal) so users can top up, and regular products that accept Balance so users can pay from their wallet without re-entering payment details.
