---
sidebar_position: 2
title: OAuth
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

To obtain OAuth 2.0 client credential, you can visit [Google API console](https://console.developers.google.com) and log in using your Google account, follow the instructions of Google Cloud Platform, and get your Client Id and Client Secret.

For more detailed usages, please visit [Google Identity Platform](https://developers.google.com/identity) to know more about Google OAuth verification.

### GitHub:heavy_check_mark:

GitHub OAuth support both web application flow and device flow, to obtain OAuth credential, please visit [GitHub docs](https://docs.github.com/en/rest/guides/basics-of-authentication) to get more information.

:::caution

**Tricks:** While we can't set multiple redirect urls in GitHub, so in development and production environment, we need to set different GitHub providers. 

In development environment, Casdoor will only display the GitHub provider **with** "localhost" in its name. And in productoin environment, Casdoor will only display the GitHub provider **without** "localhost" in its name.

This is how we do in our online demo:

![githublocalhost](/img/githublocalhost.png)

:::

### Facebook:heavy_check_mark:

To obtain Facebook OAuth 2.0 client credential, please visit [Facebook for developers](https://developers.facebook.com/), create a Facebook developer account and follow the instructions of Facebook developer platform to get your client id and client secret.

###  Twitter(still working🚧)

> Twitter’s application steps are somewhat troublesome, and the official restrictions are a bit strict, so it may be more difficult to apply for a developer account than other third-party platforms.

Visit [Developer Portal](https://developer.twitter.com/en/portal/dashboard), register if you don't have an account. Twitter needs to know what you are applying for a developer account for. You must fill in it carefully, otherwise it will not pass.

After the application is approved, create an application, fill in the callback address and other information, you need to do two things, which will be set is **Authentication settings** section.

- Manually turn on **3-legged OAuth**, for Sign in with Twitter, posting Tweets on behalf of other accounts and more.
- Enable **Request email address from users**, for getting user email address.

###  LinkedIn:heavy_check_mark:

Visit [LinkedIn developers website](https://www.linkedin.com/developers/), follow the instructions on LinkedIn developers platform and fill the form, then you can get your Client Id and Client Secret.

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

For more detailed information please visit [DingTalk developer docs](https://developers.dingtalk.com/document/app/obtain-identity-credentials).

### Gitee:heavy_check_mark:

Visit [official website](https://gitee.com/api/v5/oauth_doc#/list-item-3), which has shown the specific application steps, and after filling in, you can get the most important information, Client Id and Client Secret.

:::caution

Since Casdoor needs to obtain the user's email, the email option must be checked, otherwise it will cause scope authorization errors.

![gitee scope](/img/giteescope.jpg)

:::

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