---
title: Coupon
description: Create discount coupons and apply them to orders at checkout.
keywords: [coupon, discount, pricing, order, SaaS]
authors: [hsluoyz]
---

**Coupons** let you offer discounts that customers redeem with a code at checkout. Manage them on the **Coupons** page in the Casdoor admin sidebar.

## Coupon fields

| Field | Description |
|-------|-------------|
| Code | The unique code the customer enters at checkout |
| Discount type | `Percentage` (0–100) or `Fixed` amount |
| Discount | The discount value (percent or fixed amount) |
| Max discount | Cap for percentage coupons (`0` = unlimited) |
| Scope | `universal` (any order), `product` (specific products), or `user` (specific users) |
| Products / Users | The products or users the coupon applies to, when the scope is `product` or `user` |
| Quantity | Total number that can be issued (`0` = unlimited) |
| Max usage per user | How many times one user may use it (`0` = unlimited) |
| Min order amount | Minimum order total required to apply the coupon |
| Currency | Currency the coupon applies to |
| Start / Expire time | The validity window |
| State | Whether the coupon is active |

## How it works

1. Create a coupon on the **Coupons** page and share its **Code**.
2. At checkout, the customer enters the code on their order.
3. Casdoor validates the coupon — scope, validity window, minimum order amount, quantity, and per-user usage limit — and applies the discount to the order total.

Each redemption is recorded so that quantity and per-user usage limits are enforced.
