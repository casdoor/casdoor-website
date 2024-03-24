---
title: GitLab
description: Using Casdoor for authentication in a self-developed GitLab server
keywords: [GitLab]
authors: [Steve0x2a]
---

Casdoor can use the OIDC protocol to link to a self-deployed GitLab server, and this document will show you how to do it.

:::caution

As the [GitLab docs](https://docs.gitlab.com/ee/administration/auth/oidc.html#configure-keycloak) state, GitLab only works with OpenID providers that use HTTPS, so you need to deploy Casdoor with HTTPS, such as putting Casdoor behind an NGINX reverse proxy with an SSL certificate setup. Casdoor itself only listens on port 8000 by default via HTTP and has no HTTPS-related functionality.

:::

The following are some of the names mentioned in the configuration:

`CASDOOR_HOSTNAME`: The domain name or IP where the Casdoor server is deployed, e.g., `https://door.casbin.com`.

`GITLAB_HOSTNAME`: The domain name or IP where GitLab is deployed, e.g., `https://gitlab.com`.

## Step 1: Deploy Casdoor and GitLab

Firstly, Casdoor and GitLab should be deployed.

After a successful deployment, you need to ensure:

1. Casdoor can be logged into and used normally.
2. Set Casdoor's `origin` value (conf/app.conf) to `CASDOOR_HOSTNAME`.
![Casdoor conf](/img/integration/casdoor_origin.png)

## Step 2: Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Add a redirect URL: `http://GITLAB_HOSTNAME/users/auth/openid_connect/callback`.
3. Add the provider you want and supplement other settings.

![Application Setting](/img/integration/ruby/gitlab/appsetting_gitlab.png)
Notably, you can get two values on the application settings page: `Client ID` and `Client secret` (see the picture above), and we will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, where you will see the OIDC configuration of Casdoor.

## Step 3: Configure GitLab

You can follow the steps below to set this up, or make custom changes according to [this document](https://docs.gitlab.com/ee/administration/auth/oidc.html#casdoor) (e.g., if you are installing GitLab using source code rather than the Omnibus).

1. On your GitLab server, open the configuration file.

    ```bash
    sudo editor /etc/gitlab/gitlab.rb
    ```

2. Add the provider configuration. (The HOSTNAME URL should include http or https)

    ```ruby
    gitlab_rails['omniauth_providers'] = [
        {
            name: "openid_connect",
            label: "Casdoor", # optional label for the login button, defaults to "Openid Connect"
            args: {
                name: "openid_connect",
                scope: ["openid", "profile", "email"],
                response_type: "code",
                issuer:  "<CASDOOR_HOSTNAME>",
                client_auth_method: "query",
                discovery: true,
                uid_field: "preferred_username",
                client_options: {
                    identifier: "<YOUR CLIENT ID>",
                    secret: "<YOUR CLIENT SECRET>",
                    redirect_uri: "<GITLAB_HOSTNAME>/users/auth/openid_connect/callback"
                }
            }
        }
    ]
    ```

3. Reboot your GitLab server.
4. Each registered user can open **`GITLAB_HOSTNAME`/-/profile/account** and connect the Casdoor account.
    ![GitLab connect](/img/integration/ruby/gitlab/gitlab_connect.png)
5. Finish.
    Now, you can log in to your own GitLab using Casdoor.
    ![GitLab login](/img/integration/ruby/gitlab/gitlab_login.png)
