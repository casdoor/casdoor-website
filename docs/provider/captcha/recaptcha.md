---
title: reCAPTCHA
description: Add reCAPTCHA to your application
keywords: [reCAPTCHA]
---

reCAPTCHA is provided by Google. And we use reCAPTCHA v2 Checkbox . You can see more details from this [link](https://developers.google.com/recaptcha).

## Create an API key pair

To start using reCAPTCHA, you need to [sign up for an API key pair](http://www.google.com/recaptcha/admin) for your site. The key pair consists of a site key and secret key. The site key is used to invoke reCAPTCHA service on your site or mobile application. The secret key authorizes communication between your application backend and the reCAPTCHA server to [verify the user's response](https://developers.google.com/recaptcha/docs/verify).

First, choose the [type of reCAPTCHA](https://developers.google.com/recaptcha/docs/versions) and then fill in authorized domains or [package names.](https://developer.android.com/guide/topics/manifest/manifest-element.html#package) After you have accepted the terms of service, click **Register** to get new API key pair.

![recaptcha create apiKey](/img/providers/captcha/recaptcha_create_apiKey.png)

Then you can get a site key and a secret key.

![recaptcha apiKey](/img/providers/captcha/recaptcha_apikey.png)

## Configure in Casdoor

Create a new provider in Casdoor.

Select category as  **Captcha** , type as  **reCAPTCHA** . And you need to fulfill the site key and the secret key which is created by last step.

![Recaptcha provider](/img/providers/captcha/recaptcha_provider.png)

And you can click **Preview** botton to preview the style of this captcha.

![Recaptcha preview](/img/providers/captcha/recaptcha_preview.png)

## Applied in application

Edit the application you want to configure in Casdoor. Select the provider just added and click the button **Save**.

![Recaptcha provider app](/img/providers/captcha/recaptcha_provider_app.png)
