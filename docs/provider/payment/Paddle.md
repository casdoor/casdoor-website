---
title: Paddle
description: Add Paddle payment provider to your application
keywords: [Paddle, payment]
authors: [hsluoyz]
---

:::note

This is an example of how to configure a **Paddle** payment provider.

:::

Paddle is a comprehensive payment infrastructure platform designed for digital product businesses. It handles payment processing, tax compliance, and subscription management in a single solution.

## Step 1. Get Your API Key

Create an account at [Paddle](https://www.paddle.com/) and access your dashboard.

Navigate to the [Developer Tools > Authentication](https://sandbox-vendors.paddle.com/authentication-v2) section. Generate an API key with permissions to create transactions.

Copy the API key for the next step.

## Step 2. Create a Paddle Payment Provider

Create a Paddle payment provider in Casdoor:

|    Name       |   Name in Paddle            |
|      ----     |   ----                      |  
|Category       |   Choose `Payment`          |
|Type           |   Choose `Paddle`           |
|Client secret  |   API key obtained from Step 1   |

The Client ID field is not required for Paddle.

## Step 3. Add the Provider to Your Product

Add the Paddle payment provider to your product in Casdoor. When users purchase your product, they'll be redirected to Paddle's checkout page to complete the transaction.

Paddle creates transactions dynamically without requiring pre-configured products in your dashboard, making it straightforward to set up new products.

:::note

Paddle automatically uses sandbox mode for development and production mode for live environments based on your Casdoor configuration (`runmode` in `conf/app.conf`).

:::
