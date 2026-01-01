---
title: How to Enable Single Sign-On
description: Enable Single Sign-On 
keywords: [SSO, Single Sign-On]
authors: [leo220yuyaodog]
---

## Introduction

You have connected Casdoor and configured more than one application in an organization. You want users to sign in once to any app in the organization and then be able to sign in when they go to another app without any extra clicks.

We offer this single sign-on feature. To enable it, you just need to:

- Enable the Auto Sign-In button.
- Fill in the URL for the home page.
- Add a **Silent Sign-In** function to the application home page.

:::note

The basic sign-in process provided by Casdoor allows users to log in to other applications in the organization by selecting the user who is currently logged in or using another account.

After enabling auto sign-in, the selection box will not be displayed, and the logged-in user will log in directly.

:::

## Configuration

1. Fill in the "home" field. It can be the application's home page or the login page.

![sso_home.png](/img/how-to-connect/single-sign-on/sso_home.png)
2. Enable the Auto Sign-In button.

![sso_signin.png](/img/how-to-connect/single-sign-on/sso_signin.png)

## Add Silent Sign-In

In fact, we implement auto login by carrying parameters in the URL. Therefore, your applications need to have a method to trigger the login after jumping to the URL. We provide the [casdoor-react-sdk](https://github.com/casdoor/casdoor-react-sdk) to help you quickly implement this feature. You can see the details in [use-in-react](https://github.com/casdoor/casdoor-react-sdk#use-in-react).

:::info

How it works

1. In the URL to the application home page, we will carry the `silentSignin` parameter.
2. In your home page, determine whether you need to log in silently (automatically) by checking the `silentSignin` parameter. If `silentSignin === 1`, the function should return the `SilentSignin` component, which will help you initiate a login request. Since you have auto-login enabled, users will log in automatically without clicking.
3. The silent sign-in flow ensures proper context matching—it only triggers when the account's organization matches the current application context, preventing duplicate login attempts and unintended automatic sign-ins.

:::

## Add Popup Sign-In

The "popup sign-in" feature will open a small window. After logging in to Casdoor in the child window, it will send authentication information to the main window and then close automatically. We implement this feature by carrying parameters in the URL.

:::info

How to use

Use the `popupSignin()` method in the [casdoor-js-sdk](https://github.com/casdoor/casdoor-js-sdk) to quickly implement this feature. You can see a demo in [casdoor-nodejs-react-example](https://github.com/casdoor/casdoor-nodejs-react-example).

How it works

1. In the URL to the application home page, we will carry the `popup` parameter.
2. When `popup=1` is in the login parameters, Casdoor will send `code` and `state` as a message to the main window and finish getting the `token` in the main window using the SDK.

:::

## Using SSO

The configuration is complete. Below, we will show you how to use auto login.

:::info

Make sure your application can redirect to the user's profile page. The [getMyProfileUrl(account, returnUrl)](https://github.com/casdoor/casdoor-js-sdk#get-my-profile-page-url) API is provided in our SDK for each language.

:::

Open the profile page and go to the "Home" page (`/` URL path). You will see the application list provided by the organization. It's worth noting that only users in organizations other than "built-in" can see the application list on the "Home" page. All the global administrators (those in the "built-in" organization) cannot see it.

![sso_homepage.png](/img/how-to-connect/single-sign-on/sso_homepage.png)

Click on a tile in the application list, and it will jump to the homepage URL of that application with the GET parameter `?silentSignin=1`. It will automatically log into the application if the application has integrated with Casdoor SSO (so it will recognize the `?silentSignin=1` parameter and perform a silent login in the background).

## SSO Logout

When using SSO, you might need to log a user out from all applications simultaneously. Casdoor provides an SSO logout endpoint that terminates all active sessions and expires all tokens for a user across all applications in the organization.

To implement SSO logout in your application, make a request to the `/api/sso-logout` endpoint. This endpoint will ensure the user is completely logged out from all integrated applications. For detailed information about the SSO logout API, including authentication methods and request examples, see the [Single Sign-Out](/docs/session/single-sign-out) documentation.
