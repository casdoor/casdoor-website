---
title: Dummy
description: Use the Dummy payment provider for testing and development
keywords: [Dummy, payment, testing, development]
authors: [Copilot]
---

The Dummy payment provider is a mock payment provider designed for testing and development. It simulates the payment flow without connecting to any real payment gateway, making it ideal for testing your product purchase flow before integrating with production payment providers.

## How It Works

When a user initiates a purchase with the Dummy provider, the payment is immediately marked as successful and the user is redirected to the payment result page. No actual money transaction occurs.

## Create a Dummy Payment Provider

To set up the Dummy payment provider in Casdoor:

|    Name       |   Value            |
|      ----     |   ----             |
|Category       |   Choose `Payment` |
|Type           |   Choose `Dummy`   |

No additional configuration like API keys or secrets is required.

## Add the Provider to Your Product

After creating the Dummy payment provider, add it to your product so users can "purchase" the product during testing. When you're ready to go live, simply replace it with a real payment provider like Stripe or PayPal.
