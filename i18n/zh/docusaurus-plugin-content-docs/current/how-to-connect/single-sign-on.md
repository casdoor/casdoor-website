---
title: 如何启用单点登录
description: 启用单点登录
keywords:
  - SSO
  - 单点登录
authors:
  - leo220yuyaodog
---

## 简介

您已连接了 Casdoor ，并在组织中配置了多个应用程序。 您希望用户登录一次到组织中的任何应用程序，然后在他们转到另一个应用程序时能够登录，而无需额外单击。

我们提供这个单点登录，您只需要：

- 启用自动登录按钮。
- 填写首页的 URL。
- 在应用程序主页中添加 **Silent Signin** 函数。

:::note

Casdoor 提供的基本登录过程允许用户通过 选择当前登录的用户或使用另一个账户登录到组织中的其他应用程序。

启用自动登录后，选择框将不显示，登录用户将直接登录。

:::

## 配置

1. 填充字段 **首页**。 它可以是应用程序的主页或登录页面。

![sso_home.png](/img/how-to-connect/single-sign-on/sso_home.png)
2. 启用自动登录按钮。

![sso_signin.png](/img/how-to-connect/single-sign-on/sso_signin.png)

## 添加静默登录

事实上，我们通过在URL上传参数来实现自动登录。 所以您的应用程序需要有一种方法来在跳转到URL后触发 登录。 我们提供了 [casdoor-react-sdk](https://github.com/casdoor/casdoor-react-sdk) 以便您快速实现此功能。 详细信息请参阅[use-in-react](https://github.com/casdoor/casdoor-react-sdk#use-in-react).

:::info

工作原理

1. 在应用程序主页的 URL 中，我们将携带 `silentSignin` 参数。
2. 在您的主页中确定您是否需要通过参数 `静音签名` 来静音登录。 如果 silentSignin === 1，函数返回 SilentSignin 组件，这将帮助您启动登录请求。 既然您已启用自动登录，用户将自动登录无需点击。

:::

## Add Popup Signin

`popup signin` will pop up a small window. After logging in to Casdoor in the child window, it will send authentication information to the main window and then close automatically. We implement it by carrying parameters on the URL.

:::info

How to use

Use the method `popupSignin()` in sdk [casdoor-js-sdk](https://github.com/casdoor/casdoor-js-sdk) to quickly implement the feature. You can see a demo in [casdoor-nodejs-react-example](https://github.com/casdoor/casdoor-nodejs-react-example).

How it works

1. In the URL to the application home page, we will carry the `popup` parameter.
2. When `popup=1` in login params, Casdoor will send `code` and `state` as a message to main window and finish get `token` in main window by SDK.
:::

## 使用 SSO

配置已完成，下面将展示如何使用自动登录。

:::info

请确保您的应用程序可以重定向到用户的个人资料页面。 API [getMyProfileUrl(帐户，返回 Url)](https://github.com/casdoor/casdoor-js-sdk#get-my-profile-page-url) 是在我们的SDK中为每种语言提供的。

:::

Open the profile page and go to the "Home" page (`/` URL path). You will see the application list provided by the organization. It's notable that only users in organizations other that `built-in` can see the application list in the "Home" page. All the global administrators (aka in the `built-in` organization) cannot see it.


![sso_homepage.png](/img/how-to-connect/single-sign-on/sso_homepage.png)

Click on a tile in the application list, it will jump to the homepage URL of that application with GET parameter: `?silentSignin=1` and automatically log into the application if the application has integrated with Casdoor SSO (so it will recognize the `?silentSignin=1` parameter and perform silent login in the background).
