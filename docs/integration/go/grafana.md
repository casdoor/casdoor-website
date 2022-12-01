---
title: Grafana
description: Using Casdoor for authentication in Grafana
keywords: [Grafana]
authors: [ComradeProgrammer]
---

## Using Casdoor for authentication in Grafana

[Grafana](https://grafana.com/oss/grafana/) supports authentication via Oauth. Therefore it is extremely easy for users to use casdoor to log in in Grafana. Only several steps and simple configurations can achieve that.

Here is a tutorial to use Casdoor for authentication in Grafana. Before you proceed, please ensure that you have grafana installed and running.

## Step 1 Create an app for grafana in Casdoor

Here is an example of creating an app in Casdoor
![](/img/integration/go/grafana/grafana_1.png)

Please copy the client secret and client id for the next step.

Please add the callback url of grafana. By default, grafana's oauth callback is `/login/generic_oauth`. So please concatenate this url correctly.

## Step 2: Modify the configuration of grafana

By default the configuration file for oauth locates at `conf/defaults.ini` in the workdir of grafana.

Please find the section `auth.generic_oauth` and modify the following field:

```ini
[auth.generic_oauth]
name = Casdoor
icon = signin
enabled = true
allow_sign_up = true
client_id = <client id in previous step>
client_secret = <client secret in previous step>
auth_url = <endpoint of casdoor>/login/oauth/authorize
token_url = <endpoint of casdoor>/api/login/oauth/access_token

```

If you don't want HTTPS enabled for casdoor, please also set `tls_skip_verify_insecure = true`

## Step3: See whether it works

Shutdown grafana and restart it.

Go to see the login page, you are supposed to see something like this
![](/img/integration/go/grafana/grafana_2.png)
