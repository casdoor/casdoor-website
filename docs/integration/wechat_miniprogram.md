---
title: WeChat MiniProgram
description: Using Casdoor in WeChat MiniProgram
keywords: [WeChat, MiniProgram]
---

:::info 

Casdoor supports WeChat Mini Program after version 1.41.0

:::

Since WeChat Mini Program do not support standardized OAuth, it cannot jump to the self-host Casdoor webpage for login. Therefore, the process of using Casdoor for WeChat Mini Program is different from that of ordinary programs. This document will talk about how to access Casdoor to WeChat Mini Program, and more detailed information can be found in the WeChat Mini Program [login document](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html).

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed. e.g., `https://door.casbin.com`.

## Step1. Deploy Casdoor
Firstly, the [Casdoor](/docs/basic/server-installation) should be deployed. 

After a successful deployment, you need to ensure:
1. Casdoor can be logged in and used normally.
2. Set Casdoor's `origin` value (conf/app.conf) to `CASDOOR_HOSTNAME`.
![Casdoor conf](/img/casdoor_origin.png)

## Step2. Configure Casdoor application
1. Create a wechat idp in casdoor and fill your `APPID` and `APPSECRET` given to you by WeChat Mini Program develop platform:
![WeChat_MiniProgram.png](/img/integration/WeChat_MiniProgram.png)
2. Create or use an existing Casdoor application.
3. Add the idp added above to the application you want to use.

:::info Tips

For convenience, casdoor will read the first WeChat type idp in the application as the WeChat Mini Program idp by default.

So if you want to use the WeChat Mini Program in this app, don't add multiple WeChat type idp in one app.

:::

## Step3. Write WeChat MiniProgram code
WeChat Mini Program provides an API to login internally and get the Code, all you need to do is to send this Code to Casdoor,
Casdoor will use this Code to get some information from WeChat server (such as OpenID, SessionKey, etc.).

The following code shows how to accomplish the above process:

```js
// login in mini program
wx.login({
  success: res => {
    // this is your login code you need to send to casdoor
    console.log(res.code)
    
    wx.request({
      url: `${CASDOOR_HOSTNAME}/api/login/oauth/access_token`,
      method: "POST",
      data: {
        "tag": "wechat_miniprogram", // required
        "client_id": "6825f4f0af45554c8952",
        "code": res.code,
        "username": this.data.userInfo.nickName, // update user profile, when you login.
        "avatar": this.data.userInfo.avatarUrl,
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success: res => {
        console.log(res)
        this.globalData.accessToken = res.data.access_token // get casdoor's accessToken
      }
    })
  }
})
```
It is worth mentioning that the `tag` parameter is mandatory and you need to make casdoor understand that this is a request from the WeChat Mini Program.

The above code passes in the username and avatar uri of the WeChat Mini Program user while logging in. You can also pass these two parameters without passing them first, and then pass them to casdoor after the login is successful and accessToken is obtained:
```js
wx.getUserProfile({
  desc: 'share your info to casdoor', 
  success: (res) => {
    this.setData({
      userInfo: res.userInfo,
      hasUserInfo: true
    })
    console.log(app.globalData.accessToken)
    wx.request({
      url: `${CASDOOR_HOSTNAME}/api/update-user`, // casdoor uri
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

Also, you can use accessToken as a bearer token for any Casdoor operation you want.

:::info Tips

Currently Casdoor is unable to bind existing accounts to the WeChat Mini Program users. After Casdoor gets the openID from WeChat if this id does not exist, a new user will be created, and if it exists, the old one will be used.

:::
