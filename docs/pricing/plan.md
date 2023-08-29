---
title: Plan
description: Casdoor Plan Overview
keywords: [Plan]
authors: [isulimanov, Chinoholo0807]
---

The `Plan` describes a list of features for an application, each with its own name and price.

The features of a `Plan` depend on the Casdoor `Role`, which comes with a set of `Permissions`.

This allows for the independent description of a `Plan`'s features, regardless of naming and pricing.

For example, a `Plan` may have different prices depending on the country or date.

The following picture illustrates the relationship between a `Plan` and a `Role`.

![plan](/img/pricing/plan.png)

## Plan Properties

Every `Plan` has the following properties:

- `Organization`
- `Name`
- `CreatedTime`
- `DisplayName`
- `Role`
- `PricePerMonth`
- `Currency`
- `PaymentProviders`: Users can purchase the `Plan` through the Payment providers. For information on how to configure a Payment provider, see [Payment provider](/docs/provider/payment/overview).
- `IsEnabled`

![plan edit](/img/pricing/plan_edit.png)

When a `Plan` is created through Casdoor, a related `Product` is automatically created.

The information configured for the `Plan` will be automatically synchronized to the `Product`.

When users buy a `Plan`, they are essentially purchasing the related `Product` of the selected `Plan`.

![related product](/img/pricing/related_product.png)
