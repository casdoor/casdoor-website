---
title: Product Store
description: Publish products to a storefront where users can browse and purchase
keywords: [product store, storefront, published products, buy products]
authors: [Copilot]
---

The Product Store provides a public storefront where users can discover and purchase your published products. Think of it as your product catalog—only items you've marked as "Published" appear here.

## Publishing Products

When creating or editing a product, you'll find a **State** field. Set this to "Published" to make the product visible in the store. Products with other states remain hidden from customers but visible to administrators.

This gives you control over what's available for purchase. Draft products, seasonal items, or products under review can stay in a different state until you're ready to make them public.

## Accessing the Store

Users access the Product Store through the `/product-store` route in your Casdoor instance. The store displays published products in a responsive grid layout. What you see depends on the product type:

**Regular products** display:

- Product image and name
- Tag (if set)
- Price with currency symbol
- Number of units sold

**Recharge products** display:

- Product image and name
- Tag (if set)
- Up to 3 preset recharge amounts as blue tags (e.g., $10, $50, $100)
- A "+N" indicator if more than 3 options exist
- "Custom amount available" text if users can enter their own amount
- Currency information

## Browsing and Purchasing

Each product card in the store is clickable. When a user clicks on a product or its "Buy" button, they're directed to the purchase flow where they can:

1. Review product details
2. Select a payment provider (from those configured for the product)
3. Complete the transaction

The purchase process creates a payment record and, for non-subscription products, an order to track fulfillment.

## Store Display

The store automatically shows up to 100 published products at once, ordered by creation date. Products display with their images prominently featured, making it easy for users to visually browse your offerings.

Empty states are handled gracefully—if no published products exist, users see a message indicating the store is currently empty.
