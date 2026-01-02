---
title: Overview
description: Identity verification for users using ID Verification providers
keywords: [ID Verification, identity, verification, KYC]
authors: [hsluoyz]
---

Casdoor's ID Verification providers enable real-world identity verification for your users. When configured, users can verify their identity by submitting their ID card information and real name, which gets validated through third-party verification services.

## How It Works

Identity verification in Casdoor follows a straightforward process:

1. Users fill in their ID card information (type and number) and real name in their account settings
2. They click the "Verify Identity" button to initiate verification
3. The configured ID Verification provider validates the submitted information
4. Upon successful verification, the user's account is marked as verified and sensitive fields are locked

Once verified, users cannot modify their real name, ID card type, ID card number, or related identity information, ensuring data integrity and preventing fraud.

## Setting Up a Provider

To add an ID Verification provider:

1. Navigate to **Providers** in the Casdoor admin panel
2. Click **Add** to create a new provider
3. Select **ID Verification** from the Category dropdown
4. Choose your provider type
5. Enter the required credentials
6. Save the provider configuration

After creating the provider, add it to your application's provider list so users can access the verification feature.

## Configuring Account Fields

For users to access the verification feature, you need to configure the relevant account fields in your organization:

1. Go to **Organizations** and edit your organization
2. In the **Account items** section, ensure these fields are properly configured:
   - **ID card type** - Should be visible so users can select their ID type
   - **ID card** - Should be visible for users to enter their ID number
   - **Real name** - Should be visible and modifiable by users before verification
   - **ID verification** - Controls who can see and use the verify button

The typical configuration sets these fields with "Public" view rule and "Self" modify rule, allowing users to manage their own identity information while keeping it visible to the system.

See [Account Customization](/docs/organization/accountCustomization) for detailed information on configuring these fields.

## User Verification

Users can verify their identity from their account page. The verification button appears when:

- The user has filled in their ID card type, ID card number, and real name
- The user hasn't been verified yet
- An ID Verification provider is configured in their application

After verification, these fields become read-only and a verification badge appears on their profile.

## API Integration

Identity verification is available through the `/api/verify-identification` endpoint. The API supports:

- Self-verification: Users can verify themselves without additional parameters
- Admin verification: Admins can verify other users by providing owner and name parameters
- Provider selection: Optionally specify which provider to use for testing purposes

The verification status is reflected in the user's `isVerified` field and `realName` is included in JWT tokens and OIDC userinfo responses.
