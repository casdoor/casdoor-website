---
title: hCaptcha
description: Add hCaptcha to your application
keywords: [hCaptcha]
authors: [Resulte]
---

hCaptcha is a captcha service provider, similar to reCAPTCHA. You can find more details about hCaptcha [here](https://www.hcaptcha.com/).

## Create an API key pair

To start using hCaptcha, you need to sign up for an API key pair for your site. You can obtain your site key on your [profile page](https://dashboard.hcaptcha.com/settings).

Once you have signed up, you will receive a site key and a secret key.

## Configure in Casdoor

To configure hCaptcha in Casdoor, create a new provider.

Select the category as **Captcha** and the type as **hCaptcha**. Fill in the site key and secret key obtained in the previous step.

![hCaptcha provider](/img/providers/captcha/hcaptcha_provider.png)

You can click the **Preview** button to see how the captcha style will look.

![hCaptcha preview](/img/providers/captcha/hcaptcha_preview.png)

## Apply in your application

Go to the application you want to configure in Casdoor. Select the provider you just added and click the **Save** button.

![hCaptcha provider app](/img/providers/captcha/hcaptcha_provider_app.png)
