---
title: AirWallex
description: Use AirWallex as a payment provider.
keywords: [AirWallex, payment]
authors: [Cutsin]
---

## 1. Get credentials

Create an account at [AirWallex](https://www.airwallex.com/) and sign in to the [Developer Dashboard](https://www.airwallex.com/app/account/apiKeys). Under **API Keys**, copy **CLIENT ID** and **API KEY** (or create a new custom permission key).

![AirWallex API Keys](/img/providers/payment/airwallex_api_keys.png)

## 2. Create the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Payment**, **Type** to **AirWallex**. Map:

| Casdoor       | AirWallex   |
|---------------|-------------|
| Client ID     | CLIENT ID   |
| Client secret | API KEY     |

![AirWallex provider](/img/providers/payment/airwallex_provider.png)

## 3. Attach to a product

Add the AirWallex provider to the product so users can pay with AirWallex.

![Add AirWallex payment provider for product](/img/providers/payment/airwallex_product.png)

<video src="/video/provider/payment/use_airwallex_buy_product.mp4" controls="controls" width="100%"></video>
