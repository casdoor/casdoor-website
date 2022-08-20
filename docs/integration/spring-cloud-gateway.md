---
title: Spring Cloud Gateway
description: Using Casdoor in Spring Cloud Gateway
keywords: [Sping Cloud Gateway]
---

[casdoor-springcloud-gateway-example](https://github.com/casdoor/casdoor-springcloud-gateway-example) is an example on how to use [casdoor-spring-boot-starter](https://github.com/casdoor/casdoor-spring-boot-starter) as a OAuth2 plugin in Spring Cloud Gateway. We will show you the steps below.

## Step1. Deploy Casdoor

Firstly, the Casdoor should be deployed.

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation). Please deploy your Casdoor instance in **production mode**.

After a successful deployment, you need to ensure:

- Open your favorite browser and visit **http://localhost:8000**, you will see the login page of Casdoor.
- Input `admin` and `123` to test login functionality is working fine.

Then you can quickly implement a casdoor based login page in your own app with the following steps.

## Step2: Init a Spring Cloud Gateway

You can use the code of this example directly or combine your own business code.

We need a gateway service and at least one business service.

In this example, `casdoor-gateway` as the gateway service and `casdoor-api` as the business service.

## Step3: Include the dependency

Add `casdoor-spring-boot-starter` to the Spring Cloud Gateway project.

For Apache Maven:

```xml title="/casdoor-gateway/pom.xml"
<!-- https://mvnrepository.com/artifact/org.casbin/casdoor-spring-boot-starter -->
<dependency>
    <groupId>org.casbin</groupId>
    <artifactId>casdoor-spring-boot-starter</artifactId>
    <version>1.x.y</version>
</dependency>
```

For Gradle:

```groovy
// https://mvnrepository.com/artifact/org.casbin/casdoor-spring-boot-starter
implementation group: 'org.casbin', name: 'casdoor-spring-boot-starter', version: '1.x.y'
```

## Step4: Configure your properties

Initialization requires 6 parameters, which are all string type.

| Name (in order)  | Must | Description                                         |
| ---------------- | ---- | --------------------------------------------------- |
| endpoint         | Yes  | Casdoor Server Url, such as `http://localhost:8000` |
| clientId         | Yes  | Application.client_id                               |
| clientSecret     | Yes  | Application.client_secret                           |
| jwtPublicKey     | Yes  | The public key for the Casdoor application's cert   |
| organizationName | Yes  | Application.organization                            |
| applicationName  | No   | Application.name                                    |

You can use Java properties or YAML files to init as below.

For properties:

```properties
casdoor.endpoint=http://localhost:8000
casdoor.clientId=<client-id>
casdoor.clientSecret=<client-secret>
casdoor.jwtPublicKey=<jwt-public-key>
casdoor.organizationName=built-in
casdoor.applicationName=app-built-in
```

For yaml:

```yaml
casdoor:
  endpoint: http://localhost:8000
  client-id: <client-id>
  client-secret: <client-secret>
  jwt-public-key: <jwt-public-key>
  organization-name: built-in
  application-name: app-built-in
```

In addition, you need to configure Gateway Routing. For yaml:

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

## Step5: Add the CasdoorAuthFilter

Add an implementation class of GlobalFilter to the gateway for identity verification, such as CasdoorAuthFilter in this
example.

If the authentication fails, it returns to the front end 401 to jump to the login interface.

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

## Step6: Get the Service and use

Now provide 5 services: `CasdoorAuthService`, `CasdoorUserService`, `CasdoorEmailService`, `CasdoorSmsService`
and `CasdoorResourceService`.

You can create them as below in Gateway project.

```java
@Resource
private CasdoorAuthService casdoorAuthService;
```

When you need the authentication who access your app, you can send the target url and redirect to the login page
provided by Casdoor.

Please be sure that you have added the callback url (e.g. http://localhost:9090/callback) in application configuration
in advance.

```java
@RequestMapping("login")
public Mono<String> login() {
    return Mono.just("redirect:" + casdoorAuthService.getSigninUrl("http://localhost:9090/callback"));
}
```

After Casdoor verification passed, it will be redirected to your application with code and state.

You can get the code and call `getOAuthToken` method, then parse out jwt token.

`CasdoorUser` contains the basic information about the user provided by Casdoor, you can use it as a keyword to set the
session in your application.

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

Examples of APIs are shown below.

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

## Step7: Restart project

After start, open your favorite browser and visit **http://localhost:9090**, then click any button which can request resources from `casdoor-api`.

![index](/img/integration/spring_cloud_gateway/index.png)

The gateway authentication logic will be triggered. Since you are not logged in, you will jump to the login interface. Click Login Button.

![toLogin](/img/integration/spring_cloud_gateway/toLogin.png)

You can see the unified login platform of Casdoor.

![login](/img/integration/spring_cloud_gateway/login.png)

After successful login, it will jump to the main interface. Then you can click any button.

![index-ok](/img/integration/spring_cloud_gateway/index-ok.png)

## What's more

You can explore the following projects/docs to learn more about the integration of Java with Casdoor.

- [casdoor-java-sdk](https://github.com/casdoor/casdoor-java-sdk)
- [casdoor-spring-boot-starter](https://github.com/casdoor/casdoor-spring-boot-starter)
- [casdoor-spring-boot-example](https://github.com/casdoor/casdoor-spring-boot-example)
- [casdoor-spring-boot-security-example](/docs/integration/spring-security)
- [casdoor-spring-boot-shiro-example](https://github.com/casdoor/casdoor-spring-boot-shiro-example)
- [casdoor-springcloud-gateway-example](https://github.com/casdoor/casdoor-springcloud-gateway-example)
