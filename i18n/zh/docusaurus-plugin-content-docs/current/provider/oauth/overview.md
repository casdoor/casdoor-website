---
title: 概述
description: 将 OAuth 提供商添加到您的应用程序
keywords:
  - OAuth
authors:
  - ErikQQY
---

Cadoor 可以使用其他 OAuth 应用程序登录。

现在，Casdoor 支持许多OAuth 应用程序提供者。 提供商的图标将在添加到 Casdoor 后显示在登录和注册页面中。 以下是 Casdoor 支持的提供商：

| Provider        | Logo                                                                                            | Provider    | Logo                                                                                        | Provider  | Logo                                                                                      | Provider     | Logo                                                                                         |
|:--------------- |:----------------------------------------------------------------------------------------------- |:----------- |:------------------------------------------------------------------------------------------- |:--------- |:----------------------------------------------------------------------------------------- |:------------ |:-------------------------------------------------------------------------------------------- |
| Adfs            | <img src="https://cdn.casbin.org/img/social_adfs.png" width="40" />            | Alipay      | <img src="https://cdn.casbin.org/img/social_alipay.png" width="40" />      | Amazon    | <img src="https://cdn.casbin.org/img/social_amazon.png" width="40" />    | Apple        | <img src="https://cdn.casbin.org/img/social_apple.png" width="40" />        |
| Auth0           | <img src="https://cdn.casbin.org/img/social_auth0.png" width="40" />           | AzureAD     | <img src="https://cdn.casbin.org/img/social_azuread.png" width="40" />     | Baidu     | <img src="https://cdn.casbin.org/img/social_baidu.png" width="40" />     | Battle.net   | <img src="https://cdn.casbin.org/img/social_battlenet.png" width="40" />    |
| Bilibili        | <img src="https://cdn.casbin.org/img/social_bilibili.png" width="40" />        | Bitbucket   | <img src="https://cdn.casbin.org/img/social_bitbucket.png" width="40" />   | Box       | <img src="https://cdn.casbin.org/img/social_box.png" width="40" />       | Casdoor      | <img src="https://cdn.casbin.org/img/social_casdoor.png" width="40" />      |
| Cloud Foundry   | <img src="https://cdn.casbin.org/img/social_cloudfoundry.png" width="40" />    | Dailymotion | <img src="https://cdn.casbin.org/img/social_dailymotion.png" width="40" /> | Deezer    | <img src="https://cdn.casbin.org/img/social_deezer.png" width="40" />    | DigitalOcean | <img src="https://cdn.casbin.org/img/social_digitalocean.png" width="40" /> |
| DingTalk        | <img src="https://cdn.casbin.org/img/social_dingtalk.png" width="40" />        | Discord     | <img src="https://cdn.casbin.org/img/social_discord.png" width="40" />     | Douyin    | <img src="https://cdn.casbin.org/img/social_douyin.png" width="40" />    | Dropbox      | <img src="https://cdn.casbin.org/img/social_dropbox.png" width="40" />      |
| Eve Online      | <img src="https://cdn.casbin.org/img/social_eveonline.png" width="40" />       | Facebook    | <img src="https://cdn.casbin.org/img/social_facebook.png" width="40" />    | Fitbit    | <img src="https://cdn.casbin.org/img/social_fitbit.png" width="40" />    | Gitea        | <img src="https://cdn.casbin.org/img/social_gitea.png" width="40" />        |
| Gitee           | <img src="https://cdn.casbin.org/img/social_gitee.png" width="40" />           | GitHub      | <img src="https://cdn.casbin.org/img/social_github.png" width="40" />      | GitLab    | <img src="https://cdn.casbin.org/img/social_gitlab.png" width="40" />    | Google       | <img src="https://cdn.casbin.org/img/social_google.png" width="40" />       |
| Heroku          | <img src="https://cdn.casbin.org/img/social_heroku.png" width="40" />          | InfluxCloud | <img src="https://cdn.casbin.org/img/social_influxcloud.png" width="40" /> | Infoflow  | <img src="https://cdn.casbin.org/img/social_infoflow.png" width="40" />  | Instagram    | <img src="https://cdn.casbin.org/img/social_instagram.png" width="40" />    |
| Intercom        | <img src="https://cdn.casbin.org/img/social_intercom.png" width="40" />        | Kakao       | <img src="https://cdn.casbin.org/img/social_kakao.png" width="40" />       | Lark      | <img src="https://cdn.casbin.org/img/social_lark.png" width="40" />      | Lastfm       | <img src="https://cdn.casbin.org/img/social_lastfm.png" width="40" />       |
| Line            | <img src="https://cdn.casbin.org/img/social_line.png" width="40" />            | LinkedIn    | <img src="https://cdn.casbin.org/img/social_linkedin.png" width="40" />    | Mailru    | <img src="https://cdn.casbin.org/img/social_mailru.png" width="40" />    | Meetup       | <img src="https://cdn.casbin.org/img/social_meetup.png" width="40" />       |
| MicrosoftOnline | <img src="https://cdn.casbin.org/img/social_microsoftonline.png" width="40" /> | Naver       | <img src="https://cdn.casbin.org/img/social_naver.png" width="40" />       | Nextcloud | <img src="https://cdn.casbin.org/img/social_nextcloud.png" width="40" /> | Okta         | <img src="https://cdn.casbin.org/img/social_okta.png" width="40" />         |
| OneDrive        | <img src="https://cdn.casbin.org/img/social_onedrive.png" width="40" />        | Oura        | <img src="https://cdn.casbin.org/img/social_oura.png" width="40" />        | Patreon   | <img src="https://cdn.casbin.org/img/social_patreon.png" width="40" />   | Paypal       | <img src="https://cdn.casbin.org/img/social_paypal.png" width="40" />       |
| QQ              | <img src="https://cdn.casbin.org/img/social_qq.png" width="40" />              | SalesForce  | <img src="https://cdn.casbin.org/img/social_salesforce.png" width="40" />  | Shopify   | <img src="https://cdn.casbin.org/img/social_shopify.png" width="40" />   | Slack        | <img src="https://cdn.casbin.org/img/social_slack.png" width="40" />        |
| SoundCloud      | <img src="https://cdn.casbin.org/img/social_soundcloud.png" width="40" />      | Spotify     | <img src="https://cdn.casbin.org/img/social_spotify.png" width="40" />     | Steam     | <img src="https://cdn.casbin.org/img/social_steam.png" width="40" />     | Strava       | <img src="https://cdn.casbin.org/img/social_strava.png" width="40" />       |
| Stripe          | <img src="https://cdn.casbin.org/img/social_stripe.png" width="40" />          | TikTok      | <img src="https://cdn.casbin.org/img/social_tiktok.png" width="40" />      | Tumblr    | <img src="https://cdn.casbin.org/img/social_tumblr.png" width="40" />    | Twitch       | <img src="https://cdn.casbin.org/img/social_twitch.png" width="40" />       |
| Twitter         | <img src="https://cdn.casbin.org/img/social_twitter.png" width="40" />         | Typetalk    | <img src="https://cdn.casbin.org/img/social_typetalk.png" width="40" />    | Uber      | <img src="https://cdn.casbin.org/img/social_uber.png" width="40" />      | VK           | <img src="https://cdn.casbin.org/img/social_vk.png" width="40" />           |
| WeChat          | <img src="https://cdn.casbin.org/img/social_wechat.png" width="40" />          | WeCom       | <img src="https://cdn.casbin.org/img/social_wecom.png" width="40" />       | Weibo     | <img src="https://cdn.casbin.org/img/social_weibo.png" width="40" />     | Wepay        | <img src="https://cdn.casbin.org/img/social_wepay.png" width="40" />        |
| Xero            | <img src="https://cdn.casbin.org/img/social_xero.png" width="40" />            | Yahoo       | <img src="https://cdn.casbin.org/img/social_yahoo.png" width="40" />       | Yammer    | <img src="https://cdn.casbin.org/img/social_yammer.png" width="40" />    | Yandex       | <img src="https://cdn.casbin.org/img/social_yandex.png" width="40" />       |
| Zoom            | <img src="https://cdn.casbin.org/img/social_zoom.png" width="40" />            | Email       | <img src="https://cdn.casbin.org/img/social_mail.png" width="40" />        | SMS       | <img src="https://cdn.casbin.org/img/social_msg.png" width="40" />       |              |                                                                                              |

我们将向您展示如何申请第三方服务并将其添加到Casdoor。

## 申请成为开发者

在此之前，你需要理解一些概念。

- **RedirectUrl**, 认证后重定向地址, 填写您的应用程序地址, 例如 `https://forum.casbin.com/`
- **Scope**，用户授予您的权限，如基本个人资料，电子邮件地址和帖子及其他。
- **ClientId/AppId**, **ClientKey/AppSecret**, 这是最重要的信息 而且这是您在申请开发者帐户后需要得到的信息。 您 **无法与任何人共享** 的密钥。


## 添加 OAuth 提供商

1. 导航到您的Casdoor索引页面
2. 点击顶部栏中的 `提供商`
3. 点击 `添加`，然后您可以在列表顶部看到一个新的提供商
4. 点击新的提供商修改它
5. 选择 `OAuth` 在  `类别` 中
6. 在 `类型` 中选择您需要的 OAuth 提供程序
7. 填写最重要的导入信息，`Client ID`和`Client Secret`

## 应用中

1. 单击顶部栏中的 `应用程序` 并选择一个应用程序，编辑
2. 点击提供商添加按钮，选择您刚刚添加的提供商
3. 修改提供商的权限，例如允许注册、登录和取消绑定
4. 完成！
