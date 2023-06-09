---
title: Spring Security Filter
description: 基于Spring Security Filter，如何使用OIDC连接您的应用程序。
keywords:
  - OIDC
  - Spring Security
  - Spring Security Filter
  - Filter
authors:
  - wenxuan70
---

Casdoor 可以使用 OIDC 协议作为IDP 连接各种应用程序。 下面我们将使用spring security中的过滤器来集成casdoor，并向您展示如何使用oidc连接到应用程序。

## 步骤1. 部署Casdoor

首先，部署Casdoor。

您可以参考Casdoor 官方文档 [Server Installation](/docs/basic/server-installation) 。

成功部署后，您需要确保：

- Casdoor服务已成功运行，能通过**http://localhost:8000** 访问。
- 打开您最喜欢的浏览器并访问 **http://localhost:7001**，您将看到Casdoor的登录页面。
- 输入 `admin` 和 `123` 测试登录功能正常工作。

然后您可以通过以下步骤在自己的应用程序中快速实现基于 Casdoor 的登录页面。

## 第2步： 配置Casdoor应用程序

1. 创建或使用现有的 Casdoor 应用程序。
2. 添加您的重定向url (您可以在下一节中看到更多关于如何获取重定向url的细节) ![Casdoor 应用程序设置](/img/integration/java/spring_security/casdoor_setting.png)
3. 在证书编辑页面上，您可以看到您的 `证书`。 ![Casdoor 认证设置](/img/integration/java/spring_security/casdoor_certification.png)
4. 添加您想要的提供商并补充其他设置。

不出意外的话，您会在应用程序设置页面看到： `应用程序名称`, `组织名称`, `重定向URL`, `客户端 ID`, `客户密钥`, `认证`. 如上所述，我们将在下一步中使用它们。

打开你喜欢的浏览器，访问：**http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**，你会看到 Casdoor 的 OIDC 配置。

## 步骤3. 配置Spring Security

您可以自定义spring security filter 的设置来处理标记：

:::caution

您应该用您自己的 Casdoor 实例替换配置，特别是 `<Client ID>` 等。

:::

```yml
服务器:
  port: 8080
casdoor:
  endpoint: http:/CASDOOR_HOSTNAME: 8000
  client-id: <Client ID>
  client-secret: <Client Secret>
  certificat: <Certificate>
  organization-name: <Organization Name>
  application-name: <Application Name>
  redirect-url: http://FRONTEND_HOSTNAME/callback
```

:::caution

对于前端应用程序来说， `<FRONTEND_HOSTNAME>` 的默认值是 `localhost:3000`。

例如，对于下面的演示来说，重定向URL应该是 `http://localhost:3000/callback`。

您也应该在 `casdoor` 应用程序中配置它。

:::

## 步骤4. 配置前端

您需要安装 `casdoor-js-sdk` 并配置 `SDK`。

1. 安装 `casdoor-js-sdk`。

    ```shell
    npm i casdoor-js-sdk 
    # or
    yarn add casdoor-js-sdk
    ```

2. 设置 `SDK`。

    ```javascript
    import Sdk from "casdoor-js-sdk";

    // Serverurl is the URL where spring security is deployed
    export const ServerUrl = "http://BACKEND_HOSTNAME:8080";

    const sdkConfig = {
      serverUrl: "http://CASDOOR_HOSTNAME:8000",
      clientId: "<your client id>",
      appName: "<your application name>",
      organizationName: "<your organization name>",
      redirectPath: "/callback",
    };

    export const CasdoorSDK = new Sdk(sdkConfig);
    ```

## 步骤5. 从一个 Demo 开始

1. 我们可以创建 Spring Boot 应用程序。

2. 我们可以添加一些配置来处理 JWT。

```java
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenFilter jwtTokenFilter;

    public SecurityConfig(JwtTokenFilter jwtTokenFilter) {
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // enable CORS and disable CSRF
        http = http.cors(corsConfig -> corsConfig
                .configurationSource(configurationSource())
        ).csrf().disable();

        // set session management to stateless
        http = http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and();

        // set permissions on endpoints
        http.authorizeHttpRequests(authorize -> authorize
                .mvcMatchers("/api/redirect-url", "/api/signin").permitAll()
                .mvcMatchers("/api/**").authenticated()
        );

        // set unauthorized requests exception handler
        http = http
                .exceptionHandling()
                .authenticationEntryPoint(
                        (request, response, ex) -> ResponseUtils.fail(response, "unauthorized")
                )
                .and();

        // add JWT token filter
        http.addFilterBefore(
                jwtTokenFilter,
                UsernamePasswordAuthenticationFilter.class
        );
        return http.build();
    }

    // ...
 
XPath: /pre[2]/code
File: spring-security-filter.md

}
```

3. 我们可以添加简单的 JWT 过滤器来拦截需要验证标记的请求。

```java
@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final CasdoorAuthService casdoorAuthService;

    public JwtTokenFilter(CasdoorAuthService casdoorAuthService) {
        this.casdoorAuthService = casdoorAuthService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {
        // get authorization header and validate
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (!StringUtils.hasText(header) || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        // get jwt token and validate
        final String token = header.split(" ")[1].trim();

        // get user identity and set it on the spring security context
        UserDetails userDetails = null;
        try {
            CasdoorUser casdoorUser = casdoorAuthService.parseJwtToken(token);
            userDetails = new CustomUserDetails(casdoorUser);
        } catch (CasdoorAuthException exception) {
            logger.error("casdoor auth exception", exception);
            chain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                AuthorityUtils.createAuthorityList("ROLE_casdoor")
        );

        authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }

}
 
Text
XPath: /pre[3]/code
```

当用户访问需要认证的接口时， `JwtTokenFilter` 将从请求头 `授权` 并验证它。

4. 接下来，我们需要定义一个`控制器`来处理以下情况：当用户登录到`casdoor`时，它将被重定向到服务器并携带`code`和`state`。 服务器会需要验证用户的身份 ，并通过这两个参数获得 `token`。

```java
@RestController
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final CasdoorAuthService casdoorAuthService;

    // ...

    @PostMapping("/api/signin")
    public Result signin(@RequestParam("code") String code, @RequestParam("state") String state) {
        try {
            String token = casdoorAuthService.getOAuthToken(code, state);
            return Result.success(token);
        } catch (CasdoorAuthException exception) {
            logger.error("casdoor auth exception", exception);
            return Result.failure(exception.getMessage());
        }
    }

    // ...

}
```

## 步骤6. 试用一下demo！

首先，您可以尝试通过浏览器访问前端应用程序。 如果您尚未登录，它将显示登录按钮。 单击登录按钮，您将被重定向到 `级门` 登录页面。

如果您访问了您的根页面， ![欢迎使用](/img/integration/java/spring_security/spring_security_filter_welcome.png)

点击 `登录` 按钮，页面将重定向到下级登录页面。 ![casdoor](/img/integration/java/spring_security/spring_security_filter_casdoor.png)

登录后，页面将重定向到 `/`。 ![资源](/img/integration/java/spring_security/spring_security_filter_resource.png)
