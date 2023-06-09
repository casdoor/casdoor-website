---
title: 微信小程序
description: 在 微信小程序中使用 Casdoor
keywords:
  - 微信
  - 小程序
authors:
  - Steve0x2a
---

:::info

Casdoor支持1.41.0版后的微信小程序

:::

## 介绍

由于微信小程序不支持标准的 OAuth，所以它不能跳转到自主机的 Casdoor 网页进行登录。 因此，将Casdoor 用于微信小程序的过程与普通方案的过程有所不同。

这份文件将讨论如何通过Casdoor访问微信小程序。 您可以在 GitHub 上找到示例： [casdoor-wechat-miniprogram-example](https://github.com/casdoor/casdoor-wechat-miniprogram-example)。 详细信息可参见微信小程序 [登录文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html) 。
> 以下是配置中的一些专有名词：
> 
> `CASDOOR_HOSTNAME`：私有部署的Casdoor域名或IP。 例如：`https://door.casbin.com`.

## 第一步： 部署Casdoor

首先，您应先部署 [Casdoor](/docs/basic/server-installation)。

成功部署后，您需要确认：

1. Casdoor 可以正常登录使用。
2. 将 Casdoor 的 `origin` 值 (conf/app.conf) 设置为 `CASDOOR_HOSTNAME`。 ![Casdoor 配置](/img/integration/casdoor_origin.png)

## 第二步： 配置Casdoor应用程序

1. 在 casdoor 创建一个wechat idp, 并填写微信小程序开发平台给您的 `APPID` 和 `APPSECRET` ： ![WeChat_MiniProgram.png](/img/integration/javascript/wechat_miniprogram/WeChat_MiniProgram.png)
2. 创建或使用现有的 Casdoor 应用程序。
3. 将上面添加的 idp 添加到您想要使用的应用程序中。

:::info Tips

为方便起见，casdoor 将在应用程序中读取第一个WeChat类型 idp 默认是微信小程序 idp 。

因此，如果你想要在这个应用中使用微信小程序，请不要在一个应用中添加 WeChat 类型 idp 。

:::

## 第三步： 编写微信小程序

WeChat Mini 方案提供一个内部登录的API并获取代码。 您需要做的只是将此代码发送到Casdoor。 Casdoor 将使用此代码从 WeChat 服务器获取一些信息(例如OpenID、 SessionKey 等)。

下面代码展示如何完成上述过程：

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

值得一提的是，`tag` 参数是强制性的，您需要让户了解这是来自微信小程序的请求。

上述代码在用户登录时传入微信小程序用户名和头像uri。 您也可以通过这两个参数而不首先传递它们。 然后在登录成功并获得访问令牌后将它们传递到 casdoor ：

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

此外，您可以使用 accessToken 作为任何Casdoor操作的访问令牌

:::info Tips

目前 Casdoor 无法将现有账户绑定到微信小程序用户。 在 Catdoor 从WeChat 获取 openID ，如果此 id 不存在。 将创建一个新用户，如果它存在，将使用旧用户。

:::
