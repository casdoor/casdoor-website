---
title: Plan
description: Define a plan’s features and price; plans are tied to roles and products.
keywords: [plan, pricing, role, product]
authors: [isulimanov, Chinoholo0807]
---

A **Plan** describes a set of features for an application, with a name and price. Plan features are based on a Casdoor **Role** (and its permissions), so you can describe the plan independently of naming and pricing—e.g. different prices by country or date.

![plan](/img/pricing/plan.png)

## Plan properties

| Property | Description |
|----------|-------------|
| **Organization** | Owning organization. |
| **Name** | Plan identifier. |
| **CreatedTime** | Creation time. |
| **DisplayName** | Display name. |
| **Role** | Role that defines the plan’s permissions. |
| **PricePerMonth** | Monthly price. |
| **Currency** | Currency code. |
| **PaymentProviders** | Providers through which users can pay. See [Payment provider](/docs/provider/payment/overview). |
| **IsEnabled** | Whether the plan is active. |
| **IsExclusive** | If enabled, a user may only hold one active subscription to this plan at a time. Attempting to subscribe again while an active, upcoming, or pending subscription exists will be rejected. |

![plan edit](/img/pricing/plan_edit.png)

## Exclusive plans

When **IsExclusive** is enabled, Casdoor enforces that a user can hold at most one active subscription to the plan. The check runs at subscription creation time and blocks the request if the user already has a subscription in any of the `Active`, `Upcoming`, or `Pending` states. Expired or suspended subscriptions do not count against this limit, so a user can re-subscribe after their subscription lapses.

Creating a Plan in Casdoor automatically creates a related **Product**. Plan data is synced to that product. When users buy a Plan, they purchase its related Product.

![related product](/img/pricing/related_product.png)
