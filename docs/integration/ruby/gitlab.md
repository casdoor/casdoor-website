---
title: GitLab
description: Using Casdoor for authentication in self-developed GitLab server
keywords: [GitLab]
authors: [Steve0x2a]
---

Casdoor can use the OIDC protocol to link to self-deployed GitLab server, and this document will show you how to do it.

:::caution

As [GitLab docs](https://docs.gitlab.com/ee/administration/auth/oidc.html#configure-keycloak) said, GitLab only works with OpenID providers that use HTTPS, so you need to deploy Casdoor with HTTPS, like putting Casdoor behind a NGINX reverse proxy with SSL certificate setup. Casdoor itself only listens to 8000 port by default via HTTP and has no HTTPS related functionality.

:::

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed. e.g., `https://door.casbin.com`.

`GITLAB_HOSTNAME`: Domain name or IP where GitLab is deployed. e.g., `https://gitlab.com`.

## Step1. Deploy Casdoor and GitLab

Firstly, the [Casdoor](/docs/basic/server-installation) and [GitLab](https://docs.gitlab.com/ee/install/) should be deployed.

After a successful deployment, you need to ensure:

1. Casdoor can be logged in and used normally.
2. Set Casdoor's `origin` value (conf/app.conf) to `CASDOOR_HOSTNAME`.
![Casdoor conf](/img/integration/casdoor_origin.png)

## Step2. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Add a redirect url: `http://GITLAB_HOSTNAME/users/auth/openid_connect/callback`.
3. Add provider you want and supplement other settings.

![Application Setting](/img/integration/ruby/gitlab/appsetting_gitlab.png)
Not surprisingly, you can get two values ​​on the application settings page: `Client ID` and `Client secret` like the picture above, and we will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## Step3. Configure GitLab

You can follow the steps below to set this up, or make custom changes according to [this document](https://docs.gitlab.com/14.6/ee/administration/auth/oidc.html)(e.g., you are installing GitLab using source code rather than Omnibus).

1. On your GitLab server, open the configuration file.

    ```bash
    sudo editor /etc/gitlab/gitlab.rb
    ```

2. Add the provider configuration.  (HOSTNAME url should include http or https)

    ```ruby
    gitlab_rails['omniauth_providers'] = [
        {
            name: "openid_connect",
            label: "Casdoor", # optional label for login button, defaults to "Openid Connect"
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
4. Each registered user can open **`GITLAB_HOSTNAME`/-/profile/account**, connect the casdoor account.
    ![GitLab connect](/img/integration/ruby/gitlab/gitlab_connect.png)
5. Finish.
    Now, you can login your own GitLab by casdoor.
    ![GitLab login](/img/integration/ruby/gitlab/gitlab_login.png)
