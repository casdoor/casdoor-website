---
title: CAS
description: 使用 Casdoor 作为 CAS 服务器
keywords:
  - CAS
  - 服务器
authors:
  - ComradeProgrammer
---

## 使用 Casdoor 作为 CAS 服务器

Cassdoor 现在可以用作CAS 服务器。 目前Casdoor支持CAS3.0 的功能。

### 简介

Casdoor中CAS终端的前缀是 `<Endpoint of casdoor>/cas/<organization name>/<application name>`, 这意味着

假设Cassdoor 的端点是 `https://door.cassdoor.com`, 其中包含一个名为 `cas-java-app` 属于一个名为 `casbin`的组织, 如果我们试图让用户通过CAS登录， 那么
- `/login` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/login`
- `/logout` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/logout`
- `/serviceValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/serviceValidate`
- `/proxyValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/proxyValidate`
- `/proxy` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/proxy`
- `/validate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/validate`
- `/p3/serviceValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/p3/serviceValidate`
- `/p3/proxyValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/p3/proxyValidate`
- `/samlValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/samlValidate`

See <https://apereo.github.io/cas/6.6.x/protocol/CAS-Protocol-Specification.html> for more information about CAS and its different versions, as well as parameters for these endpoints.

### 一个示例

这里是一个官方示例 [https://github.com/aperece/cas-sample-java-webapp](https://github.com/apereo/cas-sample-java-webapp), 其中包含一个使用正式的CAS java客户端的网络应用实例 [https://github.com/aperece/java-cas-client](https://github.com/apereo/java-cas-client) 我们将通过这个例子来说明如何通过CAS 连接到Casdoor。


:::note

注意：Cassdoor 目前仅支持所有三个版本的 CAS 1.0 & 2.0 & CAS 3.0

:::

Cas 配置位于 `src/main/webapp/WEB-INF/web.yml`。

默认情况下，此应用使用 CAS 3.0，由以下配置指定。
```xml
<filter-name>CAS Validation Filter</filter-name>
<filter-class>org.jasig.cas.client.validation.Cas30ProxyReceivingTicketValidationFilter</filter-class>
```


假定您想要通过 CAS 2.0保护此网络应用，您应该将CAS 验证过滤器更改为以下内容。
```xml
<filter-name>CAS Validation Filter</filter-name>
<filter-class>org.jasig.cas.client.validation.Cas20ProxyReceivingTicketValidationFilter</filter-class>
```


如果您想要使用 CAS 1.0，请使用
```xml
<filter-name>CAS Validation Filter</filter-name>
<filter-class>org.jasig.cas.client.validation.Cas10TicketValidationFilter</filter-class>
```

对于参数“casServerUrlPrefix”，将其更改为
```xml

<param-name>casServerUrlPrefix</param-name>
<param-value>http://door.casdoor.com/cas/casbin/cas-java-app</param-value>

```

对于参数“casServerLoginUrl”，将其更改为
```xml
<param-name>casServerLoginUrl</param-name>
<param-value>http://door.casdoor.com/cas/casbin/cas-java-app/login</param-value>
```

如果您需要自定义更多的配置，请参阅 [https://github.com/apetrue/java-cas-client](https://github.com/apereo/java-cas-client) 获取详细信息。

:::note

实际上我们已经有这个演示应用程序在 <https://cas-java-app.casdoor.com> 上运行。 您可以通过CAS访问此处体验Casdoor。

:::
