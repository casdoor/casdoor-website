---
title: Add Gitee as an OAuth provider
sidebar_label: Gitee
description: Let users sign in to Casdoor with their Gitee account.
keywords: [Gitee, OAuth]
authors: [ErikQQY]
---

This guide explains how to let users sign in to Casdoor with their Gitee account.

---

#### Learning outcomes

- Create an OAuth application on Gitee.
- Add Gitee as an OAuth provider in Casdoor.

#### What you need

- A Gitee account
- Administrator access to the Casdoor admin console

---

## Create a Gitee application

1. Open [Gitee OAuth applications](https://gitee.com/oauth/applications) and create an application, or open an existing one.

   ![Gitee workbench](/img/providers/OAuth/giteebench.png)

1. Fill in the name, the description, and the homepage. Set the authorization callback URL to the callback URL of Casdoor, `https://<your-casdoor-host>/callback`. See [Redirect URL and callback URL](/docs/application/config#how-the-flow-works).

   ![Gitee application form](/img/providers/OAuth/gitee.png)

1. Select the permissions that you need, including `emails`, so that Casdoor can read the email address. Without the email scope, the authorization can fail.

   ![Email scope of the Gitee application](/img/giteescope.jpg)

1. Create the application and copy the **Client ID** and the **Client Secret**.

   ![Client ID and client secret](/img/providers/OAuth/giteeclient.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Gitee`.
1. Enter the **Client ID** and the **Client secret**.

   ![Gitee provider in Casdoor](/img/providers/OAuth/giteeprovider.png)

1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
