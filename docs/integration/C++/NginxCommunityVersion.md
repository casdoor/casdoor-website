---
title: NginxCommunityVersion
description: Using Casdoor with Nginx (Not Nginx-Plus) and Oauth2-Proxy
keywords: [nginx, OAuth2-Proxy, nginx-community-version]
authors: [gzyzhy]
---

## Prerequisites

This guide assumes that you have the following conditions:

- Running Casdoor service. If you haven't installed Casdoor service yet, please refer to [Server Installation](https://casdoor.org/docs/basic/server-installation) or [Try with Docker](https://casdoor.org/docs/basic/try-with-docker).
- Nginx open-source edition with `ngx_http_auth_request_module` module enabled at compile time. If you don't know how to enable the `ngx_http_auth_request_module` module, please refer to the [Nginx Module Document](https://nginx.org/en/docs/http/ngx_http_auth_request_module.html).
- The website on which you want to enable authentication is successfully deployed on Nginx, with a **configured domain name** (instead of using an IP address), and can be accessed normally.
- OAuth2-Proxy tool (currently, the following two popular projects with high stars are available on GitHub, and you need to choose one of them):

1. oauth2-proxy/oauth2-proxy (used in this article) [GitHub](https://github.com/oauth2-proxy/oauth2-proxy) OR [Official-Website](https://oauth2-proxy.github.io/oauth2-proxy)
2. vouch/vouch-proxy [GitHub](https://github.com/vouch/vouch-proxy)

## I. Configure CasDoor

**Note**: The operations in this article are based on the Casdoor GUI at the time of publication, but the Casdoor GUI may change depending on the version. Please follow the references provided in this article to configure your deployed Casdoor version.

**Note**: The keys, passwords, usernames, and other confidential information mentioned in this article are all examples. For security reasons, you must replace them with your own relevant content when deploying.

1. Log in to your Casdoor admin account.
2. In the top bar, select "Identity Authentication" > "Applications", and then click "Add" on the "Applications" page.

    ![addApp](/img/integration/C++/NGINX_Community/addApp.png)

3. Complete the application configuration based on your project information. In this article, we use "Nginx-Community" as the example application name.

    ![ConfigureApp](/img/integration/C++/NGINX_Community/ConfigureApp.png)

4. Take note of the values of the "Client ID" and "Client Secret" fields. They will be used when configuring OAuth2-Proxy later. Then configure the "Redirect URL" as `https://project.yourdomain.com/oauth2/callback/`.

    ![RecordInfo](/img/integration/C++/NGINX_Community/RecordInfo.png)

5. In the top bar, select "Casbin Permission Management" > "Roles", and then click "Add" on the "Roles" page.

    ![AddRole](/img/integration/C++/NGINX_Community/AddRole.png)

6. Complete the role configuration based on your project information. In this article, we use "nginx_role" as the example role name.

    ![ConfigureRole](/img/integration/C++/NGINX_Community/ConfigureRole.png)

7. (Optional) In the top bar, select "User Management" > "Users", and then add new users based on your needs. If the users you need already exist, you can skip this step. In this article, we create an example user named "user".

8. Go back to the "Roles" page mentioned in step 5, edit the `nginx_role` role, and add the users you need to the "Included Users" option. In this article, we add the previously created `builtin/user` here.

## II. Configure Oauth2-Proxy

**Note**: This article uses the Oauth2-Proxy project as an example. If you want to use Vouch instead of Oauth2-Proxy, please refer to their official documentation on [GitHub](https://github.com/vouch/vouch-proxy).

**Note**: This article assumes that your site is configured with a trusted SSL certificate and only allows HTTPS access, or that you have set up automatic redirection from HTTP visitors to HTTPS. This helps maximize the protection of cookies and prevents malicious reading of login tokens. If your site needs to be accessed via the insecure HTTP protocol, please modify the relevant commands accordingly. For more help with deploying via HTTP, please refer to the official documentation of Oauth2-Proxy on [GitHub](https://github.com/oauth2-proxy/oauth2-proxy).

**Tips**: [OAuth2-Proxy](https://github.com/oauth2-proxy/oauth2-proxy) provides various deployment methods (such as source code compilation, Docker installation, etc.). For ease of explanation, this article uses the "pre-built binary" for deployment.

1. Go to the [GitHub Releases](https://github.com/oauth2-proxy/oauth2-proxy/releases) page and download the binary package corresponding to your operating system and CPU architecture.
   As of January 1, 2024, the latest release version of OAuth-Proxy is `V7.5.1`. If you want to download the binary package for this version, you can execute the following command for Linux with AMD64:

   ```bash
   wget -O oauth2-proxy-linux.tar.gz https://github.com/oauth2-proxy/oauth2-proxy/releases/download/v7.5.1/oauth2-proxy-v7.5.1.linux-amd64.tar.gz
   ```

   It is strongly recommended that you check the `SHA256SUM` value provided by the official website on the [GitHub Releases](https://github.com/oauth2-proxy/oauth2-proxy/releases) page after downloading the compressed package and compare it with the `SHA256SUM` value of the package you downloaded, character by character.

2. Extract the downloaded package:

   ```bash
   tar -zxvf oauth2-proxy-*.tar.gz
   ```

3. Enter the extracted directory:

   ```bash
   cd oauth2-proxy-v7.5.1.linux-amd64
   ```

4. Move the obtained binary file to `/usr/local/bin` and configure it with executable permissions. You may need to elevate permissions using `sudo` depending on your situation.

   ```bash
   cp ./oauth2-proxy /usr/local/bin
   cd /usr/local/bin
   chmod +x ./oauth2-proxy
   ```

5. Test the binary installation. If the installation is successful, after executing the following command, you should see output similar to `oauth2-proxy v7.5.1 (built with go1.21.1)`.

   ```bash
   cd ~
   oauth2-proxy --version
   ```

6. Run oauth2-proxy with command-line parameters. Parameters marked with [required] must be configured according to your specific situation, while parameters marked with [optional] can optimize performance but can also be omitted. To ensure that oauth2-proxy can run in the background, you can use process monitoring tools like `Screen` or `Supervisor` or terminal tools.

    ```bash
    oauth2-proxy \ 
    --provider=oidc \ #[required] Do not change
    --client-id=abc123456def \ #[required] "Client ID" obtained in step I.4 above
    --client-secret=abc123456def \ #[required] "Client Secret" obtained in step I.4 above
    --oidc-issuer-url=https://auth.yourdomain.com \ #[required] Your Casdoor URL (domain name or public IP)
    --redirect-url=https://project.yourdomain.com/oauth2/callback \ #[required] https://domain-of-the-project-to-protect/oauth2/callback 
    --scope=email+profile+groups+openid \ #[required] Obtained from Casdoor: user email, user profile, groups, and login authentication
    --cookie-domain=project.yourdomain.com \ #[required] Domain name of the project you want to protect
    --whitelist-domain=project.yourdomain.com \ #[required] Domain name of the project you want to protect
    --cookie-secret=abc123456def \ #[required] Please generate a random string of numbers and letters and fill it in here
    --email-domain=* \ #[required] List of acceptable user email domains (* means accept all domains). If the user's email suffix is not in this list, a 403 error will be returned even if the login is successful.
    --insecure-oidc-allow-unverified-email=true \ #[required] Whether to accept users with unverified email addresses
    --http-address=http://127.0.0.1:65534 \ #[required] Address that oauth2-proxy listens on. The port number here can be set arbitrarily. Please record the value you set, as it will be needed for configuring Nginx later.
    --cookie-expire=24h0m0s \ #[optional] Cookie expiration time. After this period, users will need to log in again.
    --custom-sign-in-logo=https://cdn.yourdomain.com/pic/proj.png \ #[optional] Icon displayed on the login page. It is recommended to use a rectangular image rather than a square one.
    --session-store-type=redis \ #[optional] Use Redis cache. If you don't need Redis, you can delete this item.
    --redis-connection-url=redis://127.0.0.1:6379/0 \ #[optional] Redis URL. If you don't need Redis, you can delete this item.
    --redis-password=123456 #[optional] Redis connection password. If you don't need Redis or Redis has no password, you can delete this item.
    ```

## III. Configure Nginx

**Note**: Please confirm again that your Nginx has enabled the `ngx_http_auth_request_module` module when compiling and installing from source code (the compilation command includes `--with_http_auth_request_module`). If you don't know how to enable the `ngx_http_auth_request_module` module, please refer to the [Nginx Module Document](https://nginx.org/en/docs/http/ngx_http_auth_request_module.html).

**Tips**: Nginx installed using the Baota panel tool does not enable this module by default.

1. Open the configuration file of the website you have already deployed and want to protect, and make the following modifications:

    **Note**: You need to adjust this configuration file according to your specific situation. Due to Nginx versions and other factors, this configuration file may not work smoothly on all Nginx instances. Please adjust the relevant content based on your own Nginx information.

    ```nginx
    server {
        listen 443 ssl http2;

        include /path/to/ssl.conf;

        # Add the following content
        location ^~ /oauth2/ {
            proxy_pass       http://127.0.0.1:65534; # Change this to the "--http-address" configured in step II.6

            proxy_set_header Host                    $host;
            proxy_set_header X-Real-IP               $remote_addr;
            proxy_set_header X-Scheme                $scheme;

            proxy_set_header X-Auth-Request-Redirect $request_uri;
            # or, if you are handling multiple domains:
            # proxy_set_header X-Auth-Request-Redirect $scheme://$host$request_uri;
        }
        location = /oauth2/auth {
            proxy_pass       http://127.0.0.1:65534; # Change this to the "--http-address" configured in step II.6

            proxy_set_header Host             $host;
            proxy_set_header X-Real-IP        $remote_addr;
            proxy_set_header X-Scheme         $scheme;
            proxy_set_header Content-Length   "";
            proxy_pass_request_body           off;
        }
        location ^~ / {
            auth_request /oauth2/auth;
            error_page 401 = /oauth2/sign_in;

            auth_request_set $user   $upstream_http_x_auth_request_user; 
            auth_request_set $email  $upstream_http_x_auth_request_email; 
            proxy_set_header X-User  $user; # Pass the username of the user logged in to your backend service
            proxy_set_header X-Email $email; # Pass the email of the user logged in to your backend service

            auth_request_set $token  $upstream_http_x_auth_request_access_token;
            proxy_set_header X-Access-Token $token; # Pass the user's login token to your backend service

            # The following configurations are related to cookie validation for user login
            auth_request_set $auth_cookie $upstream_http_set_cookie;
            add_header Set-Cookie $auth_cookie;

            auth_request_set $auth_cookie_name_upstream_1 $upstream_cookie_auth_cookie_name_1;

            if ($auth_cookie ~* "(; .*)") {
                set $auth_cookie_name_0 $auth_cookie;
                set $auth_cookie_name_1 "auth_cookie_name_1=$auth_cookie_name_upstream_1$1";
            }   

            if ($auth_cookie_name_upstream_1) {
                add_header Set-Cookie $auth_cookie_name_0;
                add_header Set-Cookie $auth_cookie_name_1;
            }
            proxy_no_cache $cookie_session;

            # Provide the web page to the user after successful validation

            proxy_pass http://127.0.0.1:8080; # The address where your backend service runs
            # Note: This is not the Casdoor deployment address or the Oauth2-Proxy running address, but the address where your backend service that needs login protection runs.

            # Then add configurations to pass user IP, Connection request headers, etc., to your backend service, for example:
            proxy_set_header X-Forwarded-For $remote_addr;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection upgrade;
            proxy_set_header Accept-Encoding gzip;
        }
        access_log /path/to/access_log.log;
        error_log /path/to/error_log.log;
    }
    ```

2. Save the file and reload your Nginx.

## Testing

- Next, you can test your implementation.
- In normal circumstances, your users will go through the following process when logging in to your service:
- Open the URL `project.yourdomain.com` in a browser -> Only see a page requiring login, including a button named "Sign in with OpenID Connect" -> Click the button and be redirected to your Casdoor address, where they will be asked to log in -> Users enter their username and password, and Casdoor verifies their credentials -> Automatically redirect back to your URL `project.yourdomain.com` -> Successfully access your service -> Users will be asked to log in again when the `--cookie-expire` time you set expires.

## Troubleshooting

- If your project is not running as expected, please check your Nginx configuration and Oauth2-Proxy configuration parameters for correctness.
- You can also refer to the official documentation of Oauth2-Proxy on [GitHub](https://github.com/oauth2-proxy/oauth2-proxy).
- If you find any errors in this document, please feel free to request edits on GitHub.
