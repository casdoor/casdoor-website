---
title: Payment
description: View the transaction information of the products in Payment
keywords: [payment, invoice]
authors: [leo220yuyaodog]
---

After the payment is successfully processed, you will be able to view the transaction information of the products in the **Payment** section. This information will include details such as the organization, user, purchase time, and product name.

When viewing a payment, you can navigate directly to the related order using the **View Order** button. After completing a payment, the system offers quick actions to either view the order details or return to the order list, streamlining your workflow.

## Payment States and Notifications

Payments progress through several states during processing. When payment providers send notifications about completed transactions, Casdoor updates both the payment and its related order atomically to keep them synchronized.

The system prevents duplicate processing by checking whether a payment has already reached a terminal state (Paid, Error, Canceled, or Timeout) before applying updates. This ensures that even if a payment provider sends multiple notifications, your data remains accurate.

For transactions with external payment providers, Casdoor creates transaction records only after receiving successful payment notifications. This approach guarantees that transactions reflect actual payments rather than just payment attempts. Balance-based payments work differently—they create transactions immediately since the balance check confirms payment success upfront.

Transaction records are automatically linked to the user's signup application, providing clear audit trails across your organization.

## Invoice

To issue an invoice, navigate to the edit screen:

![payment_edit.png](/img/products/payment_edit.png).

On the edit screen, you will need to fill in the relevant invoice information. There are two invoice types available: `individual` and `organization`.

To complete the process, simply click on the "**issue invoice**" button.

Please let us know if you have any further questions or concerns.
