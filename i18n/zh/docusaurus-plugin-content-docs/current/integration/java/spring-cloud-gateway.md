---
title: Spring Cloud Gateway
description: 在Spring Cloud Gateway中使用 Casdoor
keywords:
  - Spring Cloud Gateway
authors:
  - conghuhu
---

[casdoor-springcloud-gateway-example](https://github.com/casdoor/casdoor-springcloud-gateway-example) 是如何在 Spring Cloud Gateway 中使用 [casdoor-spring-boot-starter](https://github.com/casdoor/casdoor-spring-boot-starter) 作为一个 OAuth2 插件。 我们将向您展示以下步骤。

## 第1步 部署Casdoor

首先，应当部署Casdoor。

您可以参考 [Server Installation](/docs/basic/server-installation) 的 Casdoor 官方文档。 请在 **生产模式** 中部署您的 Casdoor 实例。

在成功部署后，您需要确认：

- 打开您最喜欢的浏览器并访问 **http://localhost:8000**，您将看到Casdoor的登录页面。
- 输入 `admin` 和 `123` 测试登录功能正常工作。

然后您可以通过以下步骤在自己的应用程序中快速实现基于 Casdoor 的登录页面。

## 第2步: 初始化一个Spring Cloud Gateway项目

您可以直接使用此示例的代码或结合您自己的业务代码。

我们需要一个网关服务和至少一个业务服务。

在这个示例中， `casdoor-gateway` 作为网关服务， `casdoor-api` 作为业务服务。

## 第3步：引入依赖

将 `casdoor-spring-boot-starter` 添加到Spring Cloud Gateway项目。

对于Apache Maven：

```xml title="/casdoor-gateway/pom.xml"
<!-- https://mvnrepository.com/artifact/org.casbin/casdoor-spring-boot-starter -->
<dependency>
    <groupId>org.casbin</groupId>
    <artifactId>casdoor-spring-boot-starter</artifactId>
    <version>1.x.y</version>
</dependency>
```

对于Gradle：

```groovy
// https://mvnrepository.com/artifact/org.casbin/casdoor-spring-boot-starter
implementation group: 'org.casbin', name: 'casdoor-spring-boot-starter', version: '1.x.y'
```

## 第4步：配置属性

初始化需要 6 个参数，它们都是字符串类型：

| 名称(按顺序排列)        | 是否必须 | 描述                                        |
| ---------------- | ---- | ----------------------------------------- |
| endpoint         | 是    | Casdoor 服务URL, 例如 `http://localhost:8000` |
| clientId         | 是    | Application.client_id                     |
| clientSecret     | 是    | Application.client_secret                 |
| certificate      | 是    | Application.certificate                   |
| organizationName | 是    | Application.organization                  |
| applicationName  | 否    | Application.name                          |

您可以使用 Java properties 或 YAML 文件来初始化，如下所示。

对于 properties：

```properties
casdoor.endpoint=http://localhost:8000
casdoor.clientId=<client-id>
casdoor.clientSecret=<client-secret>
casdoor.certificate=<certificate>
casdoor.organizationName=built-in
casdoor.applicationName=app-built-in
```

对于yaml：

```yaml
casdoor:
  endpoint: http://localhost:8000
  client-id: <client-id>
  client-secret: <client-secret>
  certificate: <certificate>
  organization-name: built-in
  application-name: app-built-in
```

此外，还需要配置网关路由。 对于yaml：

```yaml
spring:
  application:
    name: casdoor-gateway
  cloud:
    gateway:
      routes:
        - id: api-route
          uri: http://localhost:9091
          predicates:
            - Path=/api/**
```

## 第5步：添加CasdoorAuthFilter

将 GlobalFilter 的一个实现类添加到网关中做身份验证，例如此 示例中的 CasdoorAuthFilter。

如果身份验证失败，则返回到401，前端跳转到统一登录界面。

```java
@Component
public class CasdoorAuthFilter implements GlobalFilter, Ordered {

    private static final Logger LOGGER = LoggerFactory.getLogger(CasdoorAuthFilter.class);

    @Override public int getOrder() {
        return 0;
    }

    @Override public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return exchange.getSession().flatMap(webSession -> {
            CasdoorUser user = webSession.getAttribute("casdoorUser");
            if (user != null) {
                return chain.filter(exchange);
            }
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            response.getHeaders().add("Content-Type", "application/json");
            return response.setComplete();
        });
    }
}
```

## 第6步：使用Casdoor提供的相关Service

现在提供 5 种Service： `CasdoorAuthService`, `CasdoorUserService`, `Casdoore-mailService`, `CasdoorSmsService` 和 `CasdoorResourceService`

您可以按照下面示例在Gateway项目中创建它们。

```java
@Resource
private CasdoorAuthService casdoorAuthService;
```

当您需要访问您的应用程序的身份验证时，您可以发送目标 url 并重定向到 Casdoor 提供的登录页面。

请确保您已提前在应用配置中添加回调 url(例如 http://localhost:9090/login)。

```java
@RequestMapping("login")
public Mono<String> login() {
    return Mono.just("redirect:" + casdoorAuthService.getSigninUrl("http://localhost:9090/callback"));
}
```

在 Casdoor 验证通过后，它将被重定向到您的应用程序，并带有 code 和状态。

您可以获取 code 并调用 `getOAuthToken` 方法，然后解析出 jwt 令牌。

`CasdoorUser` 包含了 Casdoor 提供的用户基本信息，您可以将其作为关键字在您的应用程序中设置会话。

```java
@RequestMapping("callback")
public Mono<String> callback(String code,String state,ServerWebExchange exchange) {
    String token = "";
    CasdoorUser user = null;
    try {
        token = casdoorAuthService.getOAuthToken(code,state);
        user = casdoorAuthService.parseJwtToken(token);
    } catch(CasdoorAuthException e) {
        e.printStackTrace();
    }
    CasdoorUser finalUser = user;
    return exchange.getSession().flatMap(session -> {
        session.getAttributes().put("casdoorUser", finalUser);
        return Mono.just("redirect:/");
    });
}
```

API示例如下：

- CasdoorAuthService
  - `String token = casdoorAuthService.getOAuthToken(code, "app-built-in");`
  - `CasdoorUser casdoorUser = casdoorAuthService.parseJwtToken(token);`
- CasdoorUserService
  - `CasdoorUser casdoorUser = casdoorUserService.getUser("admin");`
  - `CasdoorUser casdoorUser = casdoorUserService.getUserByEmail("admin@example.com");`
  - `CasdoorUser[] casdoorUsers = casdoorUserService.getUsers();`
  - `CasdoorUser[] casdoorUsers = casdoorUserService.getSortedUsers("created_time", 5);`
  - `int count = casdoorUserService.getUserCount("0");`
  - `CasdoorResponse response = casdoorUserService.addUser(user);`
  - `CasdoorResponse response = casdoorUserService.updateUser(user);`
  - `CasdoorResponse response = casdoorUserService.deleteUser(user);`
- CasdoorEmailService
  - `CasdoorResponse response = casdoorEmailService.sendEmail(title, content, sender, receiver);`
- CasdoorSmsService
  - `CasdoorResponse response = casdoorSmsService.sendSms(randomCode(), receiver);`
- CasdoorResourceService
  - `CasdoorResponse response = casdoorResourceService.uploadResource(user, tag, parent, fullFilePath, file);`
  - `CasdoorResponse response = casdoorResourceService.deleteResource(file.getName());`

## 第7步：重新启动项目

启动后，打开您最喜欢的浏览器并访问 **http://localhost:9090**，然后点击任何可以向 `casdoor-api请求资源的按钮`

![index](/img/integration/java/spring_cloud_gateway/index.png)

将触发网关认证逻辑。 由于您没有登录，您将跳转到登录界面。 点击登录按钮。

![toLogin](/img/integration/java/spring_cloud_gateway/toLogin.png)

随后您可以看到Cassdoor统一的登录平台。

![login](/img/integration/java/spring_cloud_gateway/login.png)

登录成功后，它将跳转到主界面。 然后您可以点击任意资源相关按钮。

![index-ok](/img/integration/java/spring_cloud_gateway/index-ok.png)

## 更多内容

您可以探索以下项目/文件来了解更多关于Java 与Casdoor一体化的信息。

- [casdoor-java-sdk](https://github.com/casdoor/casdoor-java-sdk)
- [casdoor-spring-boot-starter](https://github.com/casdoor/casdoor-spring-boot-starter)
- [casdoor-spring-boot-example](https://github.com/casdoor/casdoor-spring-boot-example)
- [casdoor-spring-security-example](/docs/integration/java/spring-security/spring-security-oauth)
- [casdoor-spring-security-react-example](/docs/integration/java/spring-security/spring-security-filter)
- [casdoor-spring-boot-shiro-example](https://github.com/casdoor/casdoor-spring-boot-shiro-example)
- [casdoor-springcloud-gateway-example](https://github.com/casdoor/casdoor-springcloud-gateway-example)
