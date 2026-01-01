---
title: Jumio
description: Integrate Jumio for identity verification
keywords: [Jumio, ID Verification, identity, KYC]
authors: [hsluoyz]
---

Jumio brings AI-powered identity verification to Casdoor, using advanced technology to validate government-issued IDs and authenticate users worldwide. When you need to verify identities across different countries and document types, Jumio's platform handles the complexity for you.

## Getting Your Credentials

Before you can use Jumio with Casdoor, you'll need an account with API access. Head over to [jumio.com](https://www.jumio.com/) to sign up if you haven't already. Once you're in, navigate to your dashboard's API credentials section. You'll find your API Token (which Casdoor calls Client ID) and API Secret (Client Secret) there. Also note your API endpoint URL—it typically looks like `https://api.jumio.com`.

## Configuring Casdoor

Setting up Jumio in Casdoor is straightforward. Open your Casdoor admin console and go to Providers. Click Add to create a new provider and fill in the details. Give it a descriptive name like "Jumio-Production", then select "ID Verification" from the Category dropdown and "Jumio" as the Type. Enter your Jumio API Token as the Client ID, your API Secret as the Client Secret, and your endpoint URL. Hit Save and you're halfway there.

Now attach the provider to your application. Navigate to your application's edit page, scroll to the Providers section, and add a new provider row. Select your newly created Jumio provider from the list and save the application configuration. Your users can now verify their identities through Jumio.

## How Verification Works

When a user clicks the verification button, Casdoor calls Jumio's API with the user's ID information. Jumio creates a verification transaction and returns a reference. In production scenarios, users would complete Jumio's full verification workflow—uploading their ID document and taking a selfie—but the integration handles all the communication behind the scenes. Once Jumio validates everything, Casdoor marks the user as verified and locks their identity fields.

You can test your setup from the provider edit page in Casdoor. Make sure you have ID card information and a real name filled in your user profile first. The test functionality will confirm that your API credentials are working correctly and that Casdoor can communicate with Jumio's servers.

## Production Considerations

Remember that verification is permanent—once a user completes verification, they can't modify their identity information anymore. The current implementation uses Jumio's API v4, so make sure your account has sufficient API call quotas before going live. All verification attempts are logged automatically for audit purposes.
