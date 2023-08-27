---
title: PayPal 
description: Add PayPal as a payment provider to your application 
keywords: [PayPal, payment]
authors: [Chinoholo0807]
---

:::note

This is an example of how to configure the **PayPal** payment provider.

:::

## Step 1: Create a PayPal application

First, you need to create an application in PayPal. To access the PayPal Developer site, you should have a PayPal business account. If you don't have an account, [create one](https://www.paypal.com/in/webapps/mpp/account-selection?pros=2) first.

After you create a PayPal business account, log in to the [Developer Dashboard](https://developer.paypal.com/dashboard/applications/sandbox) using your account and then click on `Create App` under `Apps & Credentials`.

![create a PayPal application](/img/providers/payment/paypal_create_app.png)

You can find the `Client ID` and `Secret key` in the basic information of your application.

![PayPal application details](/img/providers/payment/paypal_app_detail.png)

## Step 2: Create a PayPal payment provider

Next, create a PayPal payment provider in Casdoor. Fill in the necessary information:

|    Name       |   Name in PayPal |
|      ----     |   ----          |  
|Category       |   Choose `Payment`                     |
|Type           |   Choose `PayPal`                      |
|Client ID      |   Use the `Client ID` obtained from Step 1      |
|Client secret  |   Use the `Secret key` obtained from Step 1     |

## Step 3: Add the PayPal payment provider for your product

Finally, add the PayPal payment provider for your product so that users can purchase the product using PayPal.

![add PayPal payment provider for product](/img/providers/payment/paypal_product.png)

<video src="/video/provider/payment/use_paypal_as_payment_provider.mp4" controls="controls" width="100%"></video>

:::note

The above operations are all performed in PayPal's `Sandbox` mode. If you want to use it in a live production environment, you need to create an application in PayPal's `Live` mode and set `runmode=prod` in Casdoor's configuration file `conf/app.conf`.

:::
