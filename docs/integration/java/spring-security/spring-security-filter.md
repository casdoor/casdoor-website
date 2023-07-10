---
title: Spring Security Filter
description: Based on Spring Security Filter, how to use OIDC to connect your application.
keywords: [OIDC, Spirng Security, Spring Security Filter, Filter]
authors: [wenxuan70]
---

Casdoor can use OIDC protocol as IDP to connect various applications. Here, we will use the filter in spring security to integrate casdoor and show you how to connect to the application using oidc.

## Step1. Deploy Casdoor

Firstly, the Casdoor should be deployed.

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation).

After a successful deployment, you need to ensure:

- The Casdoor server is successfully running on **<http://localhost:8000>**.
- Open your favorite browser and visit **<http://localhost:7001>**, you will see the login page of Casdoor.
- Input `admin` and `123` to test login functionality is working fine.

Then you can quickly implement a casdoor based login page in your own app with the following steps.

## Step2. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Add Your redirect url (You can see more detials about how to get redirect url in the next section).
   ![Casdoor Application Setting](/img/integration/java/spring_security/casdoor_setting.png)
3. On the certificate editing page, you can see your `Certificate`.
   ![Casdoor Certification Setting](/img/integration/java/spring_security/casdoor_certification.png)
4. Add provider you want and supplement other settings.

Not surprisingly, you can get these values on the application settings page: `Application Name`, `Organization Name`, `Redirect URL`, `Client ID`, `Client Secret`, `Certification`. As shown above, we will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## Step3. Configure Spring Security

You can customize the settings of spring security filters to process tokens:

:::caution

You should replace the configuration with your own Casdoor instance especially the `<Client ID>` and others.

:::

```yml
server:
  port: 8080
casdoor:
  endpoint: http://CASDOOR_HOSTNAME:8000
  client-id: <Client ID>
  client-secret: <Client Secret>
  certificate: <Certificate>
  organization-name: <Organization Name>
  application-name: <Application Name>
  redirect-url: http://FRONTEND_HOSTNAME/callback
```

:::caution

For frontend applications, the default value of `<FRONTEND_HOSTNAME>` is `localhost:3000`.

For example, in the following demo, the redirect URL should be `http://localhost:3000/callback`.

You should also configure this in `casdoor` application.

:::

## Step4. Configure Frontend

You need to install `casdoor-js-sdk` and configure `SDK`.

1. Install `casdoor-js-sdk`.

    ```shell
    npm i casdoor-js-sdk 
    # or
    yarn add casdoor-js-sdk
    ```

2. Set up `SDK`.

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

## Step5. Get Started with A Demo

1. We can create a Spring Boot application.

2. We can add some configurations to handle JWT.

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

    }
    ```

3. We can add a simple JWT filter to intercept requests that need to verify tokens.

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
    ```

    When the user accesses the interface requiring authentication, `JwtTokenFilter` will obtain the token from the request header `Authorization` and verify it.

4. Next, we need to define a `Controller` to handle that when the user login to the `casdoor`, it will be redirected to the server and carry the `code` and `state`. The server needs to verify the user's identity from the `casdoor` and obtain the `token` through these two parameters.

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

## Step6. Try the demo!

First, you can try to access the frontend application through the browser. If you have not logged in, it will display a login button. Click the login button, and you will be redirected to the `casdoor` login page.

If you visit your root page,
![welcome](/img/integration/java/spring_security/spring_security_filter_welcome.png)

Click the `Casdoor Login` button and the page will redirect to casdoor's login page.
![casdoor](/img/integration/java/spring_security/spring_security_filter_casdoor.png)

After you log in, the page will redirect to `/`.
![resource](/img/integration/java/spring_security/spring_security_filter_resource.png)
