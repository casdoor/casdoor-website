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