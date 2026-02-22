---
title: Overview
description: "Use Casdoor for subscription and pricing: plans, payments, and subscriptions."
keywords: [pricing, plan, subscription, transaction, payment]
authors: [isulimanov, Chinoholo0807]
---

Casdoor can act as a subscription and pricing system using **Product**, **Payment**, **Plan**, **Pricing**, **Subscription**, and **Transaction**. You define which plans appear in each price list:

![pricing example](/img/pricing/pricing_example.png)

Each **Pricing** is tied to an **Application**. Users open the pricing page URL, pick a plan, and sign up as paid users.

## Flow

![pricing flow](/img/pricing/flow.png)

1. **Select plan** — Users open the pricing page URL (shared by the admin) and choose a plan.

   ![pricing page url](/img/pricing/pricing_page_url.png)

2. **Sign up** — They complete sign-up and become paid users for that plan.

   ![select-plan](/img/pricing/select_plan.png) ![signup](/img/pricing/signup.png)

3. **Pay** — They are redirected to the buy-plan page to complete payment.

   ![buy-plan](/img/pricing/buy_plan.png)

4. **Activation** — After payment, the **Subscription** for that plan is active and they can sign in as paid users.

   ![buy-plan-result](/img/pricing/buy_plan_result.png)

Here is a demo video:

<video src="/video/pricing/pricing_flow_example.mp4" controls="controls" width="100%"></video>
