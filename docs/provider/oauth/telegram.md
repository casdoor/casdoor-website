---
title: Telegram
description: Add Telegram OAuth provider to your application
keywords: [Telegram, OAuth]
authors: [hsluoyz,oxkrypton]
---

Telegram Login Widget provides a secure way to authenticate users through their Telegram accounts. Unlike traditional OAuth providers, Telegram uses a widget-based approach with cryptographic verification.

## Create a Telegram Bot

Create a bot via [@BotFather](https://t.me/BotFather):

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

## Authentication flow

Users sign in via Telegram’s login widget; Casdoor validates the HMAC-SHA256 signature and timestamp per [Telegram’s spec](https://core.telegram.org/widgets/login#checking-authorization). Profile data includes user ID, name, username, and optional photo. Telegram does not provide email via the widget; collect email separately if needed.
