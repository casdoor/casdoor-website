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

Only users with `type = "paid-user"` are subject to subscription enforcement (active subscription required for access). Global administrators and organization administrators are never checked, so a paid-user type can't lock an administrator out.

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
| **Group** | Group that holds the subscription. See [Subscriptions for a group](#subscriptions-for-a-group). |
| **State** | `Pending`, `Error`, `Suspended`, `Active`, `Upcoming`, or `Expired`. |

![subscription edit](/img/pricing/sub_edit.png)

## Subscriptions for a group

A subscription can be held by a user (**User**), by a [group](/docs/organization/organization-tree) (**Group**), or by both. A user is covered by:

- The subscriptions whose **User** is the user.
- The subscriptions whose **Group** is a group that the user belongs to, or any ancestor of that group up to the top group. A subscription of a parent group covers all of its subgroups.

Only groups of the subscription's organization count. When you rename a group, Casdoor updates the **Group** of its subscriptions.

The subscriptions that a user inherits from groups count everywhere that the user's own subscriptions count:

- The active-subscription check of a paid user at sign-in.
- The subscription list of the user, see [List subscriptions](#list-subscriptions).
- The check of a plan with **Is exclusive**. `POST /api/add-subscription` rejects a second active subscription to the same plan with `User already has an active subscription for plan: <plan-name>`, also when the user already has the plan through a group. For a group, the error is `Group already has an active subscription for plan: <plan-name>`.

## List subscriptions

`GET /api/get-subscriptions?owner=<organization>` returns:

- For an administrator of the organization: all subscriptions of the organization. Add `field=user&value=<username>` to get the subscriptions of one user.
- For any other user: only the user's own subscriptions, including the ones inherited from groups. Other filters apply on top of that. A user of another organization gets `Unauthorized operation`.

## See also

- [Plan](/docs/pricing/plan)
- [Pricing](/docs/pricing)
- [Payment](/docs/products/payment)
