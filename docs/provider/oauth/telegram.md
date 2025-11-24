---
title: Telegram
description: Add Telegram OAuth provider to your application
keywords: [Telegram, OAuth]
authors: [Copilot]
---

Telegram Login Widget provides a secure way to authenticate users through their Telegram accounts. Unlike traditional OAuth providers, Telegram uses a widget-based approach with cryptographic verification.

## Create a Telegram Bot

To use Telegram authentication, you need to create a bot through BotFather:

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the prompts to create your bot
3. After creation, BotFather will provide you with a **bot token** - save this securely
4. Send `/setdomain` to BotFather and provide your domain (e.g., `example.com`)

:::tip

The bot token is sensitive information. Never share it publicly or commit it to version control.

:::

## Configure Telegram Provider in Casdoor

Add a Telegram OAuth provider in Casdoor with the following configuration:

- **Client ID**: Your bot's username (e.g., `MyAuthBot`)
- **Client Secret**: The bot token provided by BotFather

:::note Domain Verification

Authentication will only work from the domain you registered with BotFather using the `/setdomain` command. Make sure your Casdoor instance is accessible from this domain.

:::

## How It Works

Telegram authentication uses HMAC-SHA256 verification to ensure data authenticity:

1. Users click the Telegram login button and authenticate through the Telegram app or website
2. Telegram returns authentication data including user ID, name, username, and photo
3. Casdoor verifies the data using the bot token before creating or linking the user account

The authentication is handled entirely through Telegram's secure channels, and Casdoor validates the response using cryptographic signatures according to [Telegram's specification](https://core.telegram.org/widgets/login#checking-authorization).

## User Information

Telegram provides the following user information:

- **User ID**: Unique identifier for the Telegram account
- **First Name**: User's first name (always available)
- **Last Name**: User's last name (if provided)
- **Username**: Telegram username (if set by user)
- **Photo URL**: Profile photo (if available)

The display name in Casdoor follows this priority: full name (first + last) → username → user ID.

:::info

Telegram does not provide email addresses through the Login Widget. If your application requires email, consider enabling email verification after the initial authentication.

:::
