---
title: Push Notification
description: Configure push notification provider for MFA
keywords: [Push Notification, MFA, provider, authentication]
authors: [nomeguy]
---

Push notification MFA enables users to receive verification codes through mobile push services during authentication. This method leverages Casdoor's existing notification provider infrastructure, supporting services like Duo, Pushover, Telegram, and 20+ other providers.

## Configure Notification Provider

Push notification MFA uses notification providers to send verification codes. To add a notification provider:

1. **Providers** → **Add**.
2. Set **Category** to **Notification** and **Type** to your preferred service (e.g. Telegram, Pushover, Custom HTTP).
3. Fill in the provider’s required settings.
4. Save.

## Use in Application

After creating the notification provider, add it to your application:

1. Edit the application and add the notification provider to its **Providers** list.
2. Users can then choose push notification as their MFA method.

## User Setup Flow

During MFA setup, users will:

1. Select "Use Push Notification" as their MFA method.

2. Enter their push notification receiver (device token or user ID).

3. Select the notification provider from the configured options.

4. Receive a verification code via push notification.

5. Enter the verification code to complete setup and receive recovery codes.

## Authentication Flow

When push notification MFA is enabled, users will receive a verification code via push notification during login. They must enter this code to complete authentication.
