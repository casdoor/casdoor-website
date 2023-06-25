---
title: MFA / 2FA
description: Secure your account with MFA / 2FA
keywords: [MFA, 2FA, Authentication, Security, SMS, TOTP, Email]
authors: [leo220yuyaodog]
---

## About multi-factor authentication

MFA (Multi-Factor Authentication) is a security measure that can improve the security of users and systems. It requires 
users to provide two or more factors of authentication to verify their identity when logging in or performing sensitive operations.

For Casdoor, the second form of authentication is a code that's sent as a text message or email. After you enable MFA, 
Casdoor generates an authentication code any time someone attempts to sign in your account. The only way someone can sign in your account is if they know both your password and have access to the authentication code.

## Config MFA

1. In user profile page, you can see the configuration of multi-factor authentication. If you can't see it, make sure the organization has added
multi-factor authentication item in the account items table.

![mfa_config](/img/user/mfa/mfa_config.png)

2. Click the "setup" button.

![mfa setup](/img/user/mfa/mfa_setup.png)

3. Type your password and click "Next Step".

![mfa check password](/img/user/mfa/mfa_check_password.png)

### Configuring multi-factor authentication using a TOTP mobile app
A time-based one-time password (TOTP) application automatically generates an authentication code that changes after a
certain period of time. We recommend using:

- [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&gl=US)
- [Microsoft Authenticator](https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=en_US&gl=US).

:::tip
To configure authentication via TOTP on multiple devices, during setup, scan the QR code using each device at the same
time. If 2FA is already enabled, and you want to add another device, you must re-configure your TOTP app from user profile page.
:::

![totp](/img/user/mfa/mfa_totp.png)

1. In "Verify Code" step, do one of the following:
- Scan the QR code with your mobile device's app. After scanning, the app displays a six-digit code that you can enter on
  Casdoor.
- If you can't scan the QR code, you can manually copy and enter the secret in your TOTP app instead.

2. The TOTP mobile application saves your account on Casdoor and generates a new authentication code every few seconds.
   On Casdoor, type the code into the field "Passcode" and click "Next Step".

3. Above "Enable" button, copy your recovery codes and save to your device. Save them to a secure location because your
   recovery codes can help you get back into your account if you lose access.

![mfa enable](/img/user/mfa/mfa_enable.png)

:::caution
One recovery code can only be used once. If you use a recovery code to sign in, it will be invalid.
:::

### Configuring multi-factor authentication using text messages

If you have bound your mobile phone number, Casdoor will use it to send you a text message.

![mfa_bound](/img/user/mfa/mfa_bound.png)

If not, you need to bind your mobile phone number first.

![mfa_binding](/img/user/mfa/mfa_binding.png)

1. Select your country code and type your mobile phone number.

2. Check your information is correct, click "Send Code".

3. You'll receive a text message with a security code. Then type the code into the field "Enter your code" and click "Next Step".

4. Above "Enable" button, copy your recovery codes and save to your device. Save them to a secure location because your
   recovery codes can help you get back into your account if you lose access.

### Configuring multi-factor authentication using email

Config email as your multi-factor authentication method is similar to text messages. 

1. Use your current email or type your email address and click "Send Code".

2. Then type the code into the field "Enter your code" and click "Next Step".

3. Above "Enable" button, copy your recovery codes and save to your device. Save them to a secure location because your
   recovery codes can help you get back into your account if you lose access.

## Changing your preferred MFA method

You can add multiple MFA methods. Only the preferred method will be used when you sign in.   

If you want to set a preferred MFA method, click the "Set preferred" button.

![preferred mfa method](/img/user/mfa/mfa_preferred_method.png)

A "Preferred" label is displayed on your preferred method.

## Disable multi-factor authentication

If you want to disable multi-factor authentication, click the "Disable" button. All your multi-factor authentication config
will be deleted.

![disable mfa](/img/user/mfa/mfa_disable.png)
