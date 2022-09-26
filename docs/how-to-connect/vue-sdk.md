---
title: Vue SDK
description: Casdoor Vue SDK
keywords: [vue, sdk]
---

Casdoor Vue SDK is designed for Vue2 and Vue3 which is  very convenient to use. 

The Vue SDK is based on casdoor-js-sdk,you can also use the casdoor-js-sdk directly which will be more customizable. 

This plugin is still in development. If you have any questions and suggestions, please contact us at [issue](https://github.com/casdoor/casdoor-vue-sdk/issues)

We will show you the steps below.

> if you still don’t know how to use it after reading README.md, you can go to the example: [casdoor-python-vue-sdk-example](https://github.com/casdoor/casdoor-python-vue-sdk-example) for more details.

> The example' front-end is built with casdoor-vue-sdk, and the back-end is built with casdoor-python-sdk, you can see the source code in the example.

## Installation

~~~shell script
# NPM
npm i casdoor-vue-sdk

# Yarn
yarn add casdoor-vue-sdk
~~~

## Init SDK

Initialization requires 5 parameters, which are all string type:

| Name (in order)  | Must | Description                                         |
| ---------------- | ---- | --------------------------------------------------- |
| serverUrl  | Yes  | your Casdoor server URL               |
| clientId         | Yes  | the Client ID of your Casdoor application                        |
| appName           | Yes  | the name of your Casdoor application |
| organizationName     | Yes  | the name of the Casdoor organization connected with your Casdoor application                    |
| redirectPath     | No  | the path of the redirect URL for your Casdoor application, will be `/callback` if not provided              |


install:

For Vue3:
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

For Vue2:

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
Vue.use(Casdoor,config)
new Vue({
  render: h => h(App),
}).$mount('#app')
```

## example

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

If the `postinstall` hook doesn't get triggered or you have updated the Vue version, try to run the following command to resolve the redirecting.
```shell
npx vue-demi-fix
```

More info about Vue version switch at: [vue-demi docs](https://github.com/vueuse/vue-demi) 
