---
title: Take payments with FastSpring
sidebar_label: FastSpring
description: Use FastSpring as the payment provider of your Casdoor products.
keywords: [FastSpring, payment]
authors: [hsluoyz]
---

This guide explains how to let users pay for your Casdoor products with [FastSpring](https://fastspring.com/), which handles payments, subscriptions, and tax for software and digital products.

---

#### Learning outcomes

- Get the API credentials and the storefront host from FastSpring.
- Add FastSpring as a payment provider and add it to a product.

#### What you need

- A FastSpring account
- A [product](/docs/products/product) in Casdoor

---

## Get the credentials {#1-get-credentials}

In FastSpring, go to **Developer** > **API Credentials** and note the API username and the API password. Note the host of your storefront, for example `yourcompany.onfastspring.com`.

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Payment` and **Type** to `FastSpring`.
1. Fill in the fields:

   | Casdoor       | FastSpring        |
   |---------------|-------------------|
   | Client ID     | API Username      |
   | Client secret | API Password      |
   | Host          | Storefront host (e.g. `mycompany.onfastspring.com`) |

1. Save the provider.

## Add the provider to a product {#3-attach-to-a-product}

Add the provider to the **Payment providers** of the product and save it. At checkout, users go to FastSpring and return to your application after the payment.

## See also

- [Payment providers](/docs/provider/payment/overview)
