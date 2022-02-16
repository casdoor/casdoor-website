---
sidebar_position: 1
title: Overview
---

Casdoor can uses other OAuth applications as a sign in method.

Now, Casdoor supports many OAuth application providers. Icons of providers will be shown in login and signup pages after adding to Casdoor. Here are the providers Casdoor supporting:

|Google|GitHub|Facebook| Twitter | LinkedIn | Weibo | WeChat | Tencent QQ | Dingtalk | Baidu | Infoflow | Gitee | Steam | Email | SMS |
| -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
|<img src="https://cdn.casbin.org/img/social_google.png" width="40"></img>|[<img src="https://cdn.casbin.org/img/social_github.png" width="40"></img>](/docs/provider/oauth/github)|<img src="https://cdn.casbin.org/img/social_facebook.png" width="40"></img>|<img src="https://cdn.casbin.org/img/social_twitter.png" width="40"></img> |<img src="https://cdn.casbin.org/img/social_linkedin.png" width="40"></img>| <img src="https://cdn.casbin.org/img/social_weibo.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_wechat.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_qq.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_dingtalk.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_baidu.png" width="40"></img>| <img src="https://cdn.casbin.org/img/social_infoflow.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_gitee.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_steam.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_mail.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_msg.png" width="40"></img> |
|✅|✅|✅|🚧|✅|✅|✅|✅|✅|✅|✅|✅|✅|✅|✅|

We will show you how to apply for a third-party service and add it to casdoor.

## Apply to become a developer

Before this, there are some general concepts you need to understand.

- **RedirectUrl**, Redirect address after authentication, fill in your application address, such as `https://forum.casbin.com/`
- **Scope**, Permission granted to you by the user, such as basic profile, Email address and posts and others.
- **ClientId/AppId**, **ClientKey/AppSecret**, This is the most important information, and it is what you need to get after you apply for a developer account, **can not share** the key/secret with anyone.

###  Twitter(still working🚧)

> Twitter’s application steps are somewhat troublesome, and the official restrictions are a bit strict, so it may be more difficult to apply for a developer account than other third-party platforms.

Visit [Developer Portal](https://developer.twitter.com/en/portal/dashboard), register if you don't have an account. Twitter needs to know what you are applying for a developer account for. You must fill in it carefully, otherwise it will not pass.

After the application is approved, create an application, fill in the callback address and other information, you need to do two things, which will be set is **Authentication settings** section.

- Manually turn on **3-legged OAuth**, for Sign in with Twitter, posting Tweets on behalf of other accounts and more.
- Enable **Request email address from users**, for getting user email address.

### Weibo:heavy_check_mark:

Weibo's developer account application is not difficult, but the speed is relatively slow, it takes about 2-3 days.

Visit [Developer Website](https://open.weibo.com/developers/basicinfo), filling in basic information and waiting for a long review...

After the review is approved, you can get the Client Id and Client Secret.

### WeChat:heavy_check_mark:

Visit [WeChat developer platform](https://open.weixin.qq.com/), register as a developer, after your web application or your mobile application is approved, then you get you App Id and App Secret.

For more detailed information, please visit [WeChat Open Platform](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html).

### Tencent QQ:heavy_check_mark:

Visit authentication platform of QQ - [Connect QQ](https://connect.qq.com/manage.html#/).

First you need to apply to [become a developer](https://wiki.connect.qq.com/%E6%88%90%E4%B8%BA%E5%BC%80%E5%8F%91%E8%80%85), after the review is approved, follow the instructions of the platform and get your Client Id and Client Secret.

### DingTalk:heavy_check_mark:

Visit [DingTalk developer platform](https://open-dev.dingtalk.com/?spm=ding_open_doc.document.0.0.140a645fxfAUAE#/loginMan) and log in using your DingTalk account, after enter the platform, follow the instructions of the platform and you will get your Client Id and Client Secret.

For more detailed information please visit [DingTalk developer docs](https://open.dingtalk.com/document/orgapp-server/tutorial-obtaining-user-personal-information).

In addition, you need to add the following permissions to the dingtalk application:
![DingTalk](/img/providers/OAuth/dingtalkpermission.png)

### Steam:heavy_check_mark:

Visit [Steam WebAPI platform](https://steamcommunity.com/dev/revokekey) and log in using your Steam account, then apply for an API Key for your casdoor domain or ip, and finally fill in your API Key as Client Secret into Casdoor. (ClientID does not need to be filled, and your steam  account needs to have games to apply for the API)

For more detailed information, please visit [Steam WebAPI doc](https://steamcommunity.com/dev).

## Add an OAuth provider

1. Navigate to your Casdoor index page
2. Click `Providers` in the top bar
3. Click `Add`, then you can see a new provider in the list top
4. Click the new provider to modify it
5. Select `OAuth` in  `Category`
6. Choose the OAuth provider you need in `Type`
7. Fill the most import information, `Client ID` and `Client Secret`

## Applied in application

1. Click `Applicaton` in the top bar and choose one application, edit
2. click provider add button, select the provider you just added
3. Modify the permissions of the provider, such as allowing registration, login, and unbinding
4. Done!