---
sidebar_position: 2
title: OAuth Providers
---

Casdoor can uses other OAuth applications as a sign in method.

Now, Casdoor supports many OAuth application providers. Icons of providers will be shown in login and signup pages after adding to Casdoor. Here are the providers Casdoor supporting:

|Google|GitHub|Facebook| Twitter | LinkedIn | Weibo | WeChat | Tencent QQ | Dingtalk | Gitee | Email | SMS |
| -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
|<img src="https://cdn.casbin.org/img/social_google.png" width="40"></img>|<img src="https://cdn.casbin.org/img/social_github.png" width="40"></img>|<img src="https://cdn.casbin.org/img/social_facebook.png" width="40"></img>|<img src="https://cdn.casbin.org/img/social_twitter.png" width="40"></img> |<img src="https://cdn.casbin.org/img/social_linkedin.png" width="40"></img>| <img src="https://cdn.casbin.org/img/social_weibo.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_wechat.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_qq.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_dingtalk.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_gitee.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_mail.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_msg.png" width="40"></img> |
|✅|✅|✅|🚧|✅|✅|✅|✅|✅|✅|✅|✅|

We will show you how to apply for a third-party service and add it to casdoor.

## Apply to become a developer

Before this, there are some general concepts you need to understand.

- **RedirectUrl**, Redirect address after authentication, fill in your application address, such as `https://forum.casbin.com/`
- **Scope**, Permission granted to you by the user, such as basic profile, Email address and posts and others.
- **ClientId/AppId**, **ClientKey/AppSecret**, This is the most important information, and it is what you need to get after you apply for a developer account, **can not share** the key/secret with anyone.

OK, Next you can choose the third-party platform you need. We will show you the proposal forms and service addresses of all supported platforms. If you still have any questions, please contact us in the community.

### Google:heavy_check_mark:



### GitHub:heavy_check_mark:



### Facebook:heavy_check_mark:



### Twitter(still woking🚧)

> Twitter’s application steps are somewhat troublesome, and the official restrictions are a bit strict, so it may be more difficult to apply for a developer account than other third-party platforms.

Visit [Develeper Portal](https://developer.twitter.com/en/portal/dashboard), register if you don't have an account. Twitter needs to know what you are applying for a developer account for. You must fill in it carefully, otherwise it will not pass.

After the application is approved, create an application, fill in the callback address and other information, you need to do two things, which will be set is **Authentication settings** section.

- Manually turn on **3-legged OAuth**, for Sign in with Twitter, posting Tweets on behalf of other accounts and more.
- Enable **Request email address from users**, for getting user email address.

### LinkedIn:heavy_check_mark:



### Weibo:heavy_check_mark:

Weibo's developer account application is not difficult, but the speed is relatively slow, it takes about 2-3 days.

Visit [Develeper Website](https://open.weibo.com/developers/basicinfo), filling in basic infomation and waiting for a long review...

After the review is approved, you can get the Client Id and Client Secret.

### Wechat:heavy_check_mark:



### Tencent QQ:heavy_check_mark:



### DingTalk:heavy_check_mark:



### Gitee:heavy_check_mark:

Visit [official website](https://gitee.com/api/v5/oauth_doc#/list-item-3) , which has shown the specific application steps, and after filling in, you can get the most important information, ClientId and ClientSecret.

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