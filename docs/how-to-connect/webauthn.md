---
title: WebAuthn
description: Sign in with WebAuthn (passkeys, fingerprint, face, security keys).
keywords: [webauthn, passkey, FIDO]
authors: [ComradeProgrammer]
---

Casdoor supports **WebAuthn** so users can sign in with built-in authenticators (fingerprint, face, Windows Hello) or security keys (e.g. YubiKey) instead of (or in addition to) a password.

## What is WebAuthn?

WebAuthn (Web Authentication API) is a W3C/FIDO standard that uses public-key cryptography for registration and sign-in. The server stores a public key; the private key stays on the user’s device. Sign-in works by proving possession of the private key (e.g. via biometrics or a security key). Credentials are bound to the user, the authenticator, and the site origin.

For more detail: [webauthn.guide](https://webauthn.guide/).

## Enable WebAuthn in Casdoor

### Step 0: Configuration

1. In `conf/app.conf`, set **origin** to the exact URL of your Casdoor site:

   ```ini
   origin = "http://localhost:8000"
   ```

   :::caution
   WebAuthn requires **HTTPS** in production; `localhost` is allowed for development.
   :::

2. As an admin, open the application edit page and turn on **Enable WebAuthn signin** (off by default).

### Step 1: Register a credential

Go to **My Account**. Use **Add WebAuthn Credential** and follow your device’s prompt to register a new credential. You can delete credentials from the list.

![WebAuthn1](/img/webauthn/webauthn.png)

### Step 2: Sign in with WebAuthn

Sign out, then on the login page select the WebAuthn method, enter your username, and click sign in. Complete the authenticator step (e.g. fingerprint or Windows Hello).

![WebAuthn2](/img/webauthn/login_webauthn.png)
