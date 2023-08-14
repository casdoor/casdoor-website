---
title: DingTalk
description: Add DingTalk OAuth provider to your application
keywords: [DingTalk, OAuth]
authors: [Marvelousp4]
---

## DingTalk ✔️

Visit [DingTalk developer platform](https://open-dev.dingtalk.com/?spm=ding_open_doc.document.0.0.140a645fxfAUAE#/loginMan) and log in using your DingTalk account. After entering the platform, follow the instructions of the platform and you will get your `Client Id` and `Client Secret`. The relationship corresponding to the DingTalk is as follows.

| Name                | Name in DingTalk |
|---------------------|------------------|
| Client ID           | AppKey           |
| Client secret       | AppSecret        |

In DingTalk, add the `Redirect Domain`.

![DingTalk](/img/providers/OAuth/dingtalkredirect.png)

For more detailed information, please visit [DingTalk developer docs](https://open.dingtalk.com/document/orgapp-server/tutorial-obtaining-user-personal-information).

In addition, you need to add the following permissions to the dingtalk application:
![DingTalk](/img/providers/OAuth/dingtalkpermission.png)
