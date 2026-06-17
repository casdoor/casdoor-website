---
title: Vue SDK
description: Use Casdoor in Vue 2 or Vue 3 with the official Vue SDK.
keywords: [Vue, SDK]
authors: [Nekotoxin]
---

The **Casdoor Vue SDK** works with Vue 2 and Vue 3 and wraps [casdoor-js-sdk](/docs/how-to-connect/sdk) for easier integration. For more control, use the JS SDK directly.

:::note
This plugin is still in development. Questions or suggestions: [open an issue](https://github.com/casdoor/casdoor-vue-sdk/issues).
:::

Full example (Vue frontend + Python backend): [casdoor-python-vue-sdk-example](https://github.com/casdoor/casdoor-python-vue-sdk-example).

## Installation

```shell
# NPM
npm install casdoor-vue-sdk

# Yarn
yarn add casdoor-vue-sdk
```

## Initialization

Provide these parameters (all strings):

| Parameter | Required | Description |
|-----------|----------|-------------|
| **serverUrl** | Yes | Casdoor server URL. |
| **clientId** | Yes | Application client ID. |
| **appName** | Yes | Application name. |
| **organizationName** | Yes | Organization name. |
| **redirectPath** | No | Callback path; default `/callback`. |

**Vue 3:**

```javascript
// main.js
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

**Vue 2:**

```javascript
// main.js
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

## Usage example

```vue
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

## Redirect / Vue version issues

If the `postinstall` hook did not run or you changed the Vue version, fix redirect behavior with:

```shell
npx vue-demi-fix
```

See [vue-demi](https://github.com/vueuse/vue-demi) for switching between Vue 2 and Vue 3.
