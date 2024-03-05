---
title: MFA / 2FA
description: Secure your account with MFA / 2FA
keywords: [MFA, 2FA, Authentication, Security, SMS, TOTP, Email]
authors: [leo220yuyaodog]
---

## About multi-factor authentication

MFA (Multi-Factor Authentication) is a security measure that can enhance the security of users and systems. It requires users to provide two or more factors of authentication to verify their identity when logging in or performing sensitive operations.

For Casdoor, the second form of authentication is a code that is sent as a text message or email. Once you enable MFA, Casdoor generates an authentication code every time someone attempts to sign in to your account. The only way someone can sign in to your account is if they know both your password and have access to the authentication code.

## Configuring MFA

1. On the user profile page, you can see the configuration of multi-factor authentication. If you cannot see it, make sure the organization has added the multi-factor authentication item in the account items table.

   ![mfa_config](/img/user/mfa/mfa_config.png)

2. Click the "setup" button.

   ![mfa_setup](/img/user/mfa/mfa_setup.png)

3. Type your password and click "Next Step".

   ![mfa_check_password](/img/user/mfa/mfa_check_password.png)

### Configuring multi-factor authentication using a TOTP mobile app

A time-based one-time password (TOTP) application automatically generates an authentication code that changes after a certain period of time. We recommend using:

- [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&gl=US)
- [Microsoft Authenticator](https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=en_US&gl=US).

:::tip

To configure authentication via TOTP on multiple devices, during setup, scan the QR code using each device at the same time. If 2FA is already enabled, and you want to add another device, you must reconfigure your TOTP app from the user profile page.

:::

![totp](/img/user/mfa/mfa_totp.png)

1. In the "Verify Code" step, do one of the following:

   - Scan the QR code with your mobile device's app. After scanning, the app displays a six-digit code that you can enter on Casdoor.
   - If you cannot scan the QR code, you can manually copy and enter the secret in your TOTP app instead.

2. The TOTP mobile application saves your account on Casdoor and generates a new authentication code every few seconds. On Casdoor, type the code into the "Passcode" field and click "Next Step".

3. Above the "Enable" button, copy your recovery codes and save them to your device. Save them to a secure location because your recovery codes can help you regain access to your account if you lose access.

   ![mfa_enable](/img/user/mfa/mfa_enable.png)

:::caution

Each recovery code can only be used once. If you use a recovery code to sign in, it will become invalid.

:::

### Configuring multi-factor authentication using text messages

If you have added your mobile phone number, Casdoor will use it to send you a text message.

![mfa_bound](/img/user/mfa/mfa_bound.png)

If you have not added your mobile phone number, you need to add it first.

![mfa_binding](/img/user/mfa/mfa_binding.png)

1. Select your country code and enter your mobile phone number.

2. Check if your information is correct and click "Send Code".

3. You will receive a text message with a security code. Then enter the code into the "Enter your code" field and click "Next Step".

4. Above the "Enable" button, copy your recovery codes and save them to your device. Save them to a secure location because your recovery codes can help you regain access to your account if you lose access.

### Configuring multi-factor authentication using email

Configuring email as your multi-factor authentication method is similar to using text messages.

1. Use your current email or enter your email address and click "Send Code".

2. Then enter the code into the "Enter your code" field and click "Next Step".

3. Above the "Enable" button, copy your recovery codes and save them to your device. Save them to a secure location because your recovery codes can help you regain access to your account if you lose access.

## Changing your preferred MFA method

You can add multiple MFA methods. Only the preferred method will be used when you sign in.

If you want to set a preferred MFA method, click the "Set preferred" button.

![preferred_mfa_method](/img/user/mfa/mfa_preferred_method.png)

A "Preferred" label will be displayed on your preferred method.

## Disabling multi-factor authentication

If you want to disable multi-factor authentication, click the "Disable" button. All your multi-factor authentication settings will be deleted.

![disable_mfa](/img/user/mfa/mfa_disable.png)
