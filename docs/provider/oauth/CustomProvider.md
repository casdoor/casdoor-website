---
title: Custom OAuth provider
description: Integrate any OAuth 2.0–compliant IdP (Custom through Custom10).
keywords: [Custom Provider, OAuth, Casdoor]
authors: [halozhy]
---

:::note
Custom providers must use standard 3-legged OAuth. Responses from **Token URL** and **UserInfo URL** must match the formats below.
:::

Use **Custom** OAuth to connect Casdoor to any OAuth 2.0–compliant service: internal IdPs, self-hosted auth, or third-party services not yet built-in. You can add up to **10** custom providers: **Custom**, **Custom2**, … **Custom10**, each with its own config.

## Create a custom provider

In Casdoor **Providers** → **Add**, set **Type** to one of Custom, Custom2, … Custom10. Fill in **Client ID**, **Client Secret**, **Auth URL**, **Scope**, **Token URL**, **UserInfo URL**, and **Favicon**.

![image-20220418100744005](/img/providers/OAuth/customprovider.png)

- **Auth URL** — OAuth authorization endpoint. Example: with `https://door.casdoor.com/login/oauth/authorize`, the browser is sent to

  ```url
  https://door.casdoor.com/login/oauth/authorize?client_id={ClientID}&redirect_uri=https://{your-casdoor-hostname}/callback&state={State_generated_by_Casdoor}&response_type=code&scope={Scope}` 
  ```

  With **Enable PKCE** on, Casdoor adds:

  ```url
  &code_challenge={code_challenge}&code_challenge_method=S256
  ```

  The IdP must then redirect to

  ```url
  https://{your-casdoor-hostname}/callback?code={code}
  ```

  After this step, Casdoor will recognize the code parameter in the URL.

- **Scope** — Scope string sent to the Auth URL (per your IdP’s docs).

- **Enable PKCE** — When on, Casdoor sends `code_challenge`/`code_challenge_method=S256` in the auth request and `code_verifier` in the token request. Enable if your IdP requires or supports PKCE.

- **Token URL** — Token endpoint. Casdoor calls it with the code to get an access token. Example:

  ```bash
  curl -X POST -u "{ClientID}:{ClientSecret}" --data-binary "code={code}&grant_type=authorization_code&redirect_uri=https://{your-casdoor-hostname}/callback" https://door.casdoor.com/api/login/oauth/access_token
  ```

  When PKCE is enabled, the request includes the code verifier:

  ```bash
  curl -X POST -u "{ClientID}:{ClientSecret}" --data-binary "code={code}&grant_type=authorization_code&redirect_uri=https://{your-casdoor-hostname}/callback&code_verifier={code_verifier}" https://door.casdoor.com/api/login/oauth/access_token
  ```

  Response must include at least:

  ```json
  {
    "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ixxxxxxxxxxxxxx",
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6xxxxxxxxxxxxxx",
    "token_type": "Bearer",
    "expires_in": 10080,
    "scope": "openid profile email"
  }
  ```

- **UserInfo URL** — API to get user info with the access token. Casdoor calls it like:

  ```bash
  curl -X GET -H "Authorization: Bearer {accessToken}" https://door.casdoor.com/api/userinfo
  ```

  Response must include at least:

  ```json
  {
    "name": "admin",
    "preferred_username": "Admin",
    "email": "admin@example.com",
    "picture": "https://casbin.org/img/casbin.svg",
    "phone": "+1234567890"
  }
  ```

  `phone` is optional; if present, it is stored as the user’s phone in Casdoor.

- **Favicon** — URL of the provider logo shown on the Casdoor login page.
