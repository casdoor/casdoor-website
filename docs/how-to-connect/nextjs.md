---
title: Sign users in to a Next.js application
sidebar_label: Next.js
description: Add Casdoor sign-in to a Next.js application with casdoor-js-sdk, and protect routes with Next.js middleware.
keywords: [nextjs, SDK, middleware]
authors: [SamYSF]
---

This guide explains how to add Casdoor sign-in to a Next.js application and how to keep signed-out users away from protected routes.

---

#### Learning outcomes

- Initialize casdoor-js-sdk in a Next.js application.
- Send users to the Casdoor sign-in page and handle the callback.
- Protect routes with Next.js middleware.

#### What you need

- A running Casdoor instance. See [Install the Casdoor server](/docs/basic/server-installation).
- An [application](/docs/application/overview) in Casdoor
- A Next.js application

#### Sample code

- [nextjs-auth](https://github.com/casdoor/nextjs-auth)

---

## Configure the SDK

1. Install casdoor-js-sdk:

   ```shell
   npm install casdoor-js-sdk
   # or: yarn add casdoor-js-sdk
   ```

1. Define the configuration of the SDK. All settings are strings and all are required.

   | Parameter | Required | Description |
   |-----------|----------|-------------|
   | **serverUrl** | Yes | Casdoor server URL (e.g. `http://localhost:8000`). |
   | **clientId** | Yes | Application client ID. |
   | **clientSecret** | Yes | Application client secret. |
   | **organizationName** | Yes | Organization name. |
   | **appName** | Yes | Application name. |
   | **redirectPath** | Yes | Callback path (e.g. `/callback`). |

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

   Replace `serverUrl`, `clientId`, and `clientSecret` with the values of your own Casdoor instance and application.

1. In the Casdoor admin console, add the callback URL of your application, for example `http://localhost:8080/callback`, to the **Redirect URLs** of the application.

## Sign the user in

1. Send the user to the Casdoor sign-in page:

   ```js
   const CasdoorSDK = new Sdk(sdkConfig);
   CasdoorSDK.signin_redirect();
   ```

1. After the user signs in, Casdoor redirects to `redirectPath` with an authorization code. On that page, exchange the code for an access token, read the user, and store the user in a cookie:

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

For the other functions of the SDK, see [Sign users in with a Casdoor SDK](/docs/how-to-connect/sdk).

## Protect routes with middleware

[Next.js middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) runs before a request completes and can redirect it.

1. Create `middleware.ts` or `middleware.js` at the root of the project: at the same level as `pages` or `app`, or inside `src`.
1. List the protected routes and check each request against the list:

   ```js
   const protectedRoutes = ["/profile"];

   export default function middleware(req) {
     if (protectedRoutes.includes(req.nextUrl.pathname)) {
       return NextResponse.redirect(new URL("/login", req.url));
     }
   }
   ```

1. Treat a request with the `casdoorUser` cookie as signed in, and redirect all other requests away from the protected routes:

   ```js
   const protectedRoutes = ["/profile"];
   const casdoorUserCookie = req.cookies.get("casdoorUser");
   const isAuthenticated = !!casdoorUserCookie;

   if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
     return NextResponse.redirect(new URL("/login", req.url));
   }
   ```

## See also

- [Sign users in to a Nuxt application](/docs/how-to-connect/nuxt)
- [Sign users in with a Casdoor SDK](/docs/how-to-connect/sdk)
- [OAuth 2.0](/docs/how-to-connect/oauth)
