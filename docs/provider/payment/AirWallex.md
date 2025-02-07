---
title: AirWallex
description: Add AirWallex payment provider to your application
keywords: [AirWallex, payment]
authors: [Cutsin]
---

:::note

This is an example of how to configure a **AirWallex** payment provider.

:::

## Step 1. Get Client ID and API Key

First, you need to have an account at [AirWallex](https://www.airwallex.com/).
After creating an AirWallex account, log in to the [Developer Dashboard](https://www.airwallex.com/app/account/apiKeys) using your account credentials.
You can find the `CLIENT ID` and `API KEY` under the `API Keys` tab, or add a new custom permission key.

![AirWallex API Keys](/img/providers/payment/airwallex_api_keys.png)

## Step 2. Create an AirWallex Payment provider

Next, create an AirWallex Payment provider in Casdoor by filling in the necessary information.

| Name          | Name in AirWallex                      |
| ------------- | -------------------------------------- |
| Category      | choose `Payment`                       |
| Type          | choose `AirWallex`                     |
| Client ID     | `CLIENT ID` obtained from Step 1 |
| Client secret | `API KEY` obtained from Step 1      |

![AirWallex provider](/img/providers/payment/airwallex_provider.png)

## Step 3. Add the AirWallex Payment provider for your product

Finally, add the AirWallex Payment provider for your product so that users can purchase the product using AirWallex.

![Add AirWallex payment provider for product](/img/providers/payment/airwallex_product.png)

<video src="/video/provider/payment/use_airwallex_buy_product.mp4" controls="controls" width="100%"></video>
