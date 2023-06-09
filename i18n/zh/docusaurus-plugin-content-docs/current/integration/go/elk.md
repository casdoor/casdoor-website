---
title: ELK
description: Casdoor/elk-auth-casdoor概览
keywords:
  - ELK
authors:
  - ComradeProgrammer
---

## Casdoor/elk-auth-casdoor概览
ELK (Elasticsearch、Logstash 和 Kibana) 的缺点是，这些产品原来没有认证机制。 只要拥有kibana或ESurl，每个人都可以访问kibana dashboard。 后来ELK 集成了一个嵌入式认证系统“Xpack”，其所有高级函数  **都不是免费的** (例如 Oauth, OIDC, LDAP, SAML), 而且只有纯粹的身份验证(设置一套账户和密码) 是免费的，这相当不方便。 我们不能为每个人提供一个独特的帐户。


因此，我们已经开发了一个基于 Cassdoor **免费的 elk 认证解决方案。 开源和维护中，支持大量高级功能**。 Casdoor是一个基于Oauth2的中心化身份验证/单点登录平台。 /OIDC, casdoor /elk-auth-casdoor 实际上是一种逆向代理， 它旨在拦截所有 http 数据流到elk/kibana ，并指导尚未登录的用户登录。 只要用户已登录，此逆向代理将完全透明。

如果此用户未成功通过验证，请求将会临时缓存，用户将被重定向到Casto登录页面。 在用户成功登录到casdoor后，缓存请求将会还原并发送到 kibana。 因此，如果一个POST请求（或GET以外的其他请求）被拦截，也是可以的，用户不需要重新填写表格和重新发送请求。 逆向代理将为你记住它。

Castor/elk-auth-casdoor 版本库的位置 <https://github.com/casdoor/elk-auth-casdoor>

## 如何使用？

0. 已安装golang环境

1. 转到 [casdoor/elk-auth-casdoor](https://github.com/casdoor/elk-auth-casdoor) 并获取代码

2. 将您的代理注册为Casdoor应用程序。

3. 修改配置

配置文件位于"conf/app.conf"中。 这是一个示例，您应该根据您的实际需求自行更改。

```ini
appname = .
# port on which the reverse proxy shall be run
httpport = 8080
runmode = dev
#EDIT IT IF NECESSARY. The url of this reverse proxy
pluginEndpoint="http://localhost:8080"
#EDIT IT IF NECESSARY. The url of the kibana 
targetEndpoint="http://localhost:5601"
#EDIT IT. The url of casdoor 
casdoorEndpoint="http://localhost:8000"
#EDIT IT. The clientID of your reverse proxy in casdoor  
clientID=ceb6eb261ab20174548d
#EDIT IT. The clientSecret of your reverse proxy in casdoor 
clientSecret=af928f0ef1abc1b1195ca58e0e609e9001e134f4
#EDIT IT. The application name of your reverse proxy in casdoor 
appName=ELKProxy
#EDIT IT. The organization to which your reverse proxy belongs in casdoor
organization=built-in
```

4. 访问 <http://localhost:8080> (在上文示例中) 并按照重定向指南登录，您将会看到kibana受casdoor的保护和认证。

5. 如果一切运行良好，请不要忘记通过配置您的防火墙，阻止原来的 kibana 端口访问外部， 这样其他人只能通过这种逆向代理访问kibana。