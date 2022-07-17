---
title: Custom Provider
description: Add your own custom OAuth provider
keywords: [Custom Provider]
---

:::note

Casdoor supports custom providers, but the custom providers must follow the standard process of 3-legged OAuth, and the return value of `Token URL` and `UserInfo URL` must follow the format specified by Casdoor.

:::

First, go to the provider page of Casdoor, and create a new provider. Select “Custom” in the Type item. It can be seen that in addition to `Client ID` and `Client Secret`, you need to fill in `Auth URL`, `Scope`, `Token URL`, `UserInfo URL` and `Favicon`.

![image-20220418100744005](/img/providers/OAuth/customprovider.png)

- `Auth URL` is the custom provider's OAuth login page address. 

  Suppose we fill in `https://door.casdoor.com/login/oauth/authorize` at the `Auth URL`, then when the user logs in with this custom provider, the browser will first jump to 

  ```
  https://door.casdoor.com/login/oauth/authorize?client_id={ClientID}&redirect_uri=https://{your-casdoor-hostname}/callback&state={State_generated_by_Casdoor}&response_type=code&scope={Scope}` 
  ```

  After authorization is completed, the custom provider should redirect to 

  ```
  https://{your-casdoor-hostname}/callback?code={code}
  ```

  Then the code parameter in this URL will be recognized by Casdoor.

- `Scope` is the scope parameter carried when accessing the `Auth URL`, which is filled in according to the requirements of the custom provider.

- `Token URL` is the API address for obtaining accessToken.

  After obtaining the code in the previous step, Casdoor needs to use this code to get the accessToken.

  Suppose we fill in `https://door.casdoor.com/api/login/oauth/access_token` at the `Token URL`, then Casdoor will access the Token URL as follows

  ````
  curl -X POST -u "{ClientID}:{ClientSecret}" --data-binary "code={code}&grant_type=authorization_code&redirect_uri=https://{your-casdoor-hostname}/callback" https://door.casdoor.com/api/login/oauth/access_token
  ````

  The custom provider should return at least the following

  ````
  {
    "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ixxxxxxxxxxxxxx",
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6xxxxxxxxxxxxxx",
    "token_type": "Bearer",
    "expires_in": 10080,
    "scope": "openid profile email"
  }
  ````

  

- `UserInfo URL` is the API address for obtaining user information by accessToken.

  Suppose we fill in `https://door.casdoor.com/api/userinfo` at the `UserInfo URL`, then Casdoor will access the UserInfo URL as follows

  ````
  curl -X GET -H "Authorization: Bearer {accessToken}" https://door.casdoor.com/api/userinfo
  ````

  The custom provider should return at least the following

  ````
  {
    "name": "admin",
    "preferred_username": "Admin",
    "email": "admin@example.com",
    "picture": "https://casbin.org/img/casbin.svg"
  }
  ````

  

- `Favicon` is the logo URL of a custom provider. 

  This logo will be displayed on Casdoor's login page along with other third-party login providers.