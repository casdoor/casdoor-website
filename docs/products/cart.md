---
title: Shopping cart
description: Collect multiple products before purchasing them together
keywords: [cart, shopping cart, multi-product order]
authors: [hsluoyz]
---

The shopping cart collects products for purchase in a single order. Add items to the cart and complete the transaction when ready instead of buying one at a time.

## Adding products to cart

An **Add to cart** button appears on product pages and in the [Product Store](/docs/products/product-store). Added products are stored in the user's cart and persist across sessions, so users can add items and complete the purchase later.

Before adding, use the quantity stepper next to the button to set how many units you want. The same stepper is also available on the product buy page when placing an order directly.

Regular products are added at their listed price. For recharge products, specify the amount first—either a preset value or a custom amount. The system validates that custom amounts are greater than zero before adding.

Subscription products can also be added to the cart. Each subscription is treated as a separate line item; the cart handles the order and payment flow for both regular and subscription products.

## Currency consistency

All items in the cart must use the same currency. Adding a product in a different currency than existing items is blocked, and the system reports the mismatch. This keeps the order total accurate at checkout.

## Managing the cart

Open the cart via **Cart** in the Business & Payments section. The cart page shows:

- Product name and display name
- Product image
- Price and currency
- Quantity (managed automatically)

Each item has a **Buy** button to purchase that product alone or a **Delete** button to remove it. Quantities are tracked automatically—adding the same product at the same price increases the quantity instead of creating duplicate rows. You can also adjust quantities directly in the cart using the inline stepper.

To remove all items at once, click **Clear** at the top of the cart. A confirmation prompt is shown before the cart is emptied.

## Invalid cart items

If a product is deleted, renamed, or its currency is changed after it was added to the cart, the cart item is marked as **invalid**. Invalid items are shown in red and display "Invalid product" in place of the display name. The order total excludes invalid items.

Placing an order is blocked while any invalid item remains in the cart. Remove invalid items with the **Delete** button before proceeding to checkout.

## Placing orders from cart

Click **Buy** next to any item to purchase it individually. Use the **Place Order** button at the top of the cart to initiate payment for all items at once—each item is processed as a separate order. After all orders are placed, the cart is cleared automatically.

## Floating cart button

A cart icon is shown in the bottom-right corner of product and store pages. It displays the current number of items in the cart and takes you directly to the cart page when clicked.
