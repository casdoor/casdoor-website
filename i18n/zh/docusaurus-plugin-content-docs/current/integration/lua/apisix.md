---
title: APISIX
description: 在 APISIX 中使用 Casdoor
keywords:
  - APISIX
authors:
  - Steve0x2a
---

目前有两种方法可以使用 Casdoor 通过 APISIX 插件连接到 APISIX ，并保护 APISIX 背后的 API ：使用 APISIX 的 Casdoor 插件或使用 APISIX 的 OIDC 插件。

## 通过 APISIX 的 Casdoor 插件连接 Casdoor

这个名为 authz-casdoor 的插件可以保护 APISIX 背后的 api ，强制每个请求都经过身份验证，而无需修改 api 代码。

### 如何启用它?

您需要在创建路由时指定此插件，并给出所有必需的字段。 参见下面的示例。

```shell
curl "http://127.0.0.1:9080/apisix/admin/routes/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d '
{
  "methods": ["GET"],
  "uri": "/anything/*",
  "plugins": {
    "authz-casdoor": {
        "endpoint_addr":"http://localhost:8000",
        "callback_url":"http://localhost:9080/anything/callback",
        "client_id":"7ceb9b7fda4a9061ec1c",
        "client_secret":"3416238e1edf915eac08b8fe345b2b95cdba7e04"
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}'
```

在本例中，我们使用apisix的管理API创建了指向“httpbin.org:80”的路由"/anything/*" ，并启用了“authz casdoor”。 此路由现在受到 Casdoor 的身份验证保护。

### 属性

| 名称            | 类型  | 申请标准 | 默认 | 有效期 | 描述                         |
| ------------- | --- | ---- | -- | --- | -------------------------- |
| endpoint_addr | 字符串 | 必填   |    |     | Casdoor的url。               |
| client_id     | 字符串 | 必填   |    |     | Casdoor 中的 client id。      |
| client_secret | 字符串 | 必填   |    |     | Casdoor 中的 client secret 。 |
| callback_url  | 字符串 | 必填   |    |     | 用于接收状态和代码的回调url。           |

*endpoint_addr 和 callback_url 不应以“/”结尾*

在“authz casdoor”插件的配置中，我们可以看到四个参数。

第一个是“callback_url”。 这是OAuth2中的回调url。 应该强调的是，此回调url**必须属于您为路由指定的“uri”**，例如，在本例中，http://localhost:9080/anything/callback显然属于"/anything/*"。 只有通过这种方式，插件才能拦截并利用对 callback_url 的访问（这样插件才能在 Oauth2 中获得代码和状态）。 Callback_url 的逻辑完全由插件实现，因此无需修改服务器来实现此回调。

第二个参数“endpoint_addr”显然是Casdoor的url。 第三个和第四个参数是“client_id”和“client_secret”，您可以在注册应用程序时从Casdoor获取这些参数。

### 它是如何工作的?

假设一个以前从未访问过此路由的新用户将访问它(http://localhost:9080/anything/d?param1=foo&param2=bar)，考虑到已启用“authz casdoor”，此访问将首先由“authz casdoor”插件处理。 然后检查会话，若此用户尚未通过身份验证后，将拦截访问。 用户想要继续访问原始url后，他将被重定向到Casdoor的登录页面。

成功登录用户名和密码(或他使用的任何方法)， Casdoor 会将此用户重定向到“callback_url”，带有GET 参数“code”和“state”。 因为插件知道"callback_url"，当这次拦截访问"callback_url"时， Oauth2中的“授权代码流”逻辑将被触发， 这意味着此插件将请求访问令牌以确认此用户是否真的登录。 确认后，此插件将会将此用户重定向到原始用户想访问的URL，这是我们先前保存的。 登录状态也将保持在会话。

下次此用户想访问此路由后面的网址 (例如，http://localhost:9080/anything/d)，发现此用户以前已被身份验证。 此插件将不再重定向此用户，以使此用户能够不受干扰地访问他在路由下想要的任何路径。

## 通过 APISIX 的 OIDC 插件连接 Casdoor

Casdoor 可以使用 OIDC 协议链接到 APISIX，这份文档将向您展示如何处理相关问题。

以下是配置中的一些专有名词：

`CASDOOR_HOSTNAME`：私有部署的Casdoor域名或IP。

`APISIX_HOSTNAME`: 部署 APISIX 的域名或 IP。

### 步骤1. 部署Casdoor和APISIX

首先，应该部署 [Casdoor](/docs/basic/server-installation) and [APISIX](https://apisix.apache.org/docs/apisix/how-to-build/)。

在成功部署后，您需要确保：

1. 可以登录并正常使用Casdoor。
2. 将Casdoor的 `origin` 值 (conf/app.conf) 设置为 `CASDOOR_HOSTNAME`。 ![Casdoor 配置](/img/integration/casdoor_origin.png)

### 步骤2. 配置Casdoor应用程序

1. 创建或使用现有的 Casdoor 应用程序。
2. 添加一个重定向网址： `http://APISIX_HOSTNAME/REDIRECTWHATYOWANT`并更改 `REDIRECTWHATYOWANT` 到你需要的重定向网址上。
3. 选择 "JWT-Empty" 作为令牌格式选项
4. 添加您想要的提供商并补充其他设置。

![应用设置](/img/integration/lua/apisix/casdoor_jwtempty.png) 不出意外的话，您会在应用程序设置页面看到： `Client ID` 和 `Client secret` 就像上面的图片一样。 我们将在下一步中使用它们。

打开你喜欢的浏览器，访问：**http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**，你会看到 Casdoor 的 OIDC 配置。

### 步骤3. 配置 APISIX

APISIX 拥有官方 [OIDC](https://apisix.apache.org/docs/apisix/plugins/openid-connect/) 支持，由 [lua-resety-openidc](https://github.com/zmartzone/lua-resty-openidc) 实现。

您可以根据 APISX OIDC 文档定制设置，使用以下路由设置：

```bash
#Use your own X-Api-Key
$ curl  -XPOST APISIX_HOSTNAME/apisix/admin/routes -H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" -d '{
  "uri": "/get",
  "name": "apisix_casdoor_test",
  "plugins": {
    "openid-connect": {
      "client_id": "Client ID",
      "client_secret": "Client secret",
      "discovery": "http://CASDOOR_HOSTNAME/.well-known/openid-configuration",
      "introspection_endpoint_auth_method": "client_secret_basic",
      "logout_path": "/logout",
      "realm": "master",
      "redirect_uri": "http://APISIX_HOSTNAME/REDIRECTWHATYOUWANT",
      "bearer_only": false,
      "set_id_token_header": false,
      "access_token_in_authorization_header": true,
      "set_access_token_header": true,
      "set_userinfo_header": false,
      "realm": "master"
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}'
```

现在，请访问 `http://APISIX_HOSTNAME/get`, 浏览器会将您重定向到Casdoor登录页面， 并且在登录成功后，您会看到我们已经向 httpbin.org 发出了请求。 ![APISIX_Result](/img/integration/lua/apisix/apisix_result.png)