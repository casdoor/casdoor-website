---
title: Stripe
description: Add Stripe Payment provider to your application
keywords: [Stripe, payment]
authors: [Chinoholo0807]
---

:::note

This is an example of how to configure a **Stripe** Payment provider.

:::

## Step1. Get Publishable Key and Secret Key

First you need to have an account at [Stripe](https://www.stripe.com/).
After you create a Stripe account, login the [Developer Dashboard](https://dashboard.stripe.com/test/apikeys) via the account.
You can find the `Publishable key` and `Secret key` under `API keys` tab.
![stripe api keys](/img/providers/payment/stripe_api_keys.png)

## Step2. Create a Stripe Payment provider

Then create a PayPal Payment provider in Casdoor. Fill the necessary information.

|    Name       |   Name in PayPal |
|      ----     |   ----          |  
|Category       |   choose `Payment`                        |
|Type           |   choose `Stripe`                         |
|Client ID      |   `Publishable key` obtained from Step1   |
|Client secret  |   `Secret key` obtained from Step1        |

![stripe provider](/img/providers/payment/stripe_provider.png)

## Step3. Add the Stripe Payment provider for your product

Finally, add the Stripe Payment provider for your product so that users can purchase the product using Stripe.

![add stripe payment provider for product](/img/providers/payment/stripe_product.png)

<video src="/video/provider/payment/use_stripe_buy_product.mp4" controls="controls" width="100%"></video>
