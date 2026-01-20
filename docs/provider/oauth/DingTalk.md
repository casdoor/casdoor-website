---
title: DingTalk
description: Add DingTalk OAuth provider to your application
keywords: [DingTalk, OAuth]
authors: [Marvelousp4]
---

## DingTalk ✔️

### Configuring DingTalk

To configure DingTalk, visit the [DingTalk developer platform](https://open-dev.dingtalk.com/?spm=ding_open_doc.document.0.0.140a645fxfAUAE#/loginMan) and log in using your DingTalk account. Once you're on the platform, follow the instructions provided to obtain your `Client Id` and `Client Secret`. The corresponding terms in DingTalk are as follows:

| Term           | DingTalk Name |
|----------------|---------------|
| Client ID      | AppKey        |
| Client secret  | AppSecret     |

In DingTalk, you can find the `Appkey` and `AppSecret` in the App Info.

![DingTalk](/img/providers/OAuth/dingtalkapp.png)

Make sure to add the `Redirect Domain`, which should be your Casdoor domain.

![DingTalk](/img/providers/OAuth/dingtalkredirect.png)

For more detailed information, please refer to the [DingTalk developer docs](https://open.dingtalk.com/document/orgapp-server/tutorial-obtaining-user-personal-information).

### Required Permissions

You need to enable the following permissions in your DingTalk application:

- **Contact.User.Read** - Required for reading user contact information via the `/v1.0/contact/users/me` API endpoint

![DingTalk](/img/providers/OAuth/dingtalkpermission.png)

:::caution

Without the `Contact.User.Read` permission, authentication will fail when Casdoor tries to fetch user information. Make sure this permission is enabled in your DingTalk application settings under "Permissions Management".

:::

### User Identity Mapping

When users authenticate through DingTalk, Casdoor creates their username using the `unionid` field from DingTalk. This identifier uniquely represents each user across your DingTalk organization, ensuring reliable authentication even when employee details change. Since `unionid` remains constant throughout a user's lifecycle, it provides stable account mapping between DingTalk and Casdoor.

### Configuring Casdoor

Here's the final configuration for DingTalk:

![DingTalk](/img/providers/OAuth/dingtalkprovider.png)
