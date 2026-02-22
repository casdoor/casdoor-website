---
title: Payment
description: View payment records, states, and issue invoices.
keywords: [payment, invoice, multi-product payment]
authors: [leo220yuyaodog]
---

The **Payment** section lists transaction records after payments are processed. Each record includes organization, user, purchase time, and the products purchased.

A single payment can include multiple products. The payment record lists each product by name and stores a combined display name. On the payment detail page, the **Products** column shows each product as a line item with links to product details. Use **View Order** to open the related order; after payment you can go to the order or back to the order list.

## Payment States and Notifications

Payments progress through several states during processing. When payment providers send notifications about completed transactions, Casdoor updates both the payment and its related order atomically to keep them synchronized.

The system prevents duplicate processing by checking whether a payment has already reached a terminal state (Paid, Error, Canceled, or Timeout) before applying updates. This ensures that even if a payment provider sends multiple notifications, your data remains accurate.

For transactions with external payment providers, Casdoor creates transaction records only after receiving successful payment notifications. This approach guarantees that transactions reflect actual payments rather than just payment attempts. Balance-based payments work differently—they create transactions immediately since the balance check confirms payment success upfront.

Transaction records are automatically linked to the user's signup application, providing clear audit trails across your organization.

## Invoice

Open the payment edit screen and fill in the invoice fields. Two invoice types are available: **individual** and **organization**. Click **Issue invoice** to generate the invoice.

![payment_edit.png](/img/products/payment_edit.png)
