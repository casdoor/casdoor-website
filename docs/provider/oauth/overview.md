---
title: Overview
description: Add OAuth providers so users can sign in with Google, GitHub, and other identity providers.
keywords: [OAuth, identity provider, sign-in]
authors: [ErikQQY]
---

Casdoor can use external OAuth applications as sign-in methods. After adding a provider, its icon appears on the login and sign-up pages. Supported OAuth providers:

| Provider      | Logo                                                                           | Provider    | Logo                                                                       | Provider     | Logo                                                                      | Provider     | Logo                                                                        |
|:--------------|:-------------------------------------------------------------------------------|:------------|:---------------------------------------------------------------------------|:-------------|:--------------------------------------------------------------------------|:-------------|:----------------------------------------------------------------------------|
| ADFS          | <img src="https://cdn.casbin.org/img/social_adfs.png" width="40" />            | Alipay      | <img src="https://cdn.casbin.org/img/social_alipay.png" width="40" />      | Amazon       | <img src="https://cdn.casbin.org/img/social_amazon.png" width="40" />     | Apple        | <img src="https://cdn.casbin.org/img/social_apple.png" width="40" />        |
| Auth0         | <img src="https://cdn.casbin.org/img/social_auth0.png" width="40" />           | Azure AD    | <img src="https://cdn.casbin.org/img/social_azuread.png" width="40" />     | Azure AD B2C | <img src="https://cdn.casbin.org/img/social_azureadb2c.png" width="40" /> | Baidu        | <img src="https://cdn.casbin.org/img/social_baidu.png" width="40" />        |
| Bilibili      | <img src="https://cdn.casbin.org/img/social_bilibili.png" width="40" />        | Bitbucket   | <img src="https://cdn.casbin.org/img/social_bitbucket.png" width="40" />   | Box          | <img src="https://cdn.casbin.org/img/social_box.png" width="40" />        | Casdoor      | <img src="https://cdn.casbin.org/img/social_casdoor.png" width="40" />      |
| Cloud Foundry | <img src="https://cdn.casbin.org/img/social_cloudfoundry.png" width="40" />    | Dailymotion | <img src="https://cdn.casbin.org/img/social_dailymotion.png" width="40" /> | Deezer       | <img src="https://cdn.casbin.org/img/social_deezer.png" width="40" />     | DigitalOcean | <img src="https://cdn.casbin.org/img/social_digitalocean.png" width="40" /> |
| DingTalk      | <img src="https://cdn.casbin.org/img/social_dingtalk.png" width="40" />        | Discord     | <img src="https://cdn.casbin.org/img/social_discord.png" width="40" />     | Tiktok       | <img src="https://cdn.casbin.org/img/social_douyin.png" width="40" />     | Dropbox      | <img src="https://cdn.casbin.org/img/social_dropbox.png" width="40" />      |
| Eve Online    | <img src="https://cdn.casbin.org/img/social_eveonline.png" width="40" />       | Facebook    | <img src="https://cdn.casbin.org/img/social_facebook.png" width="40" />    | Fitbit       | <img src="https://cdn.casbin.org/img/social_fitbit.png" width="40" />     | Gitea        | <img src="https://cdn.casbin.org/img/social_gitea.png" width="40" />        |
| Gitee         | <img src="https://cdn.casbin.org/img/social_gitee.png" width="40" />           | GitHub      | <img src="https://cdn.casbin.org/img/social_github.png" width="40" />      | GitLab       | <img src="https://cdn.casbin.org/img/social_gitlab.png" width="40" />     | Google       | <img src="https://cdn.casbin.org/img/social_google.png" width="40" />       |
| Heroku        | <img src="https://cdn.casbin.org/img/social_heroku.png" width="40" />          | InfluxCloud | <img src="https://cdn.casbin.org/img/social_influxcloud.png" width="40" /> | Infoflow     | <img src="https://cdn.casbin.org/img/social_infoflow.png" width="40" />   | Instagram    | <img src="https://cdn.casbin.org/img/social_instagram.png" width="40" />    |
| Intercom      | <img src="https://cdn.casbin.org/img/social_intercom.png" width="40" />        | Kakao       | <img src="https://cdn.casbin.org/img/social_kakao.png" width="40" />       | Lark         | <img src="https://cdn.casbin.org/img/social_lark.png" width="40" />       | Lastfm       | <img src="https://cdn.casbin.org/img/social_lastfm.png" width="40" />       |
| Line          | <img src="https://cdn.casbin.org/img/social_line.png" width="40" />            | LinkedIn    | <img src="https://cdn.casbin.org/img/social_linkedin.png" width="40" />    | Mailru       | <img src="https://cdn.casbin.org/img/social_mailru.png" width="40" />     | Meetup       | <img src="https://cdn.casbin.org/img/social_meetup.png" width="40" />       |
| Microsoft     | <img src="https://cdn.casbin.org/img/social_microsoftonline.png" width="40" /> | Naver       | <img src="https://cdn.casbin.org/img/social_naver.png" width="40" />       | Nextcloud    | <img src="https://cdn.casbin.org/img/social_nextcloud.png" width="40" />  | Okta         | <img src="https://cdn.casbin.org/img/social_okta.png" width="40" />         |
| OneDrive      | <img src="https://cdn.casbin.org/img/social_onedrive.png" width="40" />        | Oura        | <img src="https://cdn.casbin.org/img/social_oura.png" width="40" />        | Patreon      | <img src="https://cdn.casbin.org/img/social_patreon.png" width="40" />    | PayPal       | <img src="https://cdn.casbin.org/img/social_paypal.png" width="40" />       |
| QQ            | <img src="https://cdn.casbin.org/img/social_qq.png" width="40" />              | Salesforce  | <img src="https://cdn.casbin.org/img/social_salesforce.png" width="40" />  | Shopify      | <img src="https://cdn.casbin.org/img/social_shopify.png" width="40" />    | Slack        | <img src="https://cdn.casbin.org/img/social_slack.png" width="40" />        |
| SoundCloud    | <img src="https://cdn.casbin.org/img/social_soundcloud.png" width="40" />      | Spotify     | <img src="https://cdn.casbin.org/img/social_spotify.png" width="40" />     | Steam        | <img src="https://cdn.casbin.org/img/social_steam.png" width="40" />      | Strava       | <img src="https://cdn.casbin.org/img/social_strava.png" width="40" />       |
| Stripe        | <img src="https://cdn.casbin.org/img/social_stripe.png" width="40" />          | Telegram    | <img src="https://cdn.casbin.org/img/social_telegram.png" width="40" />    | TikTok       | <img src="https://cdn.casbin.org/img/social_tiktok.png" width="40" />     | Tumblr       | <img src="https://cdn.casbin.org/img/social_tumblr.png" width="40" />       |
| Twitch        | <img src="https://cdn.casbin.org/img/social_twitch.png" width="40" />          | Twitter     | <img src="https://cdn.casbin.org/img/social_twitter.png" width="40" />     | Typetalk     | <img src="https://cdn.casbin.org/img/social_typetalk.png" width="40" />   | Uber         | <img src="https://cdn.casbin.org/img/social_uber.png" width="40" />         |
| VK            | <img src="https://cdn.casbin.org/img/social_vk.png" width="40" />              | WeChat      | <img src="https://cdn.casbin.org/img/social_wechat.png" width="40" />      | WeCom        | <img src="https://cdn.casbin.org/img/social_wecom.png" width="40" />      | Weibo        | <img src="https://cdn.casbin.org/img/social_weibo.png" width="40" />        |
| WePay         | <img src="https://cdn.casbin.org/img/social_wepay.png" width="40" />           | Xero        | <img src="https://cdn.casbin.org/img/social_xero.png" width="40" />        | Yahoo        | <img src="https://cdn.casbin.org/img/social_yahoo.png" width="40" />      | Yammer       | <img src="https://cdn.casbin.org/img/social_yammer.png" width="40" />       |
| Yandex        | <img src="https://cdn.casbin.org/img/social_yandex.png" width="40" />          | Zoom        | <img src="https://cdn.casbin.org/img/social_zoom.png" width="40" />        | Email        | <img src="https://cdn.casbin.org/img/social_mail.png" width="40" />       | SMS          | <img src="https://cdn.casbin.org/img/social_msg.png" width="40" />          |
| Battle.net    | <img src="https://cdn.casbin.org/img/social_battlenet.png" width="40" />       |             |                                                                             |              |                                                                            |              |                                                                              |

