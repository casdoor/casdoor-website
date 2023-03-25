---
title: How to Enable Single Sign-On
description: Enable Single Sign-On 
keywords: [SSO, Single Sign-On]
authors: [leo220yuyaodog]
---

## Introduction

You have connected Casdoor and configured more than one application in an organization. You want users to sign in once 
to any app in nomeguythe organization, and then be able to sign in when they go to another app, without any extra clicks. 

We offer this single sign-on, you just need to:

- Enable Auto signin button.
- Fill in the URL for home page.
- Add a **Silent Signin** function to the application home page.

:::note

The basic sign in process provided by Casdoor allows users to log in to other applications in the organization by 
selecting the user who is currently logged in or using another account. 

After enable the auto signin, the selection box will not display, the logged user will log in directly.

:::

## Configure

1. Fill the field **home**. It can be the application's home page or the login page.

![sso_home.png](/img/how-to-connect/single-sign-on/sso_home.png)
2. Enable Auto signin button.

![sso_signin.png](/img/how-to-connect/single-sign-on/sso_signin.png)

## Add Silent Signin

In fact, we implement auto login by carrying parameters on the URL. So your applications need to have a method to trigger
the login after jumping to the URL. We provide [casdoor-react-sdk](https://github.com/casdoor/casdoor-react-sdk) for you
to quickly implement the feature. You can see details in [use-in-react](https://github.com/casdoor/casdoor-react-sdk#use-in-react).

:::info

How it works

1. In the URL to the application home page, we will carry the `silentSignin` parameter.
2. In your HomePage to determine whether you need to log in silently(automatically) by the parameter `silentSignin`. If
   silentSignin === 1, the function returns the SilentSignin component, it will help you initiate a login request. And since you have
   auto-login enabled, users will log in automatically without clicking.

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

## Using SSO

The configuration is complete, below will show you how to use auto login. 

:::info

Make sure in your application can redirect to user's profile page. The API [getMyProfileUrl(account, returnUrl)](https://github.com/casdoor/casdoor-js-sdk#get-my-profile-page-url) 
is provided in our SDK for each language.

:::

Open the profile page and go to the home page. You will see other apps in the organization.

![sso_homepage.png](/img/how-to-connect/single-sign-on/sso_homepage.png)

Click the application panel, will jump to the url you set in configuration and automatically log in to the application.
