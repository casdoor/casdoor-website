---
title: Shopping Cart
description: Collect multiple products before purchasing them together
keywords: [cart, shopping cart, multi-product order]
authors: [Copilot]
---

The shopping cart collects products for purchase in a single order. Add items to the cart and complete the transaction when ready instead of buying one at a time.

## Adding products to cart

An **Add to cart** button appears on product pages and in the [Product Store](/docs/products/product-store). Added products are stored in the user's cart and persist across sessions, so users can add items and complete the purchase later.

Regular products are added at their listed price. For recharge products, specify the amount first—either a preset value or a custom amount. The system validates that custom amounts are greater than zero before adding.

Subscription products do not support the cart; they are purchased individually through the pricing and plan flow.

## Currency consistency

All items in the cart must use the same currency. Adding a product in a different currency than existing items is blocked, and the system reports the mismatch. This keeps the order total accurate at checkout.

## Managing the cart

Open the cart via **Carts** in the Business & Payments section. The cart page shows:

- Product name and display name
- Product image
- Price and currency
- Quantity (managed automatically)

Each item has a **Buy** button to purchase that product alone or a **Delete** button to remove it. Quantities are tracked automatically—adding the same product at the same price increases the quantity instead of creating duplicate rows.

## Placing orders from cart

Cart items are purchased one at a time. Click **Buy** next to a product to start payment for that item. Bulk **Place Order** for all cart items is under development.

After purchasing an item, remove it from the cart manually or leave it for reference. The cart can also hold products of interest before purchase.
