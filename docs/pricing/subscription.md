---
title: Subscription
description: Manage a user’s selected plan and application access.
keywords: [subscription, plan, pricing, payment]
authors: [isulimanov, Chinoholo0807]
---

A **Subscription** links a user to a **Plan**, so you can control access to application features. Because each Plan is tied to a **Role**, you can assign the plan’s role to the user and use the enforce API for permission checks.

:::tip
Use the Plan’s Role with the [enforce API](/docs/permission/exposed-casbin-apis) to check subscription-based access.
:::

Subscriptions can be created:

- By an admin (manual)
- Through the pricing/purchase flow (any user)
- Via API

Only users with `type = "paid-user"` are subject to subscription enforcement (active subscription required for access).

![relation](/img/pricing/relation.png)

## Subscription properties

| Property | Description |
|----------|-------------|
| **Owner** | Owning organization. |
| **Name** | Subscription id. |
| **CreatedTime** | Creation time. |
| **DisplayName** | Display name. |
| **Description** | Optional description. |
| **Duration** | Subscription duration. |
| **StartTime** | When the subscription starts. |
| **EndTime** | When the subscription ends. |
| **Pricing** | Related Pricing. |
| **Plan** | Related Plan. |
| **Payment** | Related Payment. |
| **User** | User who holds the subscription. |
| **State** | `Pending`, `Error`, `Suspended`, `Active`, `Upcoming`, or `Expired`. |

![subscription edit](/img/pricing/sub_edit.png)
