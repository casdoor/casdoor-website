---
title: Nuxt
description: Using Casdoor in a Nuxt project
keywords: [nuxt]
authors: [xiao-kong-long]
---

[nuxt-auth](https://github.com/casdoor/nuxt-auth) is an example of how to integrate casdoor in a nuxt project. We will guide you through the steps below. Many steps are similar to nextjs-auth.

## Step 1: Deploy Casdoor

Firstly, Casdoor should be deployed.

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation). Please deploy your Casdoor instance in **production mode**.

After a successful deployment, make sure the following:

- Open your favorite browser and visit **<http://localhost:8000>**. You will see the login page of Casdoor.
- Test the login functionality by entering `admin` as the username and `123` as the password.

After that, you can quickly implement a Casdoor-based login page in your own app using the following steps.

## Step 2: Add Middleware

Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Create `.js` or `.ts` files in `middleware` directory in the root of your project to define Middleware. And the filenames are identified as the names of middleware. For example, in [nuxt-auth](https://github.com/casdoor/nuxt-auth), we create a file named `myMiddleware.js` in `middleware` directory, which can be refrenced as `myMiddleware` in other places like `nuxt.config.js`.

### Example

```js
//define which paths Middleware will run on
const protectedRoutes = ["/profile"];

export default function ({route, redirect}) {

  if (protectedRoutes.includes(route.path)) {
    //redirect the incoming request to a different URL
    redirect('/login');
  }
}
```

To make middleware work, you should add router in `nuxt.config.js`, like that:

```js
export default {
    // other configuations

    // what to add
    router: {
    middleware: ['myMiddleware'] // replace to your middleware name
  },
}

```

See nuxt official documentation [middleware](https://nuxt.com/docs/guide/directory-structure/middleware) for more details.

## Step 3: Use Casdoor SDK

### 1.Install the SDK

First, install `casdoor-js-sdk` via NPM or Yarn:

```shell
npm install casdoor-js-sdk
```

Or:

```shell
yarn add casdoor-js-sdk
```

### 2.Initializing the SDK

Then initialization 6 string-type parameters in the following order:

| Name | Required | Description |
|--------------------|----------|-----------------------------------------------------|
| serverUrl | Yes | Casdoor Server URL, such as `http://localhost:8000` |
| clientId | Yes | Application client ID |
| clientSecret | Yes | Application client secret |
| organizationName | Yes | Application organization |
| appName | Yes | Application name |
| redirectPath | Yes | redirected URL |

### Example

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

Replace the configuration values with your own Casdoor instance, especially the `clientId`, `clientSecret`, and `serverUrl`.

:::

### 3.Redirect to the Login Page

When you need to authenticate users who access your app, you can send the target URL and redirect to the login page provided by Casdoor.

Make sure you have added the callback URL (e.g. **<http://localhost:8080/callback>**) in the application configuration beforehand.

```js
const CasdoorSDK = new Sdk(sdkConfig);
CasdoorSDK.signin_redirect();
```

### 4.Get Token and Storage

After the Casdoor verification is passed, it will redirect back to your application with token.

You can opt in to use cookie to storage the token.

```js
CasdoorSDK.exchangeForAccessToken()
  .then((res) => {
    if (res && res.access_token) {
      //Get Token
      return CasdoorSDK.getUserInfo(res.access_token);
    }
  })
  .then((res) => {
    // Storage Token
    Cookies.set("casdoorUser", JSON.stringify(res));
  });
```

You can refer to the Casdoor official documentation for the [How to use Casdoor SDK](https://casdoor.org/docs/how-to-connect/sdk/#how-to-use-casdoor-sdk).

## Step 4: Add Middleware Authentication Function

when users attempt to access a protected route, Middleware Authentication function verifies their identity. If the user is not authenticated, they are redirected to a login page or denied access.

### Example

```js
import Cookies from "js-cookie";

const protectedRoutes = ["/profile"];

export default function ({route, redirect}) {
  const casdoorUserCookie = Cookies.get('casdoorUser');
  const isAuthenticated = !!casdoorUserCookie;

  if (!isAuthenticated && protectedRoutes.includes(route.path)) {
    redirect('/login');
  }
}
```
