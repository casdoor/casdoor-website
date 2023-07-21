---
title: NGINX Plus
description:  Using Casdoor in NGINX Plus
keywords: [NGINX Plus]
authors: [SkipperQ]
---

Enable OpenID Connect-based single-sign for applications proxied by NGINX Plus, using Casdoor as the identity provider (IdP).

This guide explains how to enable single sign-on (SSO) for applications being proxied by NGINX Plus. The solution uses OpenID Connect as the authentication mechanism, with [Casdoor](https://casdoor.org/) as the identity provider (IdP), and NGINX Plus as the relying party.

> See Also: You can find more information about the NGINX Plus OpenID Connect integration in the project’s GitHub repo.

## Prerequisites

The instructions assume you have the following:

- A running Casdoor server. See the Casdoor documentation for [Server Installation](https://casdoor.org/docs/basic/server-installation) and [Try with Docker](https://casdoor.org/docs/basic/try-with-docker).
- An NGINX Plus subscription and NGINX Plus R15 or later. For installation instructions, see the [NGINX Plus Admin Guide](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-plus/).
- The [NGINX JavaScript module](https://www.nginx.com/blog/introduction-nginscript/) (njs), required for handling the interaction between NGINX Plus and the IdP. After installing NGINX Plus, install the module with the command for your operating system.

    For Debian and Ubuntu:

    ```bash
    sudo apt install nginx-plus-module-njs
    ```

    For CentOS, RHEL, and Oracle Linux:

    ```bash
    sudo yum install nginx-plus-module-njs
    ```

- The following directive included in the top-level (“main”) configuration context in **/etc/nginx/nginx.conf**, to load the NGINX JavaScript module:

    `load_module modules/ngx_http_js_module.so;`

## Configuring Casdoor

**Note:** The following procedure reflects the Casdoor GUI at the time of publication, but the GUI is subject to change. Use this guide as a reference and adapt to the current Casdoor GUI as necessary.

Create a Casdoor client for NGINX Plus in the Casdoor GUI:

1. Log in to your Casdoor account **<http://casdoor*-server-address*:8000/login/>** .
2. In the top navigation column, click **Application**. On the **Application** page that opens, click the **Add** button in the upper left corner.

    ![addApp](/img/integration/C++/NGINX_Plus/addApp.png)

3. On the **Edit Application** page that opens, change the value in the **Name** and **Display name** to the name of the application for which you’re enabling SSO. Here we’re using NGINX Plus.

    ![appName](/img/integration/C++/NGINX_Plus/appName.png)

    In the **Redirect URLs** field, type the URL of the NGINX Plus instance including the port number, and ending in **/_codexch** (in this guide it is [https://my-nginx.example.com:443/_codexch](https://my-nginx.example.com/_codexch)).

    ![redirectURL](/img/integration/C++/NGINX_Plus/redirectURL.png)

    **Notes:**

    - For production, we strongly recommend that you use SSL/TLS (port 443).
    - The port number is mandatory even when you’re using the default port for HTTP (80) or HTTPS (443).
4. Record the values in the **Client ID** and **Client Secret** fields. You will copy it into the NGINX Plus configuration file in [Step 4 of *Configuring NGINX Plus*](#jump1).<span id="jump3"></span>

    ![Client](/img/integration/C++/NGINX_Plus/Client.png)

5. Click **Roles** in the top navigation column, then click the **Add** button in the upper left corner of the page that opens.

    ![addRole](/img/integration/C++/NGINX_Plus/addRole.png)

6. On the **Add** page that opens, type a value in the **Name** and **Display Name** field (here it is nginx-casdoor-role) and click the **Save** button.

    ![roleName](/img/integration/C++/NGINX_Plus/roleName.png)

7. In the top navigation column, click **Users**. On the **Users** page that opens, either click **Edit** to edit one of the existing users, or click the **Add** button in the upper left corner to create a new user.
8. On the **Add** page that opens, modify **Name** and **Display Name** you like (here it is user1).

    ![userName](/img/integration/C++/NGINX_Plus/userName.png)

    Select **NGINX Plus** in **Signup application**.

    ![signupApp](/img/integration/C++/NGINX_Plus/signupApp.png)

    In the **Managed accounts** field, select **NGINX Plus** in **Application** and fill in the username and password.

    ![managedAcc](/img/integration/C++/NGINX_Plus/managedAcc.png)

9. Go back to the **Roles** page and click **Edit** on the **nginx-casdoor-role** row. In the opened page, in the **Sub users** field, select the username you just created(here it is built-in/user1)

    ![subUsers](/img/integration/C++/NGINX_Plus/subUsers.png)

## Configuring NGINX Plus

Configure NGINX Plus as the OpenID Connect relying party:

1. Create a clone of the **[nginx-openid-connect](https://github.com/nginxinc/nginx-openid-connect)** GitHub repository.

    ```bash
    git clone https://github.com/nginxinc/nginx-openid-connect
    ```

2. Copy these files from the clone to **/etc/nginx/conf.d**:
    - **frontend.conf**
    - **openid_connect.js**
    - **openid_connect.server_conf**
    - **openid_connect_configuration.conf**
3. Get the URLs for the authorization endpoint, token endpoint, and JSON Web Key (JWK) file from the Casdoor configuration. Run the following `curl` command in a terminal, piping the output to the indicated `python` command to output the entire configuration in an easily readable format. We’ve abridged the output to show only the relevant fields. <span id="jump1"></span>

    ```bash
    curl http://<casdoor-server-address>/.well-known/openid-configuration | python -m json.tool
    ...
    {
        "authorization_endpoint": "https://<casdoor-server-address>/login/oauth/authorize",
        ...
        "token_endpoint": "http://<casdoor-server-address>/api/login/oauth/access_token",
        ...
        "jwks_uri": "http://<casdoor-server-address>/.well-known/jwks",
     ...
     }
    
    ```

4. Using your preferred text editor, open **/etc/nginx/conf.d/openid_connect_configuration.conf**. Change the “default” parameter value of each of the following [map](https://nginx.org/en/docs/http/ngx_http_map_module.html#map) directives to the specified value:<span id="jump2"></span>
    - `map $host $oidc_authz_endpoint` – Value of `authorization_endpoint` from [Step 3](#jump1) (in this guide, `https://<casdoor-server-address>/login/oauth/authorize`)
    - `map $host $oidc_token_endpoint` – Value of `token_endpoint` from [Step 3](#jump1) (in this guide, `http://<casdoor-server-address>/api/login/oauth/access_token`)
    - `map $host $oidc_client` – Value in the **Client ID** field from [Step 4 of *Configuring Casdoor*](#jump3)
    - `map $host $oidc_client_secret` – Value in the **Client** **Secret** field from [Step 2 of *Configuring Casdoor*](#jump3)
    - `map $host $oidc_hmac_key` – A unique, long, and secure phrase
5. Configure the JWK file. The procedure depends on which version of NGINX Plus you are using.
    - In NGINX Plus R17 and later, NGINX Plus can read the JWK file directly from the URL reported as `jwks_uri` in [Step 3](#jump2). Change **/etc/nginx/conf.d/frontend.conf** as follows:
        1. Comment out (or remove) the [auth_jwt_key_file](http://nginx.org/en/docs/http/ngx_http_auth_jwt_module.html#auth_jwt_key_file) directive.
        2. Uncomment the [auth_jwt_key_request](http://nginx.org/en/docs/http/ngx_http_auth_jwt_module.html#auth_jwt_key_request) directive. (Its parameter, `/_jwks_uri`, refers to the value of the `$oidc_jwt_keyfile` variable, which you set in the next step.)
        3. Change the “default” parameter of the `map $host $oidc_jwt_keyfile` directive to the value reported in the `jwks_uri` field in [Step 3](#jump2) (in this guide, `http://<casdoor-server-address>/.well-known/jwks`).
    - In NGINX Plus R16 and earlier, the JWK file must be on the local disk. (You can also use this method with NGINX Plus R17 and later if you wish.)
        1. Copy the JSON contents from the JWK file named in the `jwks_uri` field in [Step 3](#jump2) (in this guide, `http://<casdoor-server-address>/.well-known/jwks`) to a local file (for example, `/etc/nginx/my_casdoor_jwk.json`).
        2. In **/etc/nginx/conf.d/openid_connect_configuration.conf**, change the “default” parameter of the `map $host $oidc_jwt_keyfile` directive to the local file path.
6. Confirm that the user named by the [user](http://nginx.org/en/docs/ngx_core_module.html#user) directive in the NGINX Plus configuration (in **/etc/nginx/nginx.conf** by convention) has read permission on the JWK file.

## Testing

In a browser, enter the address of your NGINX Plus instance and try to log in using the credentials of a user mapped to the role for NGINX Plus.

![test](/img/integration/C++/NGINX_Plus/test.png)

## Troubleshooting

See the **[Troubleshooting](https://github.com/nginxinc/nginx-openid-connect#troubleshooting)** section at the **nginx-openid-connect** repository on GitHub.
