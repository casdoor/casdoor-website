---
title: Overview
description: Identity verification for users using ID Verification providers
keywords: [ID Verification, identity, verification, KYC]
authors: [hsluoyz]
---

Casdoor's ID Verification feature lets you confirm your users' real-world identities through trusted third-party services. This is particularly valuable for platforms requiring KYC (Know Your Customer) compliance, financial services, or any application where verifying user identity matters.

## How It Works

The verification process is straightforward. Users enter their ID card details (type and number) along with their real name in their account settings. When they click "Verify Identity", Casdoor sends this information to your configured verification provider—either Jumio for document verification or Alibaba Cloud for national ID database checks. The provider validates the details and returns a result.

Once verification succeeds, the user's account gets a verified badge and their identity fields lock automatically. They won't be able to change their real name, ID card type, or ID card number anymore. This protects against identity fraud and ensures data integrity throughout the user's lifecycle.

## Setting Up a Provider

Adding an ID Verification provider takes just a few steps. Navigate to the Providers section in your Casdoor admin panel and click Add. Select "ID Verification" from the Category dropdown—this category is now fully integrated into Casdoor's provider system. Choose your provider type (Jumio or Alibaba Cloud), enter the required API credentials, and save.

After creating the provider, remember to add it to your application's provider list. Users won't see the verification option until the provider is attached to their application.

## User Verification

The verification button appears on the user's account page when three conditions are met: they've filled in their ID card type, ID card number, and real name; they haven't been verified yet; and an ID Verification provider is configured in their application. After successful verification, these fields become read-only and a verification badge appears on their profile.

## API Integration

For developers integrating identity verification programmatically, the `/api/verify-identification` endpoint handles all verification requests. Users can verify themselves without additional parameters, while administrators can verify other users by providing owner and name parameters. The verification status appears in the user's `isVerified` field and their `realName` is included in JWT tokens and OIDC userinfo responses, making it available throughout your application stack.
