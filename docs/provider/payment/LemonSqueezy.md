---
title: Lemon Squeezy
description: Add Lemon Squeezy payment provider to your application
keywords: [Lemon Squeezy, payment]
authors: [Copilot]
---

:::note

This is an example of how to configure a **Lemon Squeezy** payment provider.

:::

Lemon Squeezy is a modern payment platform designed for software companies and digital creators. It handles payments, subscriptions, and global tax compliance in one place.

## Step 1. Get Your API Credentials

Create an account at [Lemon Squeezy](https://www.lemonsqueezy.com/) and access your dashboard.

Navigate to **Settings > API** to generate an API key. You'll also need your Store ID, which you can find in your store settings.

Copy both values for the next step.

## Step 2. Create a Lemon Squeezy Payment Provider

Create a Lemon Squeezy payment provider in Casdoor:

|    Name       |   Name in Lemon Squeezy     |
|      ----     |   ----                      |  
|Category       |   Choose `Payment`          |
|Type           |   Choose `Lemon Squeezy`    |
|Client ID      |   Store ID from Step 1      |
|Client secret  |   API Key from Step 1       |

## Step 3. Add the Provider to Your Product

Add the Lemon Squeezy payment provider to your product in Casdoor. When users purchase your product, they'll be redirected to Lemon Squeezy's checkout page.

The product name in Casdoor should be set to the Variant ID from your Lemon Squeezy product. You can find this in your product's settings in the Lemon Squeezy dashboard.

:::tip

For accurate payment status tracking in production, configure webhooks in your Lemon Squeezy dashboard. Without webhooks, payment status is determined by checking if the checkout has expired.

:::
