---
title: Products
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

![product_field.png](/img/products/product_field.png)

## Payment Provider

In addition to setting these properties, you also need to add payment providers to the product.
Multiple payment providers can be added to a product.

To learn how to configure a payment provider, refer to [Payment Provider](/docs/provider/payment/overview)

![product_provider.png](/img/products/product_provider.png)

Finally, fill in the **Return URL**. This is the URL to which the payment provider page will redirect after the payment is completed.

If you need the provider to redirect users directly to other links instead of the casdoor callback page, you can fill the SuccessUrl field, Casdoor will append payment owner and name behind the link you provider, for example `http://example.com/patha/pathb?transactionOwner={paymentOwner}&transactionName={paymentName}&otherPrams=value`.

:::caution

If you fill the SuccessUrl field, you must call `NotifyPayment` api manually, otherwise the transaction will fail.

You should call the `NotifyPayment` api `api/notify-payment/paymentOwner/paymentName` with the param we provided in SuccessUrl.

:::

## Preview the Product

You're done! Review the details and save:

![product_preview](/img/products/product_preview.png)
