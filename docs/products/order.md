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

## Order Structure

Each order contains:

- **Basic Information**: Owner, name, creation time, and display name
- **Product References**: One or more products included in the order
- **Product Info Snapshots**: Stored details (name, display name, image, price) of products at purchase time
- **User & Payment**: References to the buyer and associated payment
- **State Management**: Current state and optional status message
- **Duration**: Optional start and end times for time-limited purchases (e.g., 1-year cloud instance)

Orders can include multiple products, making it possible to purchase several items in a single transaction. When the order is created, the system captures a snapshot of each product's current information—including its display name, image, detail, and price. This snapshot preserves what you actually bought, even if the product details change later in the system.

The total order price automatically sums up all individual product prices. For products priced in different currencies, all items in a single order must use the same currency to ensure accurate total calculation.

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

Navigate to the Orders page to view all purchases. Regular users see only their own orders, while administrators can view all orders in their organization or across all organizations when the default organization is selected.

The order list includes a **Products** column showing all items in each order. For orders with multiple products, each product appears as a separate line with a link to its details. The **Payment** column links directly to the associated payment record for tracking transaction status.

You can search orders by payment name, product name, user, or other fields. Filtering by state and sorting by various columns helps locate specific transactions quickly.

## Managing Orders

Click on an order to view or edit its details. The order editor displays the products in a multi-select dropdown, allowing you to add or remove items from the order. When you modify the product list, the system automatically recalculates the total price based on the stored product information snapshots.

You can also update the order state, add messages, or modify duration settings. The product snapshots preserve historical pricing even if current product prices have changed.
