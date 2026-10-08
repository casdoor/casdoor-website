---
title: Add DingTalk as an OAuth provider
sidebar_label: DingTalk
description: Let users sign in to Casdoor with their DingTalk account.
keywords: [DingTalk, OAuth]
authors: [Marvelousp4]
---

This guide explains how to let users sign in to Casdoor with their DingTalk account.

---

#### Learning outcomes

- Configure a DingTalk application for Casdoor.
- Add DingTalk as an OAuth provider in Casdoor.

#### What you need

- An application on the [DingTalk Open Platform](https://open-dev.dingtalk.com/)
- Administrator access to the Casdoor admin console

---

## Configure the DingTalk application

1. Open your application on the [DingTalk Open Platform](https://open-dev.dingtalk.com/) and note its AppKey and AppSecret.

   ![DingTalk application credentials](/img/providers/OAuth/dingtalkapp.png)

1. Add the domain of Casdoor, for example `https://your-casdoor.com`, as the redirect domain.

   ![Redirect domain of the application](/img/providers/OAuth/dingtalkredirect.png)

1. Under **Permissions Management**, turn on **Contact.User.Read**. Casdoor needs it to read the user from `/v1.0/contact/users/me`. Without it, sign-in fails.

   ![Contact.User.Read permission](/img/providers/OAuth/dingtalkpermission.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `DingTalk`.
1. Fill in the fields:

   | Casdoor       | DingTalk  |
   |---------------|-----------|
   | Client ID     | AppKey    |
   | Client secret | AppSecret |

   ![DingTalk provider in Casdoor](/img/providers/OAuth/dingtalkprovider.png)

1. Save the provider.

Casdoor uses the `unionid` of DingTalk as the username, so that a user keeps the same account when other details change.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [DingTalk syncer](/docs/syncer/DingTalk)
- [Obtain user personal information](https://open.dingtalk.com/document/orgapp-server/tutorial-obtaining-user-personal-information) in the DingTalk documentation
