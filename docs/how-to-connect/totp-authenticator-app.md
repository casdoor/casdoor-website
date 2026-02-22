---
title: Casdoor Authenticator app
description: TOTP authenticator app for iOS and Android, synced with Casdoor.
keywords: [authenticator, 2fa, TOTP, MFA]
authors: [IZUMI-Zu]
---

**Casdoor Authenticator** ([app.casdoor.org](https://app.casdoor.org/)) is an open-source TOTP app ([GitHub](https://github.com/casdoor/casdoor-authenticator)) similar to Google Authenticator or Microsoft Authenticator. It provides MFA with time-based one-time passwords (TOTP) on iOS and Android and can sync accounts with Casdoor.

### Features

- **MFA** — Generate TOTP codes for 2FA.
- **Offline** — Codes work without internet.
- **Sync** — Accounts sync across devices via Casdoor.
- **Privacy** — Data encrypted and stored securely.
- **UI** — Simple, intuitive interface.

| Android | iOS |
|---------|-----|
| ![android](/img/totp-authenticator-app/android.png) | ![ios](/img/totp-authenticator-app/ios.png) |

## What is TOTP?

**TOTP** (Time-based One-Time Password) is a standard 2FA method. Codes are generated from a shared secret and the current time ([RFC 6238](https://tools.ietf.org/html/rfc6238)): they change every 30 seconds, work offline, and are widely supported.

## Using the app

### Step 0: Install

- **Android**: [Releases](https://github.com/casdoor/casdoor-authenticator/releases) or [app.casdoor.org](https://app.casdoor.org).
- **iOS**: See [app.casdoor.org](https://app.casdoor.org) and the [repo](https://github.com/casdoor/casdoor-authenticator).
- **Build from source**: [Casdoor Authenticator – Building from source](https://github.com/casdoor/casdoor-authenticator#building-from-source).

### Step 1: Enable MFA account storage (optional)

To store TOTP accounts in Casdoor, enable the **MFA accounts** setting on the Casdoor server.

![Mfa account setting](/img/totp-authenticator-app/mfa-account-setting.png)

### Step 2: Connect to Casdoor

After installing the app (and enabling MFA accounts if you use sync), connect in one of these ways:

| Method | Steps |
|--------|--------|
| **Manual** | Tap **Enter Server Manually**, enter server URL, client ID, and organization name, then sign in. |
| **QR code** | Tap **Scan QR Code**, scan the QR from **My Account** → **MFA accounts** on the Casdoor server. |
| **Demo** | Tap **Try Demo Server** to use the preconfigured demo instance. |

![Login](/img/totp-authenticator-app/login.png)

You can then view TOTP codes and manage 2FA accounts in the app.

## Migration from other authenticators

### From Google Authenticator

In Google Authenticator: **Menu** → **Transfer accounts** → select accounts → **Export** (QR code). In Casdoor Authenticator, scan that QR to import.

![Export TOTP data](/img/totp-authenticator-app/google-export.png)
![Import TOTP data from Google Authenticator](/img/totp-authenticator-app/import-totp-google.gif)

### From Microsoft Authenticator (Android, root required)

1. On the device with Microsoft Authenticator, the app data is under `/data/data/com.azure.authenticator/databases/`. Root access is required to read it.
2. Copy the `PhoneFactor` database file.
3. In Casdoor Authenticator: import → **Import from Microsoft Authenticator** → select the `PhoneFactor` file.
4. The app imports the TOTP accounts.

![Import TOTP data from Microsoft Authenticator](/img/totp-authenticator-app/import-totp-microsoft.gif)
