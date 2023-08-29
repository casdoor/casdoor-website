---
title: Vue SDK
description: Casdoor Vue SDK
keywords: [Vue, SDK]
authors: [Nekotoxin]
---

The Casdoor Vue SDK is designed for Vue 2 and Vue 3, making it very convenient to use.

The Vue SDK is based on casdoor-js-sdk. You can also use the casdoor-js-sdk directly, which will allow for more customization.

Please note that this plugin is still in development. If you have any questions or suggestions, please feel free to contact us by opening an [issue](https://github.com/casdoor/casdoor-vue-sdk/issues).

We will now show you the necessary steps below.

> If you are still unsure how to use it after reading the README.md, you can refer to the example: [casdoor-python-vue-sdk-example](https://github.com/casdoor/casdoor-python-vue-sdk-example) for more details.
>
> The example's front-end is built with casdoor-vue-sdk, while the back-end is built with casdoor-python-sdk. You can view the source code in the example.

## Installation

```shell
# NPM
npm install casdoor-vue-sdk

# Yarn
yarn add casdoor-vue-sdk
```

## Initializing the SDK

To initialize the SDK, you will need to provide 5 string parameters in the following order:

| Name             | Required | Description                                                  |
| ---------------- | -------- | ------------------------------------------------------------ |
| serverUrl        | Yes      | The URL of your Casdoor server.                              |
| clientId         | Yes      | The Client ID of your Casdoor application.                   |
| appName          | Yes      | The name of your Casdoor application.                        |
| organizationName | Yes      | The name of the Casdoor organization linked to your Casdoor application. |
| redirectPath     | No       | The path of the redirect URL for your Casdoor application. If not provided, it will default to `/callback`. |

For Vue 3:

```javascript
// in main.js
import Casdoor from 'casdoor-vue-sdk'

const config = {
  serverUrl: "http://localhost:8000",
  clientId: "4262bea2b293539fe45e",
  organizationName: "casbin",
  appName: "app-casnode",
  redirectPath: "/callback",
};

const app = createApp(App)
app.use(Casdoor, config)
```

For Vue 2:

```javascript
// in main.js
import Casdoor from 'casdoor-vue-sdk'
import VueCompositionAPI from '@vue/composition-api'

const config = {
  serverUrl: "http://localhost:8000",
  clientId: "4262bea2b293539fe45e",
  organizationName: "casbin",
  appName: "app-casnode",
  redirectPath: "/callback",
};

Vue.use(VueCompositionAPI)
Vue.use(Casdoor, config)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## Example

```vue
// in app.vue
<script>
export default {
  name: 'App',
  methods: {
    login() {
      window.location.href = this.getSigninUrl();
    },
    signup() {
      window.location.href = this.getSignupUrl();
    }
  }
}
</script>
```

Auto Fix

If the `postinstall` hook does not get triggered or if you have updated the Vue version, try running the following command to resolve the redirecting issue:

```shell
npx vue-demi-fix
```

For more information about switching Vue versions, please refer to the [vue-demi docs](https://github.com/vueuse/vue-demi).
