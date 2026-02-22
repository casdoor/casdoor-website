---
title: Polar
description: Use Polar as a payment provider for digital products and subscriptions.
keywords: [Polar, payment]
authors: [hsluoyz]
---

[Polar](https://polar.sh/) provides checkout for developers and creators, with subscriptions, one-time payments, and licensing.

## 1. Get access token

Sign in at [Polar](https://polar.sh/). Open **Settings** → [Personal Access Tokens](https://polar.sh/settings) and create a token with permissions for checkouts and payments. Copy the token.

## 2. Create the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Payment**, **Type** to **Polar**. Put the access token in **Client secret**. **Client ID** is not used for Polar.

## 3. Attach to a product

Add the Polar provider to the product in Casdoor. Users are redirected to Polar for checkout and returned to your app when payment completes or is cancelled.
