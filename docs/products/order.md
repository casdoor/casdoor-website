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
- **Product Reference**: Links to the product by name to maintain consistency
- **User & Payment**: References to the buyer and associated payment
- **State Management**: Current state and optional status message
- **Duration**: Optional start and end times for time-limited purchases (e.g., 1-year cloud instance)

Product details like display name, description, price, and currency are accessed through the product reference rather than duplicated in the order.

## Order States

Orders progress through these states:

- **Created**: Order initialized but payment not yet completed
- **Paid**: Payment successfully processed
- **Delivered**: Product or service delivered to the user
- **Completed**: Order fully fulfilled
- **Canceled**: Order canceled by user or admin
- **Expired**: Order expired (for time-limited products)

## Viewing Orders

Navigate to the Orders page to view all purchases. The order list includes a **Payment** column that links directly to the associated payment record, making it easy to track payment status and details. You can search orders by payment name, filter by state, and sort by various fields to find specific transactions.

## Managing Orders

Click on an order to view or edit its details. You can update the order state, add messages, or modify duration settings. The product reference ensures you always see current product information.
