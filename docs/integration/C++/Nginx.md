---
title: Nginx
description: Using Casdoor with Nginx
keywords: [nginx, plus, nginx-plus]
authors: [SkipperQ]
---

Enable OpenID Connect-based single sign-on for applications proxied by NGINX Plus using Casdoor as the identity provider (IdP).

This guide explains how to enable single sign-on (SSO) for applications that are being proxied by NGINX Plus. The solution uses OpenID Connect as the authentication mechanism, with [Casdoor](https://casdoor.org/) as the identity provider (IdP), and NGINX Plus as the relying party.

> See Also: You can find more information about the NGINX Plus OpenID Connect integration in the project’s GitHub repository.

## Prerequisites

The instructions assume that you have the following:

- A running Casdoor server. Refer to the Casdoor documentation for [Server Installation](https://casdoor.org/docs/basic/server-installation) and [Try with Docker](https://casdoor.org/docs/basic/try-with-docker).
- An NGINX Plus subscription and NGINX Plus R15 or later. For installation instructions, see the [NGINX Plus Admin Guide](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-plus/).
- The [NGINX JavaScript module](https://www.nginx.com/blog/introduction-nginscript/), which is required for handling the interaction between NGINX Plus and the IdP. After installing NGINX Plus, install the module using the appropriate command for your operating system.

    For Debian and Ubuntu:

    ```bash
    sudo apt install nginx-plus-module-njs
    ```

    For CentOS, RHEL, and Oracle Linux:

    ```bash
    sudo yum install nginx-plus-module-njs
    ```

- The following directive should be included in the top-level (“main”) configuration context in **/etc/nginx/nginx.conf** in order to load the NGINX JavaScript module:

    `load_module modules/ngx_http_js_module.so;`

## Configuring Casdoor

**Note:** The following procedure reflects the Casdoor GUI at the time of publication, but the GUI is subject to change. Use this guide as a reference and adapt to the current Casdoor GUI as necessary.

To create a Casdoor client for NGINX Plus in the Casdoor GUI, follow these steps:

1. Log in to your Casdoor account at **<http://your-casdoor-url.com/login/>**.
2. In the top navigation column, click **Application**. On the **Application** page that opens, click the **Add** button in the upper left corner.

    ![addApp](/img/integration/C++/NGINX_Plus/addApp.png)

3. On the **Edit Application** page that opens, change the value in the **Name** and **Display name** fields to the name of the application for which you’re enabling SSO. Here, we’re using NGINX Plus.

    ![appName](/img/integration/C++/NGINX_Plus/appName.png)

    In the **Redirect URLs** field, type the URL of the NGINX Plus instance including the port number, and ending in **/_codexch** (in this guide it is [https://your-site-url.com:443/_codexch](https://your-site-url.com/_codexch)).

    ![redirectURL](/img/integration/C++/NGINX_Plus/redirectURL.png)

    **Notes:**

    - For production, we strongly recommend that you use SSL/TLS (port 443).
    - The port number is mandatory even when you’re using the default port for HTTP (80) or HTTPS (443).

4. Record the values in the **Client ID** and **Client Secret** fields. You will copy them into the NGINX Plus configuration file in [Step 4 of *Configuring NGINX Plus*](#jump1).<span id="jump3"></span>

    ![Client](/img/integration/C++/NGINX_Plus/Client.png)

5. Click **Roles** in the top navigation column, then click the **Add** button in the upper left corner of the page that opens.

    ![addRole](/img/integration/C++/NGINX_Plus/addRole.png)

6. On the **Add** page that opens, type a value in the **Name** and **Display Name** fields (here it is nginx-casdoor-role) and click the **Save** button.

    ![roleName](/img/integration/C++/NGINX_Plus/roleName.png)

7. In the top navigation column, click **Users**. On the **Users** page that opens, either click **Edit** to edit one of the existing users or click the **Add** button in the upper left corner to create a new user.
8. On the **Add** page that opens, modify the **Name** and **Display Name** as you like (here it is user1).

    ![userName](/img/integration/C++/NGINX_Plus/userName.png)

    Select **NGINX Plus** in the **Signup application**.

    ![signupApp](/img/integration/C++/NGINX_Plus/signupApp.png)

    In the **Managed accounts** field, select **NGINX Plus** in **Application** and fill in the username and password.

    ![managedAcc](/img/integration/C++/NGINX_Plus/managedAcc.png)

9. Go back to the **Roles** page and click **Edit** on the **nginx-casdoor-role** row. In the opened page, in the **Sub users** field, select the username you just created (here it is built-in/user1).

    ![subUsers](/img/integration/C++/NGINX_Plus/subUsers.png)

## Configuring NGINX Plus

To configure NGINX Plus as the OpenID Connect relying party, follow these steps:

1. Start by creating a clone of the [nginx-openid-connect](https://github.com/nginxinc/nginx-openid-connect) GitHub repository:

    ```bash
    git clone https://github.com/nginxinc/nginx-openid-connect
    ```

2. Copy the following files from the clone to the **/etc/nginx/conf.d** directory:
    - **frontend.conf**
    - **openid_connect.js**
    - **openid_connect.server_conf**
    - **openid_connect_configuration.conf**

3. Retrieve the URLs for the authorization endpoint, token endpoint, and JSON Web Key (JWK) file from the Casdoor configuration. Open a terminal and execute the following `curl` command, piping the output to the indicated `python` command to generate a readable configuration format. For brevity, we have truncated the output to display only the relevant fields. <span id="jump1"></span>

    ```bash
    curl http://<casdoor-server-address>/.well-known/openid-configuration | python -m json.tool
    {
        "authorization_endpoint": "https://<casdoor-server-address>/login/oauth/authorize",
        "...":"...",
        "token_endpoint": "http://<casdoor-server-address>/api/login/oauth/access_token",
        "...":"...",
        "jwks_uri": "http://<casdoor-server-address>/.well-known/jwks",
        "...":"...",
    }
    ```

4. Open **/etc/nginx/conf.d/openid_connect_configuration.conf** using your preferred text editor. Modify the "default" parameter value for each of the following [map](https://nginx.org/en/docs/http/ngx_http_map_module.html#map) directives with the specified values:<span id="jump2"></span>
    - `map $host $oidc_authz_endpoint` – Use the value of the `authorization_endpoint` from [Step 3](#jump1) (in this guide, `https://<casdoor-server-address>/login/oauth/authorize`)
    - `map $host $oidc_token_endpoint` – Use the value of the `token_endpoint` from [Step 3](#jump1) (in this guide, `http://<casdoor-server-address>/api/login/oauth/access_token`)
    - `map $host $oidc_client` – Use the value in the **Client ID** field from [Step 4 of *Configuring Casdoor*](#jump3)
    - `map $host $oidc_client_secret` – Use the value in the **Client Secret** field from [Step 2 of *Configuring Casdoor*](#jump3)
    - `map $host $oidc_hmac_key` – Use a unique, long, and secure phrase

5. Configure the JWK file based on the version of NGINX Plus being used:
    - In NGINX Plus R17 and later, NGINX Plus can directly read the JWK file from the URL specified as `jwks_uri` in [Step 3](#jump2). Make the following changes to **/etc/nginx/conf.d/frontend.conf**:
        1. Comment out (or remove) the [auth_jwt_key_file](http://nginx.org/en/docs/http/ngx_http_auth_jwt_module.html#auth_jwt_key_file) directive.
        2. Uncomment the [auth_jwt_key_request](http://nginx.org/en/docs/http/ngx_http_auth_jwt_module.html#auth_jwt_key_request) directive. (The parameter `/_jwks_uri` refers to the value of the `$oidc_jwt_keyfile` variable, which will be set in the next step.)
        3. Update the "default" parameter of the `map $host $oidc_jwt_keyfile` directive to the value obtained from the `jwks_uri` field in [Step 3](#jump2) (in this guide, `http://<casdoor-server-address>/.well-known/jwks`).
    - In NGINX Plus R16 and earlier, or if preferred, the JWK file must be located on the local disk. Follow these steps:
        1. Copy the JSON contents from the JWK file specified in the `jwks_uri` field in [Step 3](#jump2) (in this guide, `http://<casdoor-server-address>/.well-known/jwks`) to a local file (e.g., `/etc/nginx/my_casdoor_jwk.json`).
        2. In **/etc/nginx/conf.d/openid_connect_configuration.conf**, change the "default" parameter of the `map $host $oidc_jwt_keyfile` directive to the path of the local file.

6. Ensure that the user specified in the [user](http://nginx.org/en/docs/ngx_core_module.html#user) directive within the NGINX Plus configuration file (usually **/etc/nginx/nginx.conf**) has read permissions for the JWK file.

## Testing

Open a browser and enter the address of your NGINX Plus instance. Then, attempt to log in using the credentials of a user who has been assigned the NGINX Plus role.

![test](/img/integration/C++/NGINX_Plus/test.png)

## Troubleshooting

Please refer to the **[Troubleshooting](https://github.com/nginxinc/nginx-openid-connect#troubleshooting)** section in the **nginx-openid-connect** repository on GitHub.
