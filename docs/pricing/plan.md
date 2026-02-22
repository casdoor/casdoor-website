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

![plan edit](/img/pricing/plan_edit.png)

Creating a Plan in Casdoor automatically creates a related **Product**. Plan data is synced to that product. When users buy a Plan, they purchase its related Product.

![related product](/img/pricing/related_product.png)
