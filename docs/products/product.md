---
title: Product
description: Add products that you want to sell
keywords: [products]
authors: [leo220yuyaodog]
---

You can add the product (or service) you want to sell. The following will guide you through the process of adding a product.

## Configuring Product Attributes

First, you need to understand the basic properties of the product:

- Tag
- Detail
- Currency
- Price
- Quantity
- Sold
- Is recharge: When enabled, the product becomes a recharge type with custom pricing

![product_field.png](/img/products/product_field.png)

### Recharge Products

Recharge products allow users to add amounts to their account balance. When you enable the "Is recharge" option, you can configure how users select recharge amounts:

**Preset amounts**: Define specific recharge values (e.g., $10, $50, $100) that users can select. This approach simplifies the purchase decision and works well for common recharge scenarios.

**Custom amounts**: Allow users to enter any amount they wish to recharge. This provides flexibility when preset amounts don't fit user needs.

**Configuration options**:

- Add multiple preset amounts in the product editor
- Toggle "Disallow custom amount" to restrict users to preset values only
- When custom amounts are disabled, at least one preset amount must be defined

Upon successful payment, the selected amount is automatically added to the user's balance. This flexibility lets you balance between guiding users toward specific amounts and giving them freedom to choose.

## Payment Provider

In addition to setting these properties, you also need to add payment providers to the product.
Multiple payment providers can be added to a product.

To learn how to configure a payment provider, refer to [Payment Provider](/docs/provider/payment/overview)

![product_provider.png](/img/products/product_provider.png)

### Success URL (Optional)

If you need the provider to redirect users directly to a custom URL instead of the Casdoor callback page, you can fill in the **Success URL** field. When configured, Casdoor will append the payment owner and transaction name as query parameters to your provided URL.

For example, if you set the Success URL to `http://example.com/payment/success`, users will be redirected to:

```text
http://example.com/payment/success?transactionOwner={paymentOwner}&transactionName={paymentName}
```

You can include additional query parameters in your Success URL, such as:

```text
http://example.com/payment/success?customParam=value&transactionOwner={paymentOwner}&transactionName={paymentName}
```

:::caution

**Important:** If you configure the Success URL field, you must manually call the `NotifyPayment` API to complete the transaction, otherwise the payment will fail.

Call the API endpoint: `api/notify-payment/{paymentOwner}/{paymentName}` using the parameters provided in the Success URL query string.

:::

## Access Controls

Products, orders, payments, plans, pricing, and subscriptions enforce admin-only editing permissions. Non-admin users can view these resources but cannot create, modify, or delete them. When viewing as a non-admin, action buttons and form controls are disabled to prevent unauthorized changes.

## Preview the Product

You're done! Review the details and save:

![product_preview](/img/products/product_preview.png)
