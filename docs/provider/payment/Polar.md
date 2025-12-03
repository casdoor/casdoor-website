---
title: Polar
description: Add Polar payment provider to your application
keywords: [Polar, payment]
authors: [hsluoyz]
---

:::note

This is an example of how to configure a **Polar** payment provider.

:::

Polar is a payment platform built for developers and creators selling digital products. It offers a modern checkout experience with support for subscriptions, one-time payments, and product licensing.

## Step 1. Get Your Access Token

First, create an account at [Polar](https://polar.sh/) and log in to your dashboard.

Navigate to your [Personal Access Tokens](https://polar.sh/settings) page in Settings. Create a new access token with appropriate permissions for creating checkouts and processing payments.

Copy the generated access token - you'll need this in the next step.

## Step 2. Create a Polar Payment Provider

Create a Polar payment provider in Casdoor:

|    Name       |   Name in Polar             |
|      ----     |   ----                      |  
|Category       |   Choose `Payment`          |
|Type           |   Choose `Polar`            |
|Client secret  |   Access token obtained from Step 1   |

The Client ID field is not required for Polar.

## Step 3. Add the Provider to Your Product

Add the Polar payment provider to your product in Casdoor. When users purchase your product, they'll be redirected to Polar's checkout page to complete the payment.

Polar automatically handles the checkout session and returns users to your application after payment is completed or cancelled.
