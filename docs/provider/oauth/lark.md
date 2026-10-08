---
title: Add Lark as an OAuth provider
sidebar_label: Lark
description: Let users sign in to Casdoor with their Lark (Feishu) account.
keywords: [Lark, OAuth, Feishu]
authors: [Chinoholo0807]
---

This guide explains how to let users sign in to Casdoor with their Lark (Feishu) account.

---

#### Learning outcomes

- Create a Lark application.
- Add Lark as an OAuth provider in Casdoor.

#### What you need

- A Lark or Feishu organization
- Administrator access to the Casdoor admin console

---

## Create a Lark application {#1-create-a-lark-application}

1. On the [Lark Open Platform](https://open.feishu.cn/), create an application and turn it on. Note the App ID and the App Secret from its basic information.

   ![New application on the Lark Open Platform](/img/providers/OAuth/lark_create_app.png)

1. In the security settings, add the callback URL of Casdoor, `<your-casdoor-domain>/callback`, for example `https://door.example.com/callback`, as a redirect URL.

   ![Redirect URL of the application](/img/providers/OAuth/lark_redirect_url.png)

## Add the provider in Casdoor {#2-create-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Lark`.
1. Fill in the fields:

   | Casdoor       | Lark        |
   |---------------|-------------|
   | Client ID     | App ID      |
   | Client secret | App Secret  |

   ![Lark provider in Casdoor](/img/providers/OAuth/lark_provider_conf_detail.png)

1. Save the provider.

## Usernames {#username-handling}

Casdoor takes the username from the first of the following values that the response of Lark contains:

1. `UserId`
1. `UnionId`, which identifies the user across Lark organizations
1. `OpenId`, which is always present

Sign-in therefore works even when some fields are missing.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [Lark syncer](/docs/syncer/Lark)
