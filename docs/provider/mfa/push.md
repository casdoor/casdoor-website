---
title: Push Notification
description: Configure push notification provider for MFA
keywords: [Push Notification, MFA, provider, authentication]
authors: []
---

Push notification MFA enables users to receive verification codes through mobile push services during authentication. This method leverages Casdoor's existing notification provider infrastructure, supporting services like Duo, Pushover, Telegram, and 20+ other providers.

## Configure Push Notification Provider

To add a push notification provider for MFA:

1. Navigate to the **Providers** page and click **Add**.

2. Set the **Category** to **Notification** and choose your preferred **Type** (e.g., Telegram, Pushover, Custom HTTP).

3. Configure the provider-specific settings based on your chosen notification service.

4. Click **Save** to create the provider.

## Use in Application

After creating the notification provider, add it to your application:

1. Go to your application's edit page.

2. Add the notification provider to the **Providers** list.

3. Users can now select push notification as their MFA method when configuring multi-factor authentication.

## User Setup Flow

During MFA setup, users will:

1. Select "Use Push Notification" as their MFA method.

2. Enter their push notification receiver (device token or user ID).

3. Select the notification provider from the configured options.

4. Receive a verification code via push notification.

5. Enter the verification code to complete setup and receive recovery codes.

## Authentication Flow

When push notification MFA is enabled, users will receive a verification code via push notification during login. They must enter this code to complete authentication.
