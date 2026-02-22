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

When a user purchases a product, the system creates an order and shows immediate feedback. A success notification appears when the order is created, before redirecting to the payment page. If order creation fails, an error message explains the issue.

## Order Structure

Each order contains:

- **Basic Information**: Owner, name, creation time, and display name
- **Product References**: One or more products included in the order
- **Product Info Snapshots**: Stored details (name, display name, image, price) of products at purchase time
- **User & Payment**: References to the buyer and associated payment
- **State Management**: Current state and optional status message
- **Duration**: Optional start and end times for time-limited purchases (e.g., 1-year cloud instance)

Orders can include multiple products, making it possible to purchase several items in a single transaction. When the order is created, the system captures a snapshot of each product's current information—including its display name, image, detail, and price. This snapshot preserves what was purchased even if product details change later.

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

Open the **Orders** page to view purchases. Regular users see only their own orders; administrators see all orders in their organization or, when the default organization is selected, across all organizations.

The order list includes a **Products** column showing all items in each order. For orders with multiple products, each product appears as a separate line with a link to its details. The **Payment** column links directly to the associated payment record for tracking transaction status.

Search orders by payment name, product name, user, or other fields. Filter by state and sort by column to find specific transactions.

## Managing Orders

Click an order to view or edit it. The order editor lists products in a multi-select dropdown; add or remove items there. When the product list changes, the system recalculates the total from the stored product snapshots.

The editor also allows updating the order state, adding messages, and changing duration. Product snapshots preserve historical pricing even when current product prices change.
