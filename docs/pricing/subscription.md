---
title: Subscription
description: Casdoor Subscription Overview
keywords: [Subscription]
authors: [isulimanov, Chinoholo0807]
---

The `Subscription` feature helps in managing a user's selected `Plan`, making it easy to control the access to `Application` features.

:::tip

Since each `Plan` is based on a `Role`, you can assign the Plan's Role to a user and use the enforce API for permission checking.

:::

A `Subscription` can be created in three ways:

- Manually by an admin
- Via the Pricing flow when purchasing a product with pricing and plan information (available for all user types)
- Via API

Any user can create a subscription when purchasing a product, enabling flexible conversion from free to paid tiers. Subscription enforcement (requiring an active subscription for access) only applies to users with `type = "paid-user"`.

The relationship between `Pricing`, `Plan`, `Subscription`, `Product`, and `Payment` is as follows:

![relation](/img/pricing/relation.png)

## Subscription properties

Every Subscription has these properties:

- `Owner`
- `Name`
- `CreatedTime`
- `DisplayName`
- `Description`
- `Duration`: The duration of the Subscription.
- `StartTime`: The starting time for the Subscription to take effect.
- `EndTime`: The end time for the Subscription to take effect.
- `Pricing`: The related Pricing.
- `Plan`: The related Plan.
- `Payment`: The related Payment.
- `User`: The user who holds this Subscription.
- `State`: Currently, the Subscription has the following states: `Pending`, `Error`, `Suspended`, `Active`, `Upcoming`, `Expired`.

![subscription edit](/img/pricing/sub_edit.png)
