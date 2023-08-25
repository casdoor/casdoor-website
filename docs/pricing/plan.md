---
title: Plan
description: Casdoor Plan overview
keywords: [Plan]
authors: [isulimanov, Chinoholo0807]
---

`Plan` describes list of application's features with own name and price.

`Plan` features depends on Casdoor `Role` with set of `Permissions`.

That allow to describe `Plan`'s features independ on naming and price.
For example: `Plan` may has diffrent prices depends on county or date.

Picture below describes relation between `Plan` and `Role`.

![plan](/img/pricing/plan.png)

## Plan properties

Every `Plan` has these properties:

* `Organization`
* `Name`
* `CreatedTime`
* `DisplayName`
* `Role`
* `PricePerMonth`
* `Currency`
* `PaymentProviders` : User can buy the Plan through the Payment providers. To learn how to configure a Payment provider, see [Payment provider](/docs/provider/payment/overview).
* `IsEnabled`

![plan edit](/img/pricing/plan_edit.png)

Whenever a `Plan` is created through Casdoor, an related `Product` is automatically created.

The information configured on the `Plan` will be automatically synchronized to the `Product`.
When users buy a `Plan`, they are essentially buying the related `Product` of the selected `Plan`.

![related prodcut](/img/pricing/related_product.png)
