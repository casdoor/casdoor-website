---
title: LDAP 服务器
description: 在Casdoor中连接LDAP服务器
keywords:
  - ldap服务器
authors:
  - forestmgy
---

许多系统，例如 `Nexus` 支持 `ldap` 身份验证。 在Casdoor中，同样实现了一个简单的LDAP服务器，支持bind与search操作。

下面来介绍如何连接Casdoor中的LDAP服务器并实现简单的登录认证。

### LDAP 服务器端口号

默认情况下，LDAP服务器监听端口 `389`， 您可以通过更改 [conf/app](https://github.com/casdoor/casdoor/blob/28b381e01eebac66e39e20179ed95282695ecd75/conf/app.conf#L22)中的`ldapServerPort` 来更改默认端口号。

### 工作原理

类似于Casdoor的ldap客户端，ldap服务器中的用户都是 `poxisAccount` 的子类。

当服务器收到符合LDAP协议传输的一组数据时， 它将解析 `cn` and `ou`, 其中 `cn` 表示用户名, `ou` 表示组织名称。 `dc` 是什么并不重要。

如果是`bind`操作，服务器将使用 Casdoor 验证用户名和密码并给予用户权限。

如果它是一个search操作， 服务器将根据bind赋予客户端的权限，检查search是否合法并返回相应响应

:::info

我们只支持 **`Simple Authentication`。**

:::

### Bind

在Catdoor ldapserver中，我们识别类似于这样的 `DN` ： `cn=admin,ou=buildt-in,dc=example,dc=com`

所以请将管理员用户的 `DN` 设置为上面的形式。 然后您可以使用此`DN` 绑定到 ldap服务器，使用Casdoor用户的密码登录以进行验证。 如果服务器验证通过，用户将被授予Casdoor中的权限。

### Search

bind操作成功完成后，您可以执行search操作。 search与bind在细节上有一些区别。

- 如果您想要搜索特定的用户，比如 `built-in` 组织下的 `Alice` ，您应该使用这样的`DN` :`ou=build-in,dc=example c=com`, 并在过滤器字段中添加 `cn=Alice`
- 如果您想要在某个组织下搜索所有用户，如 `built-in`下的所有用户， 您应该使用这样的`DN` :`ou=built-in,dc=example,dc=com`, 并在过滤器字段中添加 `cn=*`
- 如果您想要搜索所有组织的所有用户(前提是用户有足够的权限)， 您应该使用这样的`DN` :`ou=*,dc=example ,dc=com`, 并在过滤器字段中添加 `cn=*`。
