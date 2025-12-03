---
title: FastSpring
description: Add FastSpring payment provider to your application
keywords: [FastSpring, payment]
authors: [Copilot]
---

:::note

This is an example of how to configure a **FastSpring** payment provider.

:::

FastSpring is a global e-commerce platform designed for digital commerce, handling payment processing, subscription management, and tax compliance for software and digital products.

## Step 1. Get Your API Credentials

Create an account at [FastSpring](https://fastspring.com/) and access your dashboard.

Navigate to [Integrations > API Credentials](https://dashboard.fastspring.com/developer) in your FastSpring account. Generate or locate your API credentials:

- **API Username**: Your FastSpring API username
- **API Password**: Your FastSpring API password

You'll also need your storefront path, which typically follows the format `yourcompany.onfastspring.com`.

## Step 2. Create a FastSpring Payment Provider

Create a FastSpring payment provider in Casdoor:

|    Name       |   Name in FastSpring            |
|      ----     |   ----                          |  
|Category       |   Choose `Payment`              |
|Type           |   Choose `FastSpring`           |
|Client ID      |   API Username from Step 1      |
|Client secret  |   API Password from Step 1      |
|Host           |   Your storefront path (e.g., `mycompany.onfastspring.com`)   |

## Step 3. Add the Provider to Your Product

Add the FastSpring payment provider to your product in Casdoor. When users purchase your product, they'll be redirected to FastSpring's checkout page to complete the transaction.

FastSpring creates transactions dynamically and returns users to your application after payment is completed.
