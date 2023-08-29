---
title: Grafana
description: Using Casdoor for authentication in Grafana
keywords: [Grafana]
authors: [ComradeProgrammer]
---

## Using Casdoor for authentication in Grafana

[Grafana](https://grafana.com/oss/grafana/) supports authentication via OAuth. Therefore, it is extremely easy for users to use Casdoor to log in to Grafana. Only several steps and simple configurations are needed to achieve that.

Here is a tutorial on how to use Casdoor for authentication in Grafana. Before you proceed, please ensure that you have Grafana installed and running.

## Step 1: Create an app for Grafana in Casdoor

Here is an example of creating an app in Casdoor:

![Create an application in Casdoor](/img/integration/go/grafana/grafana_1.png)

Please copy the client secret and client ID for the next step.

Please add the callback URL of Grafana. By default, Grafana's OAuth callback is `/login/generic_oauth`. So please concatenate this URL correctly.

## Step 2: Modify the configuration of Grafana

By default, the configuration file for OAuth is located at `conf/defaults.ini` in the workdir of Grafana.

Please find the section `[auth.generic_oauth]` and modify the following fields:

```ini
[auth.generic_oauth]
name = Casdoor
icon = signin
enabled = true
allow_sign_up = true
client_id = <client ID from previous step>
client_secret = <client secret from previous step>
auth_url = <Casdoor endpoint>/login/oauth/authorize
token_url = <Casdoor endpoint>/api/login/oauth/access_token

```

### About HTTPS

If you don't want HTTPS enabled for Casdoor or if you deploy Grafana without HTTPS enabled, please also set `tls_skip_verify_insecure = true`.

### About redirectURI after Sign In With Casdoor  

If the redirect URI is not correct after signing in with Casdoor in Grafana, you may want to configure [root_url](https://stackoverflow.com/a/69814805).  

```ini
[server]
http_port = 3000
# The public-facing domain name used to access Grafana from a browser
domain = <your IP here>
# The full public-facing URL
root_url = %(protocol)s://%(domain)s:%(http_port)s/
```

Related links:

1. [Grafana documentation](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#root_url)

2. [Grafana defaults.ini](https://github.com/grafana/grafana/blob/main/conf/defaults.ini)

### About Role Mapping

You may want to configure `role_attribute_path` to map your user's role to Grafana via [role_attribute_path](https://grafana.com/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/generic-oauth/#role-mapping).

```ini
[auth.generic_oauth]
role_attribute_path = contains(roles[*].name, 'admin') && 'Admin' || contains(roles[*].name, 'editor') && 'Editor' || 'Viewer'
role_attribute_strict = true
allow_assign_grafana_admin = true
```

The JMESPath expression after `role_attribute_path` is very important here. Please refer to the Grafana documentation.

## Step 3: See if it works

Shutdown Grafana and restart it.

Go to the login page. You should see something like this:

![Final result](/img/integration/go/grafana/grafana_2.png)
