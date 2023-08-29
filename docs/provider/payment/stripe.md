---
title: Stripe
description: Add Stripe payment provider to your application
keywords: [Stripe, payment]
authors: [Chinoholo0807]
---

:::note

This is an example of how to configure a **Stripe** payment provider.

:::

## Step 1. Get Publishable Key and Secret Key

First, you need to have an account at [Stripe](https://www.stripe.com/).
After creating a Stripe account, log in to the [Developer Dashboard](https://dashboard.stripe.com/test/apikeys) using your account credentials.
You can find the `Publishable key` and `Secret key` under the `API keys` tab.

![Stripe API keys](/img/providers/payment/stripe_api_keys.png)

## Step 2. Create a Stripe Payment provider

Next, create a Stripe Payment provider in Casdoor by filling in the necessary information.

|    Name       |   Name in Stripe |
|      ----     |   ----           |  
|Category       |   choose `Payment`                        |
|Type           |   choose `Stripe`                         |
|Client ID      |   `Publishable key` obtained from Step 1   |
|Client secret  |   `Secret key` obtained from Step 1        |

![Stripe provider](/img/providers/payment/stripe_provider.png)

## Step 3. Add the Stripe Payment provider for your product

Finally, add the Stripe Payment provider for your product so that users can purchase the product using Stripe.

![Add Stripe payment provider for product](/img/providers/payment/stripe_product.png)

<video src="/video/provider/payment/use_stripe_buy_product.mp4" controls="controls" width="100%"></video>
