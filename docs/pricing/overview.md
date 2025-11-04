---
title: Overview
description: Casdoor Pricing Overview
keywords: [Pricing, Plan, Subscription]
authors: [isulimanov, Chinoholo0807]
---

Casdoor can be used as a subscription management system through its `Product`, `Payment`, `Plan`, `Plan`, `Pricing`, and `Subscription` features.

You can choose which plans to include in your price list, as shown in the pictures below:

![pricing example](/img/pricing/pricing_example.png)

Each `Pricing` belongs to a specific `Application`. Users can select a plan and sign up as a `paid-user` through the corresponding `pricing page URL` of the `Pricing`.

## General flow

The general flow looks like this:

![pricing flow](/img/pricing/flow.png)

1. Users enter the select-plan page of the `Pricing` by accessing the `pricing page URL` shared by the admin.

    ![pricing page url](/img/pricing/pricing_page_url.png)

2. Users select a `Plan` to subscribe and complete the signup process, becoming a `paid-user`.

    ![select-plan](/img/pricing/select_plan.png)

    ![signup](/img/pricing/signup.png)

3. After signing up, users will be redirected to the buy-plan page for the selected `Plan` to proceed with the payment.

    ![buy-plan](/img/pricing/buy_plan.png)

4. Once the payment is successfully completed, the user's `Subscription` for the `Plan` is activated. Now, users can log in to Casdoor as a `paid-user`.

    ![buy-plan-result](/img/pricing/buy_plan_result.png)

Here is a demo video:

<video src="/video/pricing/pricing_flow_example.mp4" controls="controls" width="100%"></video>
