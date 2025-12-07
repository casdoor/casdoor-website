---
title: Jumio
description: Integrate Jumio for identity verification
keywords: [Jumio, ID Verification, identity, KYC]
authors: [copilot]
---

Jumio is a leading identity verification platform that uses AI-powered technology to verify government-issued IDs and authenticate users. This guide explains how to configure Jumio as an ID Verification provider in Casdoor.

## Prerequisites

Before integrating Jumio with Casdoor, you'll need:

- A Jumio account with API access
- API credentials (Client ID and Client Secret)
- Your Jumio API endpoint URL

If you don't have a Jumio account, visit [jumio.com](https://www.jumio.com/) to sign up.

## Configuration Steps

### Step 1: Obtain Jumio Credentials

1. Log in to your Jumio account dashboard
2. Navigate to the API credentials section
3. Generate or locate your API Token (Client ID) and API Secret (Client Secret)
4. Note your API endpoint URL (e.g., `https://api.jumio.com`)

### Step 2: Create Provider in Casdoor

1. Go to the Casdoor admin console
2. Click **Providers** in the top navigation
3. Click **Add** to create a new provider
4. Configure the provider:
   - **Name**: Choose a descriptive name (e.g., "Jumio-Production")
   - **Category**: Select "ID Verification"
   - **Type**: Select "Jumio"
   - **Client ID**: Enter your Jumio API Token
   - **Client Secret**: Enter your Jumio API Secret
   - **Endpoint**: Enter your Jumio API endpoint URL

5. Click **Save**

### Step 3: Add Provider to Application

1. Navigate to your application's edit page
2. Scroll to the Providers section
3. Click **Add** to add a new provider row
4. Select your newly created Jumio provider
5. Save the application configuration

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
