---
title: reCAPTCHA
description: Add reCAPTCHA to your application
keywords: [reCAPTCHA]
authors: [Resulte]
---

reCAPTCHA is provided by Google, and we use reCAPTCHA v2 Checkbox. You can find more details about it at this [link](https://developers.google.com/recaptcha).

## Create an API key pair

To start using reCAPTCHA, you need to [sign up for an API key pair](http://www.google.com/recaptcha/admin) for your site. The key pair consists of a site key and secret key. The site key is used to invoke the reCAPTCHA service on your site or mobile application. The secret key authorizes communication between your application backend and the reCAPTCHA server to [verify the user's response](https://developers.google.com/recaptcha/docs/verify).

First, choose the [type of reCAPTCHA](https://developers.google.com/recaptcha/docs/versions) and then fill in the authorized domains or [package names](https://developer.android.com/guide/topics/manifest/manifest-element#package). After you have accepted the terms of service, click **Register** to obtain a new API key pair.

![reCAPTCHA create apiKey](/img/providers/captcha/recaptcha_create_apiKey.png)

You will then receive a site key and a secret key.

![reCAPTCHA apiKey](/img/providers/captcha/recaptcha_apikey.png)

## Configure in Casdoor

Create a new provider in Casdoor.

Select the category as **Captcha** and the type as **reCAPTCHA**. You need to provide the site key and secret key created in the previous step.

![reCAPTCHA provider](/img/providers/captcha/recaptcha_provider.png)

You can click the **Preview** button to see the style of this captcha.

![reCAPTCHA preview](/img/providers/captcha/recaptcha_preview.png)

## Apply in the application

Edit the application you want to configure in Casdoor. Select the provider you just added and click the **Save** button.

![reCAPTCHA provider app](/img/providers/captcha/recaptcha_provider_app.png)
