---
title: NginxCommunityVersion
description: Using Casdoor with Nginx (Not Nginx-Plus) and Oauth2-Proxy
keywords: [nginx, OAuth2-Proxy, nginx-community-version]
authors: [gzyzhy]
---

## About the human language used in this article

This article was written in Chinese (Simplified). If you are confused, please use online translation tools such as Google Translate.

## 先决条件

本说明假设您具有如下条件：

- 正在运行的Casdoor服务。如您还未安装Casdoor服务，请参阅[Server Installation](https://casdoor.org/docs/basic/server-installation) 或 [Try with Docker](https://casdoor.org/docs/basic/try-with-docker)。
- 已在编译时开启`ngx_http_auth_request_module`模块的Nginx开源版。如您不知道如何开启`ngx_http_auth_request_module`模块，请参阅[Nginx Module Document](https://nginx.org/en/docs/http/ngx_http_auth_request_module.html)。
- 要开启认证功能的网站已经成功部署在Nginx上，已**配置好域名**（而非使用IP地址），并且可以正常访问。
- OAuth2-Proxy工具(目前GitHub中开源的高Star项目主要有以下两款，您需要选择其一：)

1. oauth2-proxy/oauth2-proxy （本文使用此工具） [GitHub](https://github.com/oauth2-proxy/oauth2-proxy)  [Official Website](https://oauth2-proxy.github.io/oauth2-proxy)
2. vouch/vouch-proxy [GitHub](https://github.com/vouch/vouch-proxy)

## I.配置CasDoor

**Note**：本文的操作基于文章发布时的Casdoor GUI,但Casdoor GUI可能依版本不同发生变化。请依照本文给出的参考，针对您部署的Casdoor版本进行配置。

**Note**：本文中出现的密钥、密码、用户名等需要保密的内容均为示例，出于安全考虑，您必须在自行部署时**将它们替换为您自己的相关内容**。

1. 登录您的Casdoor管理员账户。
2. 在顶栏中选择“身份认证”-“应用”选项,然后在“应用”页面点击“添加”。

    ![addApp](/img/integration/C++/NGINX_Community/addApp.jpg)

3. 根据您的项目信息来完成应用配置。在本文中，我们使用`Nginx-Community`作为示例的应用名称。

    ![ConfigureApp](/img/integration/C++/NGINX_Community/ConfigureApp.jpg)

4. 记录下“客户端ID”和“客户端密钥”两个字段的值。稍后在配置OAuth2-Proxy时将会用到。然后将“重定向 URL”配置为`https://project.yourdomain.com/oauth2/callback/`。

    ![RecordInfo](/img/integration/C++/NGINX_Community/RecordInfo.jpg)

5. 在顶栏中选择“Casbin权限管理”-“角色”选项,然后在“角色”页面点击“添加”。

    ![AddRole](/img/integration/C++/NGINX_Community/AddRole.jpg)

6. 根据您的项目信息来完成角色配置。在本文中，我们使用`nginx_role`作为示例的角色名称。

    ![ConfigureRole](/img/integration/C++/NGINX_Community/ConfigureRole.jpg)

7. （可选）在顶栏中选择“用户管理”-“用户”，然后根据您的需求添加新用户。如果您需要的用户已存在，请跳过此步骤。在本文中我们创建了名为“user”的示例用户。

8. 回到第5步中提到的“角色”页面，编辑`nginx_role`角色，将您需要的用户添加到"包含用户”选项中。在本文中，我们将上一步创建的`builtin/user`添加到这里。

## II.配置Oauth2-Proxy

**Note**：本文使用Oauth2-Proxy项目作为示例，如果您想使用Vouch而不是Oauth2-Proxy，请自行前往[GitHub](https://github.com/vouch/vouch-proxy)阅读其官方文档。

**Note**：本文默认您的站点已配置可信SSL证书并仅允许https访问，或者设置了http访问者自动跳转到https。这样做能够最大程度的保护Cookie，从而保护登录Token不被恶意读取。若您的站点需要通过不安全的http协议访问，请自行修改相关命令。有关通过http部署的更多帮助，请前往[GitHub](https://github.com/oauth2-proxy/oauth2-proxy)阅读Oauth2-Proxy的官方文档。

**Tips**：[OAuth2-Proxy](https://github.com/oauth2-proxy/oauth2-proxy)提供了多种部署方式（如源码编译、Docker安装等），为方便讲解，本文采用“预构建二进制文件”进行部署。

1. 前往[GitHub Releases](https://github.com/oauth2-proxy/oauth2-proxy/releases)页面，下载您操作系统和CPU架构对应的二进制包。
    截止到2024年1月1日，OAuth-Proxy的最新Release版本为`V7.5.1`。如果要下载这一版本的二进制包，可以执行以下命令：
    For Linux with AMD64

    ```bash
    wget -O oauth2-proxy-linux.tar.gz https://github.com/oauth2-proxy/oauth2-proxy/releases/download/v7.5.1/oauth2-proxy-v7.5.1.linux-amd64.tar.gz
    ```

    强烈建议您在下载压缩包后前往[GitHub Releases](https://github.com/oauth2-proxy/oauth2-proxy/releases)页面查看官方提供的`SHA256SUM`值，并与您下载到的包的`SHA256SUM`值逐字对比。

2. 解压下载到的包

    ```bash
    tar -zxvf oauth2-proxy-*.tar.gz
    ```

3. 进入解压的目录

    ```bash
    cd oauth2-proxy-v7.5.1.linux-amd64
    ```

4. 将得到的二进制文件移动到`/usr/local/bin`并配置为可执行权限。您可能需要根据您的情况使用`sudo`提升权限。

    ```bash
    cp ./oauth2-proxy /usr/local/bin
    cd /usr/local/bin
    chmod +x ./oauth2-proxy
    ```

5. 测试二进制安装。如果安装成功，执行下面的命令后，您应该看到类似`oauth2-proxy v7.5.1 (built with go1.21.1)`的输出。

    ```bash
    cd ~
    oauth2-proxy --version
    ```

6. 使用命令行参数运行oauth2-proxy。其中标有[必须]的参数必须根据您的实际情况配置，标有[可选]的参数能够优化性能，但也可以省去。为了保证oauth2-proxy能够在后台运行，您可以借助`Screen`、`Supervisor`之类的进程守护工具或终端工具。

    ```bash
    oauth2-proxy \ 
    --provider=oidc \ #[必须]不要更改
    --client-id=abc123456def \ #[必须]前文中第I.4步获取到的“客户端ID”
    --client-secret=abc123456def \ #[必须]前文中第I.4步获取到的“客户端密钥”
    --oidc-issuer-url=https://auth.yourdomain.com \ #[必须]您的Casdoor URL（域名或公网IP均可）
    --redirect-url=https://project.yourdomain.com/oauth2/callback \ #[必须]https://要保护的项目的域名/oauth2/callback 
    --scope=email+profile+groups+openid \ #[必须]从Casdoor获取：用户邮箱、用户基本信息、所属群组和登录身份验证
    --cookie-domain=project.yourdomain.com \ #[必须]您需要保护的项目的域名
    --whitelist-domain=project.yourdomain.com \ #[必须]您需要保护的项目的域名
    --cookie-secret=abc123456def \ #[必须]请随机生成一串数字+字母字符串填在此处
    --email-domain=* \ #[必须]可接受的用户电子邮件域名列表（*代表接受所有域名），若用户的电子邮件后缀不在此列表内，即使登录成功也会返回403错误。
    --insecure-oidc-allow-unverified-email=true \ #[必须]是否接受电子邮件未经验证的用户
    --http-address=http://127.0.0.1:65534 \ #[必须]oauth2-proxy监听的地址。此处端口号可以随意设置，请记录下您设置的值，后续配置Nginx时需要。
    --cookie-expire=24h0m0s \ #[可选]Cookie有效期。超过该有效期后用户需要重新登陆。
    --custom-sign-in-logo=https://cdn.yourdomain.com/pic/proj.png \ #[可选]显示在要求登录的界面上的图标。建议选用矩形而非正方形的图片。
    --session-store-type=redis \ #[可选]使用Redis缓存。若不需要Redis，删除本项即可。
    --redis-connection-url=redis://127.0.0.1:6379/0 \ #[可选]RedisURL。若不需要Redis，删除本项即可。
    --redis-password=123456 #[可选]Redis链接密码。若不需要Redis或Redis没有密码，删除本项即可。
    ```

## III.配置Nginx

**Note**：请再次确认您的Nginx在从源码编译安装时开启了`ngx_http_auth_request_module`模块（编译命令中带有`--with_http_auth_request_module`）。如您不知道如何开启`ngx_http_auth_request_module`模块，请参阅[Nginx Module Document](https://nginx.org/en/docs/http/ngx_http_auth_request_module.html)。

**Tips**：使用宝塔面板工具安装的Nginx默认未开启此模块。

1. 打开您已经部署好的需要保护的网站的配置文件，作如下修改：

    **Note**：您需要根据实际情况调整本配置文件。受Nginx版本等影响，本配置文件不一定能在所有Nginx上顺利运行。请您根据自己的Nginx信息调整相关内容。

    ```nginx
    server {
        listen 443 ssl http2;

        include /path/to/ssl.conf;

        #添加如下内容
        location ^~ /oauth2/ {
            proxy_pass       http://127.0.0.1:65534; #改成前文II.6步骤中配置的“--http-address”

            proxy_set_header Host                    $host;
            proxy_set_header X-Real-IP               $remote_addr;
            proxy_set_header X-Scheme                $scheme;

            proxy_set_header X-Auth-Request-Redirect $request_uri;
            # or, if you are handling multiple domains:
            # proxy_set_header X-Auth-Request-Redirect $scheme://$host$request_uri;
        }
        location = /oauth2/auth {
            proxy_pass       http://127.0.0.1:65534; #改成前文II.6步骤中配置的“--http-address”

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
            proxy_set_header X-User  $user; #将用户登录后的用户名传递给您的后端服务
            proxy_set_header X-Email $email; #将用户登录后的电子邮件传递给您的后端服务

            auth_request_set $token  $upstream_http_x_auth_request_access_token;
            proxy_set_header X-Access-Token $token; #将用户登录的Token传递给您的后端服务

            #以下是验证用户登录的Cookie相关配置
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

            #验证成功后正常给用户提供网页

            proxy_pass http://127.0.0.1:8080; #您要对外提供的后端服务运行的地址
            #注意：不是Casdoor部署地址，也不是Oauth2-Proxy运行地址，而是您要对外提供服务、受到登录保护的后端服务的运行地址。

            #然后添加给您的后端服务传递用户IP、Connection请求头等等的配置，例如：
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

2. 保存文件并重载您的Nginx。

## 测试

- 接下来，您可以检验您的成果了。
- 正常情况下，您的用户在登录使用您的服务时，会经历以下流程：
- 在浏览器打开网址`project.youdomain.com`->只能看到要求登录的页面，包含一个名为`Sign in with OpenID Connect`的按钮->点击按钮，跳转到您的Casdoor地址，被要求登录->用户输入用户名和密码，Casdoor验证成功->自动跳转回您的网址`project.youdomain.com`->成功访问您的服务->直到您设置的`--cookie-expire`时间到，用户再次被要求登录。

## 问题解决

- 如果您的项目未按照预期运行，请检查您的Nginx配置和Oauth2-Proxy配置参数是否正确。
- 您也可以前往[GitHub](https://github.com/oauth2-proxy/oauth2-proxy)阅读Oauth2-Proxy的官方文档。
- 若您发现本文档中有错误之处，请在GitHub上申请编辑本文，并不吝赐教。
