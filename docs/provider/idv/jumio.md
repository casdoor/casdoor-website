---
title: Jumio ID verification
description: Use Jumio as an ID verification (KYC) provider in Casdoor.
keywords: [Jumio, ID Verification, identity, KYC]
authors: [hsluoyz]
---

[Jumio](https://www.jumio.com/) verifies government-issued IDs and supports KYC flows. Configure it as an **ID Verification** provider in Casdoor.

## Prerequisites

You need:

- A Jumio account with API access
- API credentials (Client ID and Client Secret)
- Your Jumio API endpoint URL

If you don't have a Jumio account, visit [jumio.com](https://www.jumio.com/) to sign up.

## Configuration

### 1. Get Jumio credentials

In the Jumio dashboard, open the API credentials section. Note your **API Token** (Client ID), **API Secret** (Client Secret), and **API endpoint URL** (e.g. `https://api.jumio.com`).

### 2. Create the provider in Casdoor

**Providers** → **Add**. Set **Category** to **ID Verification**, **Type** to **Jumio**, and fill in:
- **Client ID** — Jumio API Token  
- **Client Secret** — Jumio API Secret  
- **Endpoint** — Jumio API URL  

Save the provider.

### 3. Add to your application

Edit the application, add the Jumio provider in the Providers section, and save.

## How Verification Works

When a user initiates identity verification:

1. Casdoor calls the Jumio API with the user's ID information
2. Jumio initiates a verification transaction and returns a transaction reference
3. The user completes the verification workflow (in production scenarios, this involves document upload and selfie capture)
4. Jumio validates the submitted documents against the provided information
5. Upon successful verification, the user's account is marked as verified in Casdoor

## Testing the Provider

You can test your Jumio configuration from the provider edit page:

1. Ensure you have ID card information and real name filled in your user profile
2. Navigate to the provider edit page
3. Use the test functionality to verify that the provider is properly configured
4. Check the response to confirm successful API communication

## Important Notes

- Verification is a one-time process per user. Once verified, users cannot modify their identity information
- The current implementation initiates the verification workflow through Jumio's API v4
- For production deployments, ensure your Jumio account has sufficient API call quotas
- All verification attempts are logged for audit purposes
