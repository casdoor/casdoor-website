---
title: Plan
description: Casdoor plan overview
keywords:
  - pricing
authors:
  - isulimanov
---

`Plan` - describe list of application's features with own name and price.

Plan features depends on Casdoor `role` with set of `permissions`.

That allow to describe plan's features independ on naming and price. For example: plan may has diffrent prices depends on county or date.

Picture below describes relation between Plan and role.

![pricing.png](/img/pricing/plan.png)

## Plan properties

Every plan has these properties:

* `Owner`
* `Name`
* `CreatedTime`
* `DisplayName`
* `IsEnabled`
* `PricePerMonth`
* `PricePerYear`
* `Role`

