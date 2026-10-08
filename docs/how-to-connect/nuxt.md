---
title: Sign users in to a Nuxt application
sidebar_label: Nuxt
description: Add Casdoor sign-in to a Nuxt application with casdoor-js-sdk, and protect routes with Nuxt middleware.
keywords: [nuxt, SDK, middleware]
authors: [xiao-kong-long]
---

This guide explains how to add Casdoor sign-in to a Nuxt application and how to keep signed-out users away from protected routes. The steps mirror the [Next.js guide](/docs/how-to-connect/nextjs).

---

#### Learning outcomes

- Initialize casdoor-js-sdk in a Nuxt application.
- Send users to the Casdoor sign-in page and handle the callback.
- Protect routes with Nuxt middleware.

#### What you need

- A running Casdoor instance. See [Install the Casdoor server](/docs/basic/server-installation).
- An [application](/docs/application/overview) in Casdoor
- A Nuxt application

#### Sample code

- [nuxt-auth](https://github.com/casdoor/nuxt-auth)

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

[Nuxt middleware](https://nuxt.com/docs/guide/directory-structure/middleware) runs before a route renders and can redirect.

1. Create a `.js` or `.ts` file in the `middleware` directory. The file name is the name of the middleware: `myMiddleware.js` defines `myMiddleware`.

   ```js
   const protectedRoutes = ["/profile"];

   export default function ({ route, redirect }) {
     if (protectedRoutes.includes(route.path)) {
       redirect('/login');
     }
   }
   ```

1. Turn on the middleware in `nuxt.config.js`:

   ```js
   export default {
     router: {
       middleware: ['myMiddleware']  // your middleware name
     },
   }
   ```

1. In the middleware, treat a request with the `casdoorUser` cookie as signed in, and redirect all other requests away from the protected routes:

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

## See also

- [Sign users in to a Next.js application](/docs/how-to-connect/nextjs)
- [Sign users in to a Vue application](/docs/how-to-connect/vue-sdk)
- [Sign users in with a Casdoor SDK](/docs/how-to-connect/sdk)
