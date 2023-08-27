---
title: Spring Security Filter with OIDC integration for Casdoor
description: This article explains how to use Spring Security Filter to connect your application with Casdoor using OIDC.
keywords: [OIDC, Spirng Security, Spring Security Filter, Filter, Casdoor]
authors: [wenxuan70]
---

Casdoor is an open-source IDP that supports OIDC and various other protocols. In this article, we will see how to integrate Casdoor with your application using Spring Security Filter and OIDC.

## Step 1: Deploy Casdoor

First, you need to deploy the Casdoor server. Refer to the [official documentation](/docs/basic/server-installation) for server installation instructions. After successful deployment, ensure that:

- The Casdoor server is running at **<http://localhost:8000>**.
- You can see the Casdoor login page at **<http://localhost:7001>**.
- You can test the login functionality by logging in with the credentials `admin` and `123`.

After verifying these steps, follow the steps below to integrate Casdoor with your application.

## Step 2: Configure Casdoor Application

- Create a new Casdoor application or use an existing one.
- Add your redirect URL. You can find more information about obtaining the redirect URL in the next section.
   ![Casdoor Application Setting](/img/integration/java/spring_security/casdoor_setting.png)
- Obtain your `Certificate` on the certificate editing page.
   ![Casdoor Certification Setting](/img/integration/java/spring_security/casdoor_certification.png)
- Add the provider and other settings as needed.

You can obtain the values for `Application Name`, `Organization Name`, `Redirect URL`, `Client ID`, `Client Secret`, and `Certificate` on the application settings page. We will use them in the next step.

## Step 3: Configure Spring Security

You can customize the settings of the Spring Security filters to process tokens:

:::caution

Make sure you replace the configuration values with your own Casdoor instance, especially `<Client ID>` and the others.

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

For frontend applications, the default value of `<FRONTEND_HOSTNAME>` is `localhost:3000`. In this demo, the redirect URL is `http://localhost:3000/callback`. Make sure to configure this in your `casdoor` application.

:::

## Step 4: Configure Frontend

You need to install `casdoor-js-sdk` and configure the SDK as follows:

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

## Step 5: Set Up a Demo

1. Create a Spring Boot application.

2. Add some configurations to handle JWT.

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

3. Add a simple JWT filter to intercept requests that require token verification.

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

4. Define a `Controller` to handle when the user logs in to Casdoor. After the user logs in, they will be redirected to the server and carry the `code` and `state`. The server then needs to verify the user's identity from Casdoor and obtain the `token` through these two parameters.

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

## Step 6: Try the Demo

You can access the frontend application through your browser. If you are not logged in, you will see a login button. Click on it, and you will be redirected to the Casdoor login page.

If you visit your root page,
![welcome](/img/integration/java/spring_security/spring_security_filter_welcome.png)

Click the `Casdoor Login` button, and the page will redirect to Casdoor's login page.
![casdoor](/img/integration/java/spring_security/spring_security_filter_casdoor.png)

After logging in, you will be redirected to `/`.
![resource](/img/integration/java/spring_security/spring_security_filter_resource.png)
