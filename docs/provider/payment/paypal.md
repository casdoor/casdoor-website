---
title: Take payments with PayPal
sidebar_label: PayPal
description: Use PayPal as the payment provider of your Casdoor products.
keywords: [PayPal, payment]
authors: [Chinoholo0807]
---

This guide explains how to let users pay for your Casdoor products with PayPal.

---

#### Learning outcomes

- Create a PayPal app.
- Add PayPal as a payment provider and add it to a product.

#### What you need

- A PayPal business account. [Create one](https://www.paypal.com/in/webapps/mpp/account-selection?pros=2) if you don't have one.
- A [product](/docs/products/product) in Casdoor

---

## Create a PayPal app {#1-create-a-paypal-app}

1. Sign in to the [PayPal developer dashboard](https://developer.paypal.com/dashboard/applications/sandbox) and click **Create App** under **Apps & Credentials**.

   ![App creation in PayPal](/img/providers/payment/paypal_create_app.png)

1. Copy the **Client ID** and the **Secret** of the app.

   ![Client ID and secret of the app](/img/providers/payment/paypal_app_detail.png)

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `PayPal`.
1. Enter the **Client ID** and the secret as the **Client secret**.
1. Save the provider.

## Add the provider to a product {#3-attach-to-your-product}

Add the provider to the **Payment providers** of the product and save it.

![PayPal in the payment providers of a product](/img/providers/payment/paypal_product.png)

<video src="/video/provider/payment/use_paypal_as_payment_provider.mp4" controls="controls" width="100%"></video>

:::note
These steps use the PayPal sandbox. For production, create the app in **Live** mode and set `runmode = prod` in `conf/app.conf` of Casdoor.
:::

## See also

- [Payment providers](/docs/provider/payment/overview)
