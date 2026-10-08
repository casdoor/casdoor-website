---
title: Add Baidu as an OAuth provider
sidebar_label: Baidu
description: Let users sign in to Casdoor with their Baidu account.
keywords: [Baidu, Baidu OAuth]
authors: [Steve0x2a]
---

This guide explains how to let users sign in to Casdoor with their Baidu account.

---

#### Learning outcomes

- Create a Baidu application and register the domain of Casdoor.
- Add Baidu as an OAuth provider in Casdoor.

#### What you need

- A Baidu developer account. See [Baidu Open Auth](https://openauth.baidu.com/doc/regdevelopers.html?qq-pf-to=pcqq.c2c).
- Administrator access to the Casdoor admin console

---

## Create a Baidu application

1. [Create an application](http://developer.baidu.com/console#app/create) in the Baidu developer console.

   ![Baidu application creation](/img/providers/OAuth/baiduapp.png)

1. In the security settings of the application, add the domain of Casdoor in the domain setting.

   ![Security settings of the application](/img/providers/OAuth/baidusetting.png)

   ![Domain setting](/img/providers/OAuth/baidudomain.png)

   :::caution
   Enter the domain in the domain setting, not the full callback URL in the callback URL field: Baidu often rejects the full URL there, and sign-in then fails. Baidu accepts only one domain or URL.
   :::

1. Copy the **Client ID** and the **Client Secret**.

   ![Client ID and client secret](/img/providers/OAuth/baiduclient.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Baidu`.
1. Enter the **Client ID** and the **Client secret**.

   ![Baidu provider in Casdoor](/img/providers/OAuth/baiduprovider.png)

1. Save the provider.

Baidu returns a masked username, and Casdoor uses the masked value as the username.

## Troubleshooting

If Baidu reports a wrong redirect URL:

1. Add the domain in the domain setting, as described above.
1. Reset the secret. Baidu may show an error, but the secret is updated after you reload the page.
1. If sign-in still fails, delete the application and create a new one. Set the domain first.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
