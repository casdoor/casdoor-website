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

## Creating Subscriptions

A `Subscription` can be created in three ways:

- **Manually by an admin**: Administrators can create subscriptions directly for users
- **Via the Pricing flow**: Users can purchase plans and create subscriptions through the product purchase workflow
- **Via API**: Programmatically create subscriptions using the Casdoor API

### User Type Flexibility

Any user, regardless of their type, can create a subscription when purchasing a product with pricing and plan information. This enables flexible user conversion workflows:

1. **Free user registration**: Users sign up as free users
2. **Trial period**: Users explore basic features
3. **Plan selection**: Users browse available paid plans
4. **Subscription purchase**: Users upgrade to a paid subscription through product purchase
5. **Optional type change**: Administrators can optionally change the user type to `paid-user` to enforce subscription requirements

This approach removes friction from the conversion funnel by allowing users to upgrade without re-registering or changing their account type first.

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

## Subscription Enforcement

While any user can create a subscription through product purchase, Casdoor only enforces subscription requirements for users with `type = "paid-user"`. This provides flexibility in how you manage user access:

- **Free users with subscriptions**: Can hold subscriptions without strict enforcement, useful for trial periods or grace periods
- **Paid users**: Must maintain an active subscription to access the application

Administrators can change a user's type to `paid-user` after they purchase a subscription to begin enforcing subscription requirements.
