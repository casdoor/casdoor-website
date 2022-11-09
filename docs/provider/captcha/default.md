---
title: Default
description: Using Casdoor default captcha in your application
keywords: [captcha]
author: Resulte
---

Default captcha implements generation and verification of image. A default captcha image is the sequence of digits 0-9 with the defined length(5).

## Configure in Casdoor

Create a new provider in Casdoor.

Select category as  **Captcha** , type as  **Default** .

![Default provider](/img/providers/captcha/default_provider.png)

And you can click **Preview** button to preview the style of this captcha.

![Default preview](/img/providers/captcha/default_preview.png)

## Applied in application

Edit the application you want to configure in Casdoor. Select the provider just added. There are two kinds of rules:

- `Always` Always turned on when login, send verification code.
- `None`

![Default provider app](/img/providers/captcha/default_provider_app.png)
