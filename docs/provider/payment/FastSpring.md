---
title: FastSpring
description: Use FastSpring as a payment provider for digital products and subscriptions.
keywords: [FastSpring, payment]
authors: [Copilot]
---

[FastSpring](https://fastspring.com/) handles payments, subscriptions, and tax for software and digital products.

## 1. Get credentials

Sign in at [FastSpring](https://fastspring.com/). Go to **Developer** → **API Credentials** and note your **API Username** and **API Password**. Note your storefront host (e.g. `yourcompany.onfastspring.com`).

## 2. Create the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Payment**, **Type** to **FastSpring**. Fill in:

| Casdoor       | FastSpring        |
|---------------|-------------------|
| Client ID     | API Username      |
| Client secret | API Password      |
| Host          | Storefront host (e.g. `mycompany.onfastspring.com`) |

## 3. Attach to a product

Add the FastSpring provider to the product in Casdoor. Users are redirected to FastSpring for checkout and returned to your app after payment.
