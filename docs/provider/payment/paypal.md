---
title: PayPal
description: Add PayPal Payment provider to your application
keywords: [PayPal, payment]
authors: [Chinoholo0807]
---

:::note

This is an example of how to configure a **PayPal** Payment provider.

:::

## Step1. Create a PayPal application

First you need to create an application in PayPal.
To access PayPal Developer site, you should have a PayPal business account.
If you don't have an account then [create one](https://www.paypal.com/in/webapps/mpp/account-selection?pros=2) first.

After you create a PayPal business account, login the [Developer Dashboard](https://developer.paypal.com/dashboard/applications/sandbox) via the account and then click on `Create App` under `Apps & Credentials`.

![create a paypal application](/img/providers/payment/paypal_create_app.png)

You can find the `Client ID` and `Secret key` in the basic information of your application.

![paypal application detail](/img/providers/payment/paypal_app_detail.png)

## Step2. Create a PayPal Payment provider

Then create a PayPal Payment provider in Casdoor. Fill the necessary information.

|    Name       |   Name in PayPal |
|      ----     |   ----          |  
|Category       |   choose `Payment`                     |
|Type           |   choose `PayPal`                      |
|Client ID      |   `Client ID` obtained from Step1      |
|Client secret  |   `Secret key` obtained from Step1     |

## Step3. Add the PayPal Payment provider for your product

Finally, add the PayPal Payment provider for your product so that users can purchase the product using PayPal.

![add paypal payment provider for product](/img/providers/payment/paypal_product.png)

<video src="/video/provider/payment/use_paypal_as_payment_provider.mp4" controls="controls" width="100%"></video>

:::note

The above operations are all performed in the PayPal `Sandbox` mode.
If you want to use it in a live production environment, you need to create an application in PayPal `Live` mode and set `runmode=prod` in Casdoor's configure file `conf/app.conf`.

:::
