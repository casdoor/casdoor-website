---
title: Next.js
description: Integrate Casdoor in a Next.js app with middleware and the JS SDK.
keywords: [nextjs, SDK, middleware]
authors: [SamYSF]
---

The [nextjs-auth](https://github.com/casdoor/nextjs-auth) repo demonstrates Casdoor integration in Next.js. Steps below.

## Step 1: Deploy Casdoor

Deploy Casdoor in [production mode](/docs/basic/server-installation). Confirm the login page works (e.g. at `http://localhost:8000` with `admin` / `123` in dev).

## Step 2: Add middleware

Put `middleware.ts` (or `.js`) at the project root (same level as `pages` or `app`, or inside `src`). Middleware runs before the request completes and can redirect or modify the response.

Example:

```js
const protectedRoutes = ["/profile"];

export default function middleware(req) {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
```

See [Next.js middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware).

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

After sign-in, Casdoor redirects back with a code. Exchange for a token and optionally store the user in a cookie:

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

In middleware, treat the presence of the Casdoor user cookie as authenticated and redirect unauthenticated users away from protected routes:

```js
const protectedRoutes = ["/profile"];
const casdoorUserCookie = req.cookies.get("casdoorUser");
const isAuthenticated = !!casdoorUserCookie;

if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
  return NextResponse.redirect(new URL("/login", req.url));
}
```
