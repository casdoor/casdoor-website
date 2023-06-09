---
title: 自定义提供商
description: 添加您自己的自定义OAuth 提供商
keywords:
  - 自定义提供商
authors:
  - halozhy
---

:::note

Casdoor 支持自定义提供商，但自定义提供商必须遵循 3-leged OAuth 的标准流程。 和 `Token URL` 和 `UserInfo URL` 的返回值必须遵循 Cassdoor 指定的格式。

:::

首先，前往 Cassdoor 的供应商页面并创建一个新的供应商。 在类型项中选择“自定义”。 除了 `Client ID` 和 `Client Secret `您需要填写 `Auth URL`,` Scope`, `Token URL`, `UserInfo URL` 和 `Favicon`

![image-20220418100744005](/img/providers/OAuth/customprovider.png)

- `Auth URL` 是自定义提供商的 OAuth 登录页面地址。

  假定我们填写 `https://door.cassdoor.com/login/oauth/auth/authorization` at `Auth URL`, 然后当用户登录到此自定义提供商时，浏览器将先跳转到

  ```url
  https://door.casdoor.com/login/oauth/authorize?client_id={ClientID}&redirect_uri=https://{your-casdoor-hostname}/callback&state={State_generated_by_Casdoor}&response_type=code&scope={Scope}` 
  ```

  授权完成后，自定义提供商应该重定向到

  ```url
  https://{your-casdoor-hostname}/callback?code={code}
  ```

  然后，此 URL 中的代码参数将会被 Casdoor 识别。

- `Scope` 是访问 `Auth URL `时携带的范围参数 它是根据自定义提供商的要求填写的。

- `Token URL` 是获取 accessToken 的 API 地址。

  在上一步获取代码后，Casdoor 需要使用此代码获取 accessToken。

  假定我们在 `https://door.casdoor.com/api/login/oauth/access_token` 在 `Token URL`中填写，然后 Casdoor 将访问 Token URL 如下所示：

  ```bash
  curl -X POST -u "{ClientID}:{ClientSecret}" --data-binary "code={code}&grant_type=authoritiation_code&redirect_uri=https://{your-casdoor-hostname}/callback" https://door.casdoor.com/api/login/oauth/access_token
  ```

  自定义提供商至少应该返回以下内容

  ```json
  {
    "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ixxxxxxxxxxxxxx",
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6xxxxxxxxxxxxxx",
    "token_type": "Bearer",
    "expires_in": 10080,
    "scope": "openid profile email"
  }
  ```

- `Token URL` 是获取 accessToken 的 API 地址。

  假定我们在 `https://door.casdoor.com/api/userinfo` 在 `Token URL `中填写，然后 Casdoor 将访问 Token URL 如下所示：

  ```bash
  curl -X GET -H "Authorization: Bearer {accessToken}" https://door.casdoor.com/api/userinfo
  ```

  自定义提供商至少应该返回以下内容

  ```json
  {
    "name": "admin",
    "preferred_username": "Admin",
    "email": "admin@example.com",
    "picture": "https://casbin.org/img/casbin.svg"
  }
  ```

- `Favicon` 是自定义提供商的标识URL。

  这个标识将与其他第三方登录供应商一起显示在Casdoor的登录页面上。
