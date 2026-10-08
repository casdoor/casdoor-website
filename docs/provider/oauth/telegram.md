---
title: Add Telegram as a sign-in provider
sidebar_label: Telegram
description: Let users sign in to Casdoor with their Telegram account through the Telegram Login Widget.
keywords: [Telegram, OAuth]
authors: [hsluoyz,oxkrypton]
---

This guide explains how to let users sign in to Casdoor with their Telegram account. Telegram doesn't use the OAuth 2.0 redirect flow: users sign in through the Telegram Login Widget, and Casdoor verifies the signed data that the widget returns.

---

#### Learning outcomes

- Create a Telegram bot and register your domain with it.
- Add Telegram as a provider in Casdoor.
- Understand which user data Casdoor receives.

#### What you need

- A Telegram account
- A domain under which users open Casdoor
- Administrator access to the Casdoor admin console

---

## Create a Telegram bot

1. In Telegram, open [@BotFather](https://t.me/BotFather).
1. Send `/newbot` and follow the prompts.

   ![Bot creation with BotFather](/img/providers/OAuth/telegrambot.png)

1. Save the bot token that BotFather sends. Keep it secret: don't share it or commit it to version control.

   ![Bot token from BotFather](/img/providers/OAuth/telegramclient.png)

1. Send `/setdomain` and enter the domain of your Casdoor instance, for example `example.com`.

   ![Domain registration with BotFather](/img/providers/OAuth/telegramdomain.png)

## Add the provider in Casdoor {#add-telegram-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Telegram`.
1. Fill in the fields:

   | Field | Value |
   |---|---|
   | **Client ID** | The username of the bot, without `@`, for example `casdoor_telegram_bot` |
   | **Client secret** | The bot token |

   ![Telegram provider in Casdoor](/img/providers/OAuth/telegramprovider.png)

1. Save the provider and add it to an application. See [Add providers to an application](/docs/application/providers).

:::note
The widget works only on the domain that you registered with `/setdomain`. Users must open Casdoor under that domain.
:::

## Verify the result {#logging-in-with-telegram}

Open the sign-in page of the application and sign in with Telegram.

<video src="/video/provider/oauth/telegram_login.mp4" controls="controls" width="100%"></video>

## User data {#authentication-flow}

Casdoor verifies the HMAC-SHA256 signature and the timestamp of the data from the widget, as the [Telegram specification](https://core.telegram.org/widgets/login#checking-authorization) describes. It receives the Telegram user ID, the name, the username, and, if available, the photo.

- **Email**: The widget doesn't provide the email address. Collect it separately if you need it.
- **Username**: The Telegram username is optional. For a user without one, Casdoor generates the username `telegram_<user-id>`, for example `telegram_123456789`. The ID doesn't change, so the user keeps the same username at every sign-in.

## See also

- [OAuth providers](/docs/provider/oauth/overview)
