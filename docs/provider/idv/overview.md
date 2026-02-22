---
title: ID verification provider overview
description: Verify user identity via third-party ID verification (KYC) providers.
keywords: [ID Verification, identity, verification, KYC]
authors: [hsluoyz]
---

**ID Verification** providers let users prove their identity (e.g. ID document + real name) through a third-party service. Once verified, the account is marked verified and sensitive fields are locked.

## How it works

1. Users fill in their ID card information (type and number) and real name in their account settings
2. They click the "Verify Identity" button to initiate verification
3. The configured ID Verification provider validates the submitted information
4. Upon successful verification, the user's account is marked as verified and sensitive fields are locked

Once verified, users cannot modify their real name, ID card type, ID card number, or related identity information, ensuring data integrity and preventing fraud.

## Add a provider

1. **Providers** → **Add**.
2. Set **Category** to **ID Verification**, choose the **Type**, enter credentials, and save.

After creating the provider, add it to your application's provider list so users can access the verification feature.

## Configuring Account Fields

For users to access verification, configure the relevant account fields in your organization:

1. Go to **Organizations** and edit your organization
2. In the **Account items** section, ensure these fields are properly configured:
   - **ID card type** - Should be visible so users can select their ID type
   - **ID card** - Should be visible for users to enter their ID number
   - **Real name** - Should be visible and modifiable by users before verification
   - **ID verification** - Controls who can see and use the verify button

The typical configuration sets these fields with "Public" view rule and "Self" modify rule, allowing users to manage their own identity information while keeping it visible to the system.

See [Account customization](/docs/organization/accountCustomization) for field configuration.

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
