---
title: Set up WebAuthn sign-in
sidebar_label: WebAuthn
description: Let users sign in to Casdoor with passkeys, fingerprint or face recognition, Windows Hello, or a security key through WebAuthn.
keywords: [webauthn, passkey, FIDO]
authors: [ComradeProgrammer]
---

This guide explains how to turn on WebAuthn sign-in. Users then sign in with an authenticator that is built in to their device, such as a fingerprint reader, face recognition, or Windows Hello, or with a security key such as a YubiKey, instead of or in addition to a password.

---

#### Learning outcomes

- Configure Casdoor for WebAuthn.
- Offer WebAuthn as a sign-in method of an application.
- Register a WebAuthn credential for a user.

#### What you need

- Access to `conf/app.conf` of your Casdoor instance
- Casdoor served over HTTPS. WebAuthn requires HTTPS, except on `localhost`.
- A device with a WebAuthn authenticator

---

## About WebAuthn

Web Authentication (WebAuthn) is a standard of the W3C and the FIDO Alliance that signs users in with public-key cryptography. Casdoor stores a public key. The private key never leaves the device of the user. To sign in, the user proves possession of the private key, typically with a biometric check or a security key. A credential is bound to the user, the authenticator, and the origin of the site.

For an introduction, see [webauthn.guide](https://webauthn.guide/).

## Configure Casdoor

1. In `conf/app.conf`, set `origin` to the exact URL under which users open Casdoor:

   ```ini
   origin = "http://localhost:8000"
   ```

1. Restart Casdoor.

## Add WebAuthn to the sign-in methods

1. In the Casdoor admin console, go to **Identity** > **Applications** and open the application.
1. In **Signin methods**, add **WebAuthn**.
1. Save the application.

## Register a credential

Each user registers their own credential:

1. Sign in and open **My Account**.
1. In **WebAuthn credentials**, add a credential and follow the prompt of your device.

   ![WebAuthn credentials on the account page](/img/webauthn/webauthn.png)

To remove a credential, delete it from the same list.

## Verify the result

1. Sign out.
1. On the sign-in page, select the **WebAuthn** method.
1. Enter your username and click **Sign in with WebAuthn**.
1. Complete the prompt of your authenticator, for example with your fingerprint or Windows Hello.

   ![Sign-in page with the WebAuthn method](/img/webauthn/login_webauthn.png)

## See also

- [Sign-in methods](/docs/application/signin-methods)
- [Multi-factor authentication](/docs/user/multi-factor-authentication)
- [Set up Face ID sign-in](/docs/how-to-connect/face-id)
