---
title: Subscription 
description: Casdoor Subscription overview
keywords: [Subscription]
authors: [isulimanov, Chinoholo0807]
---

`Subscription` helps to manage user's selected `Plan` that make easy to control `Application`'s features access.

:::tip
Since each `Plan` based on `Role` you can assign Plan's Role to user and use enforce API for permission checking.  
:::

`Subscription` can be created in three ways:

- Manually by admin
- Via the Pricing flow (After sign up a `paid-user` and buy the selected `Plan`)
- Via API

The relation between `Pricing`, `Plan`, `Subscription`, `Product` and `Payment` is as follow:

![relation](/img/pricing/relation.png)

## Subscription properties

Every Subscription has these properties:

- `Owner`
- `Name`
- `CreatedTime`
- `DisplayName`
- `Description`
- `Duration` : Duration of Subscription.
- `StartTime` : Starting time for Subscription to take effect.
- `EndTime` : End time for Subscription to take effect.
- `Pricing` : Related Pricing.
- `Plan` : Related Plan.
- `Payment` : Related Payment.
- `User` : The user who hold this Subscription.
- `State` :
    Currently, the Subscription has the following states:
    - `Pending` : The Payment is still under processing.
    - `Error`
    - `Suspended` : Suspended by the admin.
    - `Active`
    - `Upcoming`
    - `Expired`

![subscription edit](/img/pricing/sub_edit.png)
