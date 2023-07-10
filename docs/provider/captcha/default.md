---
title: Default
description: Using Casdoor default captcha in your application
keywords: [captcha]
authors: [Resulte]
---

Default captcha implements generation and verification of image. A default captcha image is the sequence of digits 0-9 with the defined length(5).

## Configure in Casdoor

Create a new provider in Casdoor.

Select category as  **Captcha** , type as  **Default** .

![Default provider](/img/providers/captcha/default_provider.png)

And you can click **Preview** button to preview the style of this captcha.

![Default preview](/img/providers/captcha/default_preview.png)

## Applied in application

Edit the application you want to configure in Casdoor. Select the provider just added. There are three kinds of rules:

- `Always` Always turned on human-machine verification when login.
- `None` Never require human-machine verification, the accout will be blocked when it attempted to login into the same application with wrong password for the 5st time within 15 minutes. And it will be unblocked after 15 minutes.
- `Dynamic` After 5 failed login attempts, the account will not be blocked but instead, human-machine verification will be required.

![Default provider app](/img/providers/captcha/default_provider_app.png)

We also provide a demo video to demonstrate the differences in rules, which we hope will be helpful to you

<video src="/video/provider/default_provider_app.mp4" controls="controls" width="100%"></video>
