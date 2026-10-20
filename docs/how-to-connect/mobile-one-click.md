---
title: Sign in with the phone number of the device (one-click login)
sidebar_label: Mobile one-click login
description: Let a native app sign users in, or up, with the phone number of the device through the one-click login of Alibaba Cloud PNVS, without an SMS code.
keywords: [one-click login, mobile, phone number, Alibaba Cloud, PNVS, native app, grant type]
authors: [hsluoyz]
---

This guide explains how a native iOS or Android app signs users in with the phone number of the device. The app shows the masked number, the user taps once, and the app gets a token from the carrier. Casdoor exchanges that token for the phone number through the Phone Number Verification Service (PNVS) of Alibaba Cloud, then signs the user in, or signs a new user up, and returns Casdoor tokens. No SMS code is sent.

The token comes from the SDK of the carrier on the phone, so this works in native apps only. The Casdoor sign-in page in a browser doesn't offer it.

---

#### Learning outcomes

- Set up one-click login in the PNVS console of Alibaba Cloud.
- Let a Casdoor application accept the mobile one-click grant.
- Exchange the token of the one-click login SDK for Casdoor tokens.

#### What you need

- An Alibaba Cloud account with PNVS (号码认证服务)
- A native iOS or Android app
- Administrator access to the Casdoor admin console

---

## Set up one-click login in Alibaba Cloud

1. Open the [PNVS console](https://dypns.console.aliyun.com/) and turn on the service.
1. In the one-click login (一键登录) section, create an authentication scheme for each app: the bundle ID for iOS, the package name and the signature for Android. Keep the secret key of the scheme, the app passes it to the SDK.
1. Download the iOS and Android SDKs from the console.
1. In the [RAM console](https://ram.console.aliyun.com/manage/ak), create an AccessKey for a RAM user that may call PNVS, for example with the `AliyunDypnsFullAccess` system policy. Casdoor uses it to call the `GetMobile` API.

Alibaba Cloud charges for each number that `GetMobile` returns. One-click login works with SIM cards of China Mobile, China Unicom and China Telecom, and the phone needs mobile data turned on.

## Get the token in the app

Follow the integration guide of the PNVS SDK:

1. Initialize the SDK with the secret key of the scheme.
1. Check that the environment supports one-click login, for example that mobile data is on.
1. Show the authorization page of the SDK. When the user taps the sign-in button, the SDK returns a `token`.

On Android this is `PhoneNumberAuthHelper.getLoginToken()`, and on iOS `getLoginTokenWithTimeout:controller:model:complete:` of `TXCommonHandler`. The token can be used once and expires after a few minutes, so send it to Casdoor right away. If the environment doesn't support one-click login, fall back to the [verification code grant](/docs/how-to-connect/oauth#verification-code-grant).

## Configure Casdoor

1. Add an `Alibaba Cloud PNVS SMS` provider with the AccessKey ID as **Client ID** and the AccessKey Secret as **Client secret**, see [Send SMS with Alibaba Cloud PNVS](/docs/provider/sms/pnvs). **Sign Name** and **Template code** are only needed if the provider also sends SMS codes.
1. Open the application, add the provider in **Providers**, and turn on **Mobile One-Click** in **Grant types**.

The provider is an SMS provider, so the application also uses it to send verification codes, according to its rule. If the application sends codes through another SMS provider, put that provider above it in **Providers**.

## Exchange the token for Casdoor tokens

Send a `POST` request to `https://<casdoor-host>/api/login/oauth/access_token`:

```json
{
    "grant_type": "urn:casdoor:params:oauth:grant-type:mobile-one-click",
    "client_id": ClientId,
    "code": "<token from the SDK>",
    "scope": "openid profile phone"
}
```

Form data works as well:

```bash
curl -X POST https://<casdoor-host>/api/login/oauth/access_token \
  -d "grant_type=urn:casdoor:params:oauth:grant-type:mobile-one-click" \
  -d "client_id=<ClientId>" \
  -d "code=<token from the SDK>" \
  -d "scope=openid profile phone"
```

The grant needs no client secret, so the app can call it directly. The response is the same as for the other grants:

```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIs...",
    "id_token": "eyJhbGciOiJSUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJSUzI1NiIs...",
    "token_type": "Bearer",
    "expires_in": 604800,
    "scope": "openid profile phone"
}
```

Casdoor treats the number that `GetMobile` returns as a mainland China number (`+86`) and looks for the user with that phone number in the organization of the application. A user whose phone number was saved without a country code is found as well.

## Sign up new users

When no user has the phone number, the grant creates the user, as the sign-up page would, if all of the following conditions hold:

- **Enable signup** is on for the application, and **Disable self signup** is off.
- The **Signup items** of the application require nothing beyond the phone number. Only ID, Username, Display name, Password, Confirm password, Agreement, Signup button, Providers and Phone may be required. The default sign-up items require `Email` too, so make it optional.
- `CN` is in the **Supported country codes** of the organization.

Otherwise, only existing users can sign in with the grant. These are the same conditions as for the [verification code grant](/docs/how-to-connect/oauth#sign-up-new-users-with-a-verification-code).

## When Casdoor refuses the grant

| Situation | `error` |
|-----------|---------|
| **Mobile One-Click** is off in **Grant types** of the application | `unsupported_grant_type` |
| The application has no `Alibaba Cloud PNVS SMS` provider | `unauthorized_client` |
| `code` is empty | `invalid_request` |
| PNVS rejects the token, for example because it was used or has expired | `invalid_grant`, with the code and message of PNVS |
| No user has the number and the application doesn't allow the sign-up | `invalid_grant` |
| The user is forbidden or deleted, or sign-in is turned off for the application or the organization | `invalid_grant` |
| The user has MFA enabled | `invalid_grant`, use the authorization code grant for this user |

## See also

- [OAuth 2.0](/docs/how-to-connect/oauth)
- [Send SMS with Alibaba Cloud PNVS](/docs/provider/sms/pnvs)
