---
title: Adyen
description: Add Adyen payment provider to your application
keywords: [Adyen, payment]
authors: [hsluoyz]
---

:::note

This is an example of how to configure an **Adyen** payment provider.

:::

Adyen is a global payment platform that enables businesses to accept payments across online, mobile, and in-store channels. It provides a unified commerce solution with built-in fraud protection and global acquiring.

## Step 1. Get Your API Credentials

Create an account at [Adyen](https://www.adyen.com/) and access your Customer Area dashboard.

Navigate to **Developers > API credentials** and create a new API credential for web service integration. Generate an API key with permissions to process payments.

You'll also need your merchant account name, which can be found in the API credential settings or in your account dashboard.

Copy both the API key and merchant account name for the next step.

## Step 2. Create an Adyen Payment Provider

Create an Adyen payment provider in Casdoor:

|    Name       |   Name in Adyen             |
|      ----     |   ----                      |  
|Category       |   Choose `Payment`          |
|Type           |   Choose `Adyen`            |
|Client ID 2    |   Merchant account name from Step 1   |
|Client secret  |   API key from Step 1       |

The Client ID field is not required for Adyen.

## Step 3. Add the Provider to Your Product

Add the Adyen payment provider to your product in Casdoor. When users purchase your product, they'll be redirected to Adyen's hosted checkout page to complete the payment.

Adyen creates payment sessions dynamically, handling multiple payment methods including cards, digital wallets, and local payment options based on your account configuration.

:::note

Adyen automatically switches between test and live environments based on your Casdoor configuration (`runmode` in `conf/app.conf`). Make sure to use test API credentials during development.

:::
