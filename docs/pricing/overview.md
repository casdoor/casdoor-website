---
title: Overview
description: Casdoor Pricing overview
keywords: [Pricing, Plan, Subscription]
authors: [isulimanov, Chinoholo0807]
---

Casdoor can be used as subscription management system via `Plan`, `Pricing` and `Subscription`.

You can choose which plans to include in your price list like on pictures below:

![pricing example](/img/pricing/pricing_example.png)

Each `Pricing` belong to a specific `Application`.
Users can select a plan and signup as `paid-user` through the corresponding `pricing page URL` of the `Pricing`.

## General flow

General flow looks like:

![pricing flow](/img/pricing/flow.png)

1. User enters the select-plan page of the `Pricing` by accessing the `pricing page URL` shared by the admin.

![pricing page url](/img/pricing/pricing_page_url.png)

1. User selects a `Plan` to subscribe and completes the signup process, becoming a `paid-user`.

![select-plan](/img/pricing/select_plan.png)

![signup](/img/pricing/signup.png)

1. After signing up, the user will be redirected to the buy-plan page for the selected `Plan` to proceed with the payment.

![buy-plan](/img/pricing/buy_plan.png)

1. Once the payment is successfully completed, the user's `Subscription` for the `Plan` is activated, and now user can login the Casdoor as a `paid-user`.

![buy-plan-result](/img/pricing/buy_plan_result.png)

Here is the demo video:

<video src="/video/pricing/pricing_flow_example.mp4" controls="controls" width="100%"></video>
