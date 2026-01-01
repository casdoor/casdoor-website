---
title: Default
description: Using Casdoor's default captcha in your application
keywords: [captcha]
authors: [Resulte]
---

The default captcha implementation generates and verifies an image. In the default captcha image, a sequence of digits 0-9 is used with a defined length of 5.

## Configuring in Casdoor

To configure the default captcha in Casdoor, follow these steps:

1. Create a new provider in Casdoor.
2. Select the category as **Captcha**, and the type as **Default**.

    ![Default provider](/img/providers/captcha/default_provider.png)

3. Click on the **Preview** button to preview the style of this captcha.

    ![Default preview](/img/providers/captcha/default_preview.png)

## Applying in your application

To apply the default captcha in your application, do the following:

1. Edit the application you want to configure in Casdoor.
2. Select the provider that you just added. There are three types of rules available:

- `Always`: Always requires human-machine verification during login.
- `None`: Never requires human-machine verification. The account will be blocked if it attempts to login with the wrong password for the 5th time within 15 minutes. The block will be lifted after 15 minutes. This applies to all authentication methods, including password and LDAP login.
- `Dynamic`: After 5 failed login attempts, human-machine verification will be required but the account will not be blocked. This applies to all authentication methods, including password and LDAP login.

![Default provider app](/img/providers/captcha/default_provider_app.png)

We also provide a demo video to demonstrate the differences in rules, which we hope will be helpful to you.

<video src="/video/provider/default_provider_app.mp4" controls="controls" width="100%"></video>
