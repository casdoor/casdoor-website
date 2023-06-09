---
title: Grafana
description: 在 Grafana 中使用 Casdoor 进行身份验证
keywords:
  - Grafana
authors:
  - ComradeProgrammer
---

## 在 Grafana 中使用 Casdoor 进行身份验证

[Grafana](https://grafana.com/oss/grafana/) 支持通过 Oauth 进行认证。 因此，用户在Grafana上登录变得非常容易。 只有几个步骤和简单的配置就能做到这一点。

这是一个使用 Grafana 的 Cassdoor 进行身份验证的教程。 在您继续之前，请确保您已安装 grafana 并正在运行。

## Step 1 Create an app for Grafana in Casdoor

这是一个在 Casdoor 中创建应用程序的示例 ![](/img/integration/go/grafana/grafana_1.png)

请复制 client secret 和 client ID以便下一步操作 。

Please add the callback url of Grafana. By default, Grafana's oauth callback is `/login/generic_oauth`. 所以请正确地拼接这个 url 。

## Step 2: Modify the configuration of Grafana

By default the configuration file for oauth locates at `conf/defaults.ini` in the workdir of Grafana.

请找到 `auth.generic_oauth` 并修改以下字段：

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

### About HTTPS

If you don't want HTTPS enabled for casdoor or if you deploy grafana without HTTPS enabled, please also set `tls_skip_verify_insecure = true`


### About redirectURI after Sign In With Casdoor

If the redirect uri is not right after Sign In with Casdoor in Grafana, you may want to configure [root_url](https://stackoverflow.com/a/69814805)


```ini
[server]
http_port = 3000
# The public facing domain name used to access grafana from a browser
domain = <your ip here>
# The full public facing url
root_url = %(protocol)s://%(domain)s:%(http_port)s/
```

related links:

1. [Grafana doc](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#root_url)

2. [Grafana defaults.ini](https://github.com/grafana/grafana/blob/main/conf/defaults.ini)


### About Role Mappping:

You may want to configure role_attribute_path to map your user's role to Grafana via [role_attribute_path](https://grafana.com/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/generic-oauth/#role-mapping)


```ini
[auth.generic_oauth]
role_attribute_path = contains(roles[*].name, 'admin') && 'Admin' || contains(roles[*].name, 'editor') && 'Editor' || 'Viewer'
role_attribute_strict = true
allow_assign_grafana_admin = true
```


the JMESPath expression after role_attribute_path is very important here. read grafana doc please


## 第3步：查看它是否正常运作。

Shutdown grafana and restart it.

Go to see the login page, you are supposed to see something like this ![](/img/integration/go/grafana/grafana_2.png)
