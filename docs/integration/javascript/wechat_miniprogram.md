---
title: WeChat mini program
description: Integrate Casdoor sign-in in a WeChat Mini Program (no OAuth redirect).
keywords: [WeChat, Mini Program]
authors: [Steve0x2a]
---

:::info
WeChat Mini Program support is available from Casdoor 1.41.0.
:::

WeChat Mini Program does not use standard OAuth redirects, so sign-in uses the mini program’s login code sent to Casdoor instead of a redirect to the Casdoor page. Example: [casdoor-wechat-miniprogram-example](https://github.com/casdoor/casdoor-wechat-miniprogram-example). See also [WeChat Mini Program login](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html).

**Config:** `CASDOOR_HOSTNAME` — the Casdoor server URL (e.g. `https://door.casbin.com`).

## Step 1: Deploy Casdoor

[Deploy the Casdoor server](/docs/basic/server-installation). Then:

1. Confirm Casdoor is reachable and working.
2. In `conf/app.conf`, set `origin` to `CASDOOR_HOSTNAME`.

![Casdoor conf](/img/integration/casdoor_origin.png)

## Step 2: Configure the application

1. In Casdoor, create an **OAuth** provider with type **WeChat** and set **APPID** and **APPSECRET** from the WeChat Mini Program admin.
   ![WeChat_MiniProgram.png](/img/integration/javascript/wechat_miniprogram/WeChat_MiniProgram.png)
2. Create or edit a Casdoor application and add that WeChat provider.

:::info
Casdoor uses the **first** WeChat-type provider in the application as the Mini Program IdP. Use only one WeChat provider per app if you use Mini Program.
:::

## Step 3: Mini program code

The mini program calls `wx.login()` to get a login code, then sends that code to Casdoor. Casdoor exchanges it with WeChat for OpenID and SessionKey. Example:

```js
// Login in mini program
wx.login({
  success: res => {
    // This is the login code that needs to be sent to Casdoor
    console.log(res.code)
    
    wx.request({
      url: `${CASDOOR_HOSTNAME}/api/login/oauth/access_token`,
      method: "POST",
      data: {
        "tag": "wechat_miniprogram", // Required
        "client_id": "6825f4f0af45554c8952",
        "code": res.code,
        "username": this.data.userInfo.nickName, // Update user profile when you log in.
        "avatar": this.data.userInfo.avatarUrl,
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success: res => {
        console.log(res)
        this.globalData.accessToken = res.data.access_token // Get Casdoor's access token
      }
    })
  }
})
```

It is important to note that the `tag` parameter is mandatory to inform Casdoor that this is a request from the WeChat Mini Program.

The above code includes the username and avatar URI of the WeChat Mini Program user during login. You can choose to pass these two parameters separately and then pass them to Casdoor after a successful login and obtaining the access token:

```js
wx.getUserProfile({
  desc: 'share your info to Casdoor', 
  success: (res) => {
    this.setData({
      userInfo: res.userInfo,
      hasUserInfo: true
    })
    console.log(app.globalData.accessToken)
    wx.request({
      url: `${CASDOOR_HOSTNAME}/api/update-user`, // Casdoor URL
      method: "POST",
      data: {
        "owner": "test",
        "name": "wechat-oGk3T5tIiMFo3SazCO75f0HEiE7Q",
        "displayName": this.data.userInfo.nickName,
        "avatar": this.data.userInfo.avatarUrl
      },
      header: {
        "Authorization": "Bearer " + app.globalData.accessToken, // Bearer token
        "content-type": "application/json"
      },
      success: (res) => {
        console.log(res)
      }
    })
  }
})
```

Additionally, you can use the access token as a bearer token for any Casdoor operation you require.

:::info Tips

Currently, Casdoor is unable to bind existing accounts to WeChat Mini Program users. After Casdoor retrieves the OpenID from WeChat, it will either create a new user if the ID does not exist, or use the existing user if it does.

:::
