---
title: Order
description: Track and manage product purchases with orders
keywords: [order, product, purchase, payment]
authors: [Copilot]
---

Orders track product purchases in Casdoor. When a user buys a product, an order is automatically created to record the purchase details and track its lifecycle.

## Order vs Payment

While closely related, orders and payments serve different purposes:

- **Order**: Tracks what was purchased and its fulfillment state
- **Payment**: Tracks how the transaction was paid

Both are created when purchasing a product, but subscriptions use a different flow (Pricing → Plan → Payment → Subscription) without orders.

## Creating Orders

When a user purchases a product, the system creates an order and displays immediate feedback. You'll see a success notification as soon as the order is created, before being redirected to the payment page. If order creation fails, an error message explains what went wrong so you can address the issue.

### Multi-Product Orders

Orders can now include multiple products in a single purchase. When creating an order with multiple items, the system validates that all products share the same currency to prevent pricing conflicts. Product information is captured at order creation time, preserving historical details like prices even if the product catalog changes later.

The total order price is automatically calculated by summing individual product prices. For recharge products in multi-item orders, each product's custom price is added to the total independently.

## Order Structure

Each order contains:

- **Basic Information**: Owner, name, creation time, and display name
- **Product References**: List of product names included in the order
- **Product Details**: Snapshot of each product's information (name, price, image, etc.) at purchase time
- **User & Payment**: References to the buyer and associated payment
- **State Management**: Current state and optional status message
- **Duration**: Optional start and end times for time-limited purchases (e.g., 1-year cloud instance)

Product information is captured in the order to preserve historical accuracy. Even if you later change a product's price or details, orders retain the original purchase information.

## Order States

Orders progress through these states based on payment status:

- **Created**: Order initialized but payment not yet completed
- **Paid**: Payment successfully processed
- **PaymentFailed**: Payment attempt failed with an error
- **Canceled**: Payment or order was cancelled
- **Timeout**: Payment timed out before completion
- **Delivered**: Product or service delivered to the user
- **Completed**: Order fully fulfilled
- **Expired**: Order expired (for time-limited products)

When payment providers notify Casdoor about transaction results, the system updates order states automatically. This synchronization ensures that orders always reflect the current payment status, whether the payment succeeded, failed, was cancelled, or timed out.

## Viewing Orders

Navigate to the Orders page to view all purchases. The order list shows products included in each order, with direct links to product details. Regular users see only their own orders, while administrators can view orders across the organization. The **Payment** column links directly to the associated payment record, making it easy to track payment status and details.

## Managing Orders

Click on an order to view or edit its details. You can update the order state, add messages, modify duration settings, or change which products are included. When editing an order's product list, the system preserves historical product information for items that were in the original order while adding current details for newly added products.

## Shopping Cart

The shopping cart lets users collect products before placing an order. After browsing the product store, you can add items to your cart instead of purchasing immediately. This is particularly useful when you want to buy multiple products together or need time to decide on your purchases.

When you add a product to your cart, the system ensures currency compatibility—all items must share the same currency. The cart displays each product with its name, image, price, and available quantity. You can manage cart items directly from the cart page: remove unwanted products or proceed to purchase by clicking the Buy button for individual items.

To place an order with multiple products from your cart, select the items you want and click "Place Order." This creates a single order containing all selected products, streamlining the checkout process.
