---
title: Nuxt
description: Integrate Casdoor in a Nuxt app with middleware and the JS SDK.
keywords: [nuxt, SDK, middleware]
authors: [xiao-kong-long]
---

The [nuxt-auth](https://github.com/casdoor/nuxt-auth) repo demonstrates Casdoor integration in Nuxt. The flow is similar to the [Next.js](/docs/how-to-connect/nextjs) example.

## Step 1: Deploy Casdoor

Deploy Casdoor in [production mode](/docs/basic/server-installation). Confirm the login page works (e.g. at `http://localhost:8000` with `admin` / `123` in dev).

## Step 2: Add middleware

Create a `.js` or `.ts` file in the `middleware` directory. The filename becomes the middleware name (e.g. `myMiddleware.js` → `myMiddleware`). Reference it in `nuxt.config.js`.

Example:

```js
const protectedRoutes = ["/profile"];

export default function ({ route, redirect }) {
  if (protectedRoutes.includes(route.path)) {
    redirect('/login');
  }
}
```

Enable in `nuxt.config.js`:

```js
export default {
  router: {
    middleware: ['myMiddleware']  // your middleware name
  },
}
```

See [Nuxt middleware](https://nuxt.com/docs/guide/directory-structure/middleware).

## Step 3: Use Casdoor SDK

### Install

```shell
npm install casdoor-js-sdk
# or: yarn add casdoor-js-sdk
```

### Initialize

Provide these six string parameters:

| Parameter | Required | Description |
|-----------|----------|-------------|
| **serverUrl** | Yes | Casdoor server URL (e.g. `http://localhost:8000`). |
| **clientId** | Yes | Application client ID. |
| **clientSecret** | Yes | Application client secret. |
| **organizationName** | Yes | Organization name. |
| **appName** | Yes | Application name. |
| **redirectPath** | Yes | Callback path (e.g. `/callback`). |

Example:

```js
const sdkConfig = {
  serverUrl: "https://door.casdoor.com",
  clientId: "294b09fbc17f95daf2fe",
  clientSecret: "dd8982f7046ccba1bbd7851d5c1ece4e52bf039d",
  organizationName: "casbin",
  appName: "app-vue-python-example",
  redirectPath: "/callback",
};
```

:::caution
Replace with your own Casdoor instance: `serverUrl`, `clientId`, and `clientSecret`.
:::

Add the callback URL (e.g. `http://localhost:8080/callback`) in the application’s Redirect URLs.

### Redirect to sign-in and handle callback

```js
const CasdoorSDK = new Sdk(sdkConfig);
CasdoorSDK.signin_redirect();
```

After sign-in, exchange the code for a token and optionally store the user in a cookie:

```js
CasdoorSDK.exchangeForAccessToken()
  .then((res) => {
    if (res && res.access_token) {
      return CasdoorSDK.getUserInfo(res.access_token);
    }
  })
  .then((res) => {
    Cookies.set("casdoorUser", JSON.stringify(res));
  });
```

See [How to use Casdoor SDK](/docs/how-to-connect/sdk).

## Step 4: Protect routes in middleware

Check the Casdoor user cookie and redirect unauthenticated users from protected routes:

```js
import Cookies from "js-cookie";

const protectedRoutes = ["/profile"];

export default function ({ route, redirect }) {
  const casdoorUserCookie = Cookies.get('casdoorUser');
  const isAuthenticated = !!casdoorUserCookie;

  if (!isAuthenticated && protectedRoutes.includes(route.path)) {
    redirect('/login');
  }
}
```
