---
title: OAuth providers
sidebar_label: Overview
description: Let users sign in to Casdoor with an account at an external identity provider, such as Google or GitHub, and learn how Casdoor links and maps these accounts.
keywords: [OAuth, identity provider, sign-in]
authors: [ErikQQY]
---

An OAuth provider lets users sign in to Casdoor with an account at an external identity provider, such as Google, GitHub, or WeChat. The icon of the provider appears on the sign-in and sign-up pages of the applications that use it.

## Supported providers

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

Each provider type has its own guide in this section. For a provider that isn't listed, use a [custom OAuth provider](/docs/provider/oauth/CustomProvider).

## Add an OAuth provider

1. At the identity provider, register an OAuth application:

   - Set its callback URL, which the provider may call the redirect URI, to the callback URL of Casdoor: `https://<your-casdoor-host>/callback`.
   - Choose the scopes, which determine the user data that Casdoor receives.
   - Copy the client ID and the client secret. Keep the client secret private.

   The callback URL at the provider is the URL of Casdoor, not the URL of your own application. See [Redirect URL and callback URL](/docs/application/config#how-the-flow-works).

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and select the **Type**, such as `Google` or `GitHub`.
1. Enter the **Client ID** and the **Client secret** from the identity provider.
1. Save the provider.

## Add the provider to an application {#attaching-the-provider-to-an-application}

1. Open the edit page of the application and go to the **Providers** tab.
1. Add the provider and choose whether users can sign up, sign in, and unlink with it. See [Add providers to an application](/docs/application/providers).
1. Save the application.

## How Casdoor links accounts {#automatic-account-linking}

When a user signs in with an OAuth provider, Casdoor looks for the Casdoor user to link the external account to. It matches by the identity at the provider, by email address or phone number if the **Binding rule** of the provider in the application allows it, and by username, without regard to case. You can therefore add an OAuth provider to an existing user base without linking accounts by hand.

## Map additional user fields {#user-field-mapping}

Casdoor reads the username, the email address, and the avatar from the provider. To fill in more fields, such as the phone number or the job title, map the claims of the provider to user fields. See [Map OAuth claims to user fields](/docs/provider/oauth/user-mapping).

## Use the access token of the provider {#using-the-providers-access-token}

After an OAuth sign-in, Casdoor stores the access token of the provider on the user. Your application can read it from `/api/get-account` and call the API of the provider, such as the GitHub API or the Google Drive API, on behalf of the user. Only the user and the administrators of the organization can see the token. See [Get the access token of an external provider](/docs/how-to-connect/oauth#accessing-oauth-provider-tokens).

## Route requests through a proxy {#routing-through-a-proxy}

If the identity provider is reachable only through a proxy, turn on **Enable proxy** on the provider. Casdoor then sends the requests of the sign-in flow through the SOCKS5 proxy that `socks5Proxy` in `conf/app.conf` sets. Some provider types always use the proxy, whatever this setting.

## See also

- [Providers](/docs/provider/overview)
- [Add providers to an application](/docs/application/providers)
- [SAML providers](/docs/provider/saml/overview)
