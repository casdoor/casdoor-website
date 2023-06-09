---
title: Vue SDK
description: Casdoor Vue SDK
keywords:
  - vue
  - sdk
authors:
  - Nekotoxin
---

Casdoor Vue SDK 是专为Vue2 和 Vue3 设计的，使用非常方便。

Vue SDK 基于 casdoor-js-sdk，您也可以直接使用 casdoor-js-sdk ，这将更易定制使用。

这个插件还在开发中！ 如果您有任何问题和建议，请联系我们 [issue](https://github.com/casdoor/casdoor-vue-sdk/issues)

我们将向您展示以下步骤。

> 如果在阅读README后您仍然不知道如何使用它, 您可以访问这个链接: [casdoor-python-vue-sdk-example](https://github.com/casdoor/casdoor-python-vue-sdk-example)来获取更多信息。

> 示例的前端是用casdoor-vue-sdk构建的，后端是用casdoor-Python-sdk构建的，您可以看到源代码的例子。

## 安装

~~~shell script
# NPM
npm i casdoor-vue-sdk

# Yarn
yarn add casdoor-vue-sdk
~~~

## Init SDK

初始化需要 5 个参数，它们都是字符串类型：

| 名称(按顺序排列) | 必选项 | 描述信息                                    |
| --------- | --- | --------------------------------------- |
| 服务器Url    | 是   | 您的Casdoor服务器URL                         |
| 客户端 Id：   | 是   | 您Casdoor应用程序的客户端 ID                     |
| 应用程序名称    | 是   | 您的Casdoor应用程序的名称                        |
| 组织名称      | 是   | 与您的Casdoor应用程序相关联的Casdoor组织名称           |
| 重定向路径     | 否   | 您的 Casdoor 应用程序的重定向URL 路径将是 `/callback` |


install:

对于Vue3：
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

对于Vue2：

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

## 示例：

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
自动修复

如果 没有触发`postinstall` hook，或者您更新了 Vue 版本， 尝试运行以下命令解决重定向问题。
```shell
npx vue-demi-fix
```

关于Vue 版本的更多信息：请参见 [vue-demi 文档](https://github.com/vueuse/vue-demi) 