## Registering with a third-party OAuth service

You need a **redirect URL** (your app’s URL after login, e.g. `https://forum.casbin.com/`), **scopes** (what you request from the user), and **Client ID / Client Secret** from the provider. Keep the client secret private.

## Adding an OAuth provider in Casdoor

1. Open **Providers** in the sidebar and click **Add**.
2. Set **Category** to **OAuth** and choose the **Type** (e.g. Google, GitHub).
3. Enter **Client ID** and **Client Secret** from the provider’s developer console.

## User field mapping

Use [User mapping](/docs/provider/oauth/user-mapping) to map OAuth claims (e.g. from Okta, Azure AD) to Casdoor user fields.

## Automatic account linking

Casdoor can link OAuth logins to existing users by OAuth identity, email/phone (if enabled), or username (case-insensitive). That lets you add OAuth without manual linking.

## Using the provider’s access token

After OAuth sign-in, Casdoor stores the provider’s access token on the user. Your app can read it via `/api/get-account` and call the provider’s API (e.g. GitHub, Google Drive) on behalf of the user. Only the user and org admins can see the token. See [OAuth docs](/docs/how-to-connect/oauth#accessing-oauth-provider-tokens).

## Attaching the provider to an application

1. Open **Applications**, edit the application.
2. Add the provider and set its rules (e.g. enable for login, signup, unbind).
3. Save.
