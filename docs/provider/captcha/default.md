---
title: Use the default captcha
sidebar_label: Default
description: Use the built-in image captcha of Casdoor, which needs no external service.
keywords: [captcha, default]
authors: [Resulte]
---

This guide explains how to use the built-in captcha of Casdoor. It shows an image with five digits that the user types. It needs no external service and no keys.

---

#### Learning outcomes

- Add the default captcha as a provider.

#### What you need

- Administrator access to the Casdoor admin console

---

## Configure in Casdoor {#configure-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Captcha` and **Type** to `Default`.

   ![Default captcha provider](/img/providers/captcha/default_provider.png)

1. Click **Preview** to check the captcha.

   ![Preview of the default captcha](/img/providers/captcha/default_preview.png)

1. Save the provider.

## Next steps

Add the provider to an application and choose when the captcha appears. See [Add the captcha to an application](/docs/provider/captcha/overview#use-in-an-application).

## See also

- [Captcha providers](/docs/provider/captcha/overview)
