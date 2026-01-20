---
title: Telegram
description: Add Telegram OAuth provider to your application
keywords: [Telegram, OAuth]
authors: [hsluoyz,oxkrypton]
---

Telegram Login Widget provides a secure way to authenticate users through their Telegram accounts. Unlike traditional OAuth providers, Telegram uses a widget-based approach with cryptographic verification.

## Create a Telegram Bot

To use Telegram authentication, you need to create a bot through BotFather:

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the prompts to create your bot
![Create Telegram Bot](/img/providers/OAuth/telegrambot.png)
3. After creation, BotFather will provide you with a **bot token** - save this securely
![Telegram client](/img/providers/OAuth/telegramclient.png)
4. Send `/setdomain` to BotFather and provide your domain (e.g., `example.com`)
![Telegram Setdomain](/img/providers/OAuth/telegramdomain.png)

:::tip

The bot token is sensitive information. Never share it publicly or commit it to version control.

:::

## Add Telegram Provider in Casdoor

1. Navigate to **Providers** in Casdoor's admin panel
2. Click **Add** to create a new provider
3. Set **Category** to `OAuth` and **Type** to `Telegram`
4. Configure the provider:
   - **Client ID**: Your bot's username (e.g. `casdoor_telegram_bot` no need @)
   - **Client Secret**: The bot token provided by BotFather
![Telegram provider](/img/providers/OAuth/telegramprovider.png)

:::note Domain Verification

Authentication will only work from the domain you registered with BotFather using the `/setdomain` command. Make sure your Casdoor instance is accessible from this domain.

:::

## Logging In with Telegram

With the setup completed, users can now log in with Telegram.

<video src="/video/provider/oauth/telegram_login.mp4" controls="controls" width="100%"></video>

## Authentication Flow

When users choose to sign in with Telegram, Casdoor redirects them to a dedicated widget page where they authenticate through Telegram's official login widget. After clicking the login button, users verify their identity through the Telegram app or website. Once authorized, Telegram returns their profile information to Casdoor's callback endpoint.

The authentication data undergoes strict validation - Casdoor verifies the cryptographic HMAC-SHA256 signature and checks the timestamp to prevent replay attacks. This follows [Telegram's security specification](https://core.telegram.org/widgets/login#checking-authorization) to ensure the data hasn't been tampered with. The system also handles edge cases like empty authorization codes gracefully, automatically prompting users to retry if needed.

Telegram provides basic profile information including user ID, first and last name, username (if set), and profile photo (if available). Note that Telegram does not provide email addresses through the Login Widget. If your application requires email verification, you'll need to collect this separately after the initial authentication.
