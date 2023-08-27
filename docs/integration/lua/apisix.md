---
title: APISIX
description: Using Casdoor in APISIX
keywords: [APISIX]
authors: [Steve0x2a]
---

Currently, there are 2 methods to use Casdoor to connect to APISIX via APISIX plugins and protect the APIs behind APISIX: using APISIX's Casdoor plugin or using APISIX's OIDC plugin.

## Connect Casdoor via APISIX's Casdoor plugin

This plugin, `authz-casdoor`, can protect APIs behind APISIX, forcing every single request to get authenticated without modifying the code of the API.

### How to enable it

You need to specify this plugin when creating the route and provide all the required fields. Here is an example.

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d '
{
  "methods": ["GET"],
  "uri": "/anything/*",
  "plugins": {
    "authz-casdoor": {
        "endpoint_addr":"http://localhost:8000",
        "callback_url":"http://localhost:9080/anything/callback",
        "client_id":"7ceb9b7fda4a9061ec1c",
        "client_secret":"3416238e1edf915eac08b8fe345b2b95cdba7e04"
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}'
```

In this example, we created a route "/anything/*" pointed to "httpbin.org:80" using APISIX's admin API, with the "authz-casdoor" plugin enabled. This route is now under the authentication protection of Casdoor.

### Attributes

| Name            | Type   | Requirement | Default | Valid | Description                                      |
| --------------- | ------ | ----------- | ------- | ----- | ------------------------------------------------ |
| endpoint_addr   | string | required    |         |       | The URL of Casdoor.                              |
| client_id       | string | required    |         |       | The client ID in Casdoor.                        |
| client_secret   | string | required    |         |       | The client secret in Casdoor.                    |
| callback_url    | string | required    |         |       | The callback URL which is used to receive state and code. |

*endpoint_addr and callback_url should not end with '/'*

In the configuration of the "authz-casdoor" plugin, we can see four parameters.

The first one is "callback_url". This is the callback URL in OAuth2. It should be emphasized that this callback URL **must belong to the "uri" you specified for the route**. For example, in this example, <http://localhost:9080/anything/callback> obviously belongs to "/anything/*". Only by this way, the visit toward the callback_url can be intercepted and utilized by the plugin (so that the plugin can get the code and state in OAuth2). The logic of the callback_url is implemented completely by the plugin, so there is no need to modify the server to implement this callback.

The second parameter "endpoint_addr" is obviously the URL of Casdoor. The third and fourth parameters are "client_id" and "client_secret", which you can acquire from Casdoor when you register an app.

### How it works?

Suppose a new user who has never visited this route before is going to visit it (<http://localhost:9080/anything/d?param1=foo&param2=bar>). Considering that "authz-casdoor" is enabled, this visit would be processed by the "authz-casdoor" plugin first. After checking the session and confirming that this user hasn't been authenticated, the visit will be intercepted. With the original URL the user wants to visit kept, they will be redirected to the login page of Casdoor.

After successfully logging in with a username and password (or whatever method they use), Casdoor will redirect this user to the "callback_url" with GET parameters "code" and "state" specified. Because the "callback_url" is known by the plugin, when the visit toward the "callback_url" is intercepted this time, the logic of the "Authorization code Grant Flow" in OAuth2 will be triggered. This means that the plugin will request the access token to confirm whether this user is really logged in. After this confirmation, the plugin will redirect this user to the original URL they want to visit, which was kept by us previously. The logged-in status will also be kept in the session.

Next time this user wants to visit the URL behind this route (for example, <http://localhost:9080/anything/d>), after discovering that this user has been authenticated previously, this plugin won't redirect this user anymore. This way, the user can visit whatever they want under this route without being interfered.

## Connect Casdoor via APISIX's OIDC plugin

Casdoor can use the OIDC protocol to connect to APISIX, and this document will show you how to do it.

The following are some of the names used in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where the Casdoor server is deployed.

`APISIX_HOSTNAME`: Domain name or IP where APISIX is deployed.

### Step 1: Deploy Casdoor and APISIX

Firstly, deploy [Casdoor](/docs/basic/server-installation) and [APISIX](https://apisix.apache.org/docs/apisix/installation-guide/).

After a successful deployment, you need to ensure:

1. Casdoor can be logged in and used normally.
2. Set Casdoor's `origin` value (conf/app.conf) to `CASDOOR_HOSTNAME`.
![Casdoor conf](/img/integration/casdoor_origin.png)

### Step 2: Configure Casdoor application

1. Create a new Casdoor application or use an existing one.
2. Add a redirect URL: `http://APISIX_HOSTNAME/REDIRECTWHATYOUWANT`, and replace `REDIRECTWHATYOUWANT` with the desired redirect URL.
3. Select "JWT-Empty" for the Token format option.
4. Add the desired provider and configure other settings.

![Application Setting](/img/integration/lua/apisix/casdoor_jwtempty.png)
On the application settings page, you will find the `Client ID` and `Client Secret` values as shown in the picture above. We will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, where you will find the OIDC configuration of Casdoor.

### Step 3: Configure APISIX

APISIX has official [OIDC](https://apisix.apache.org/docs/apisix/plugins/openid-connect/) support, which is implemented using [lua-resty-openidc](https://github.com/zmartzone/lua-resty-openidc).

You can customize the settings according to the APISIX OIDC documentation. The following routing settings will be used:

```bash
# Use your own X-Api-Key
$ curl -X POST APISIX_HOSTNAME/apisix/admin/routes -H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" -d '{
  "uri": "/get",
  "name": "apisix_casdoor_test",
  "plugins": {
    "openid-connect": {
      "client_id": "Client ID",
      "client_secret": "Client Secret",
      "discovery": "http://CASDOOR_HOSTNAME/.well-known/openid-configuration",
      "introspection_endpoint_auth_method": "client_secret_basic",
      "logout_path": "/logout",
      "realm": "master",
      "redirect_uri": "http://APISIX_HOSTNAME/REDIRECTWHATYOUWANT",
      "bearer_only": false,
      "set_id_token_header": false,
      "access_token_in_authorization_header": true,
      "set_access_token_header": true,
      "set_userinfo_header": false,
      "realm": "master"
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}'
```

Now, visit `http://APISIX_HOSTNAME/get`, and the browser will redirect you to the Casdoor login page. After successfully logging in, you will see that a request has been sent to httpbin.org as shown in the screenshot below.
![APISIX_Result](/img/integration/lua/apisix/apisix_result.png)
