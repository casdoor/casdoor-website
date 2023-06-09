---
title: GitLab
description: 在 GitLab 服务器中使用 Casdoor 进行身份验证
keywords:
  - GitLab
authors:
  - Steve0x2a
---

Casdoor 可以使用 OIDC 协议链接到私有部署的 GitLab，该文档将向您展示如何处理相关问题。

:::caution

As [GitLab docs](https://docs.gitlab.com/ee/administration/auth/oidc.html#configure-keycloak) said, GitLab only works with OpenID providers that use HTTPS, so you need to deploy Casdoor with HTTPS, like putting Casdoor behind a NGINX reverse proxy with SSL certificate setup. Casdoor itself only listens to 8000 port by default via HTTP and has no HTTPS related functionality.

:::

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed. e.g., `https://door.casbin.com`.

`GITLAB_HOSTNAME`: Domain name or IP where GitLab is deployed. e.g., `https://gitlab.com`.

## 第 1 步： 部署 Casdoor 和 GitLab

Firstly, the [Casdoor](/docs/basic/server-installation) and [GitLab](https://docs.gitlab.com/ee/install/) should be deployed.

After a successful deployment, you need to ensure:

1. Casdoor 可以正常登录使用。
2. 将 Casdoor 的 `origin` 值 (conf/app.conf) 设置为 `CASDOOR_HOSTNAME`。 ![Casdoor 配置](/img/integration/casdoor_origin.png)

## 第 2 步： 配置 Casdoor 应用程序

1. 创建或使用现有的 Casdoor 应用程序。
2. 添加重定向网址：`http://GITLAB_HOSTNAME/users/auth/openid_connect/callback`。
3. 添加您想要的提供商并补充其他设置。

![Application Setting](/img/integration/ruby/gitlab/appsetting_gitlab.png) Not surprisingly, you can get two values ​​on the application settings page: `Client ID` and `Client secret` like the picture above, and we will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## 第 3 步： 配置 GitLab

You can follow the steps below to set this up, or make custom changes according to [this document](https://docs.gitlab.com/14.6/ee/administration/auth/oidc.html)(e.g., you are installing GitLab using source code rather than Omnibus).

1. 在 GitLab 服务器上，打开配置文件。

    ```bash
    sudo editor /etc/gitlab/gitlab.rb
    ```

2. 添加提供商配置。  (HOSTNAME 链接应包括 http 或 https)

    ```ruby
    gitlab_rails['omniauth_providers'] = [
        {
            name: "openid_connect",
            label: "Casdoor", # 登录按钮的可选标签，默认为"Openid Connect"
            args: {
                name: "openid_connect",
                scope: ["openid", "profile", "email"],
                response_type: "code",
                issuer:  "<CASDOOR_HOSTNAME>",
                client_auth_method: "query",
                discovery: true,
                uid_field: "preferred_username",
                client_options: {
                    identifier: "<你的 CLIENT ID>",
                    secret: "<你的 CLIENT SECRET>",
                    redirect_uri: "<GITLAB_HOSTNAME>/users/auth/openid_connect/callback"
                }
            }
        }
    ]
    ```

3. 重新启动 GitLab 服务器。
4. 每个注册用户都可以打开**`GITLAB_HOSTNAME`/-/profile/account**，连接 Casdoor 账号。 ![GitLab 连接](/img/integration/ruby/gitlab/gitlab_connect.png)
5. 完成！ 现在，您可以通过 casdoor 登录您自己的 GitLab。 ![GitLab 登录](/img/integration/ruby/gitlab/gitlab_login.png)
