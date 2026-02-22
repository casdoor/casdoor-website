---
title: ELK
description: Overview of casdoor/elk-auth-casdoor
keywords: [ELK]
authors: [ComradeProgrammer]
---

## Overview

ELK (Elasticsearch, Logstash, Kibana) originally had no built-in auth; Kibana was open to anyone with the URL. X-Pack adds auth but advanced features (OAuth, OIDC, LDAP, SAML) are paid. [casdoor/elk-auth-casdoor](https://github.com/casdoor/elk-auth-casdoor) is a free, open-source reverse proxy that puts Casdoor (OAuth 2.0/OIDC) in front of the ELK/Kibana stack. Unauthenticated users are redirected to Casdoor; after sign-in, requests are forwarded to Kibana. Intercepted requests (including POST) are cached and replayed after login so users do not lose form data.

## How to run

0. Install [Go](https://go.dev/).

1. Clone [casdoor/elk-auth-casdoor](https://github.com/casdoor/elk-auth-casdoor).

2. In Casdoor, register the proxy as an application and note Client ID, Client Secret, application name, and organization.

3. Edit the configuration.

    The configuration file is located at "conf/app.conf". Here is an example, which you should customize based on your specific needs.

    ```ini
    appname = .
    # port on which the reverse proxy shall be run
    httpport = 8080
    runmode = dev
    # EDIT IT IF NECESSARY. The URL of this reverse proxy.
    pluginEndpoint = "http://localhost:8080"
    # EDIT IT IF NECESSARY. The URL of the Kibana.
    targetEndpoint = "http://localhost:5601"
    # EDIT IT. The URL of Casdoor.
    casdoorEndpoint = "http://localhost:8000"
    # EDIT IT. The clientID of your reverse proxy in Casdoor.
    clientID = ceb6eb261ab20174548d
    # EDIT IT. The clientSecret of your reverse proxy in Casdoor.
    clientSecret = af928f0ef1abc1b1195ca58e0e609e9001e134f4
    # EDIT IT. The application name of your reverse proxy in Casdoor.
    appName = ELKProxy
    # EDIT IT. The organization to which your reverse proxy belongs in Casdoor.
    organization = built-in
    ```

4. Visit `http://localhost:8080` (in the above example) and log in following the redirection guidance. You should then see Kibana protected and authenticated by Casdoor.

5. If everything works well, don't forget to block external access to the original Kibana port by configuring your firewall (or another method). This ensures that outsiders can only access Kibana via this reverse proxy.
