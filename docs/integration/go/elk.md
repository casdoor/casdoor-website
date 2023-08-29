---
title: ELK
description: Overview of casdoor/elk-auth-casdoor
keywords: [ELK]
authors: [ComradeProgrammer]
---

## Overview of casdoor/elk-auth-casdoor

One of the biggest drawbacks of ELK (Elasticsearch, Logstash, and Kibana) is that originally these products had no authentication mechanism. As a result, anyone with the URL of Kibana or Elasticsearch could access the Kibana dashboard. Later on, ELK integrated an embedded authentication system called "Xpack." However, its advanced functions (such as OAuth, OIDC, LDAP, SAML) are not free. Only plain authentication, using a set of accounts and passwords, is available free of charge, which is quite inconvenient. This approach does not allow us to provide a unique account for everyone in a corporation.

To address this issue, we have developed an elk authentication solution based on Casdoor. This solution is free, open-source, under ongoing maintenance, and supports a wide range of advanced features. Casdoor is a centralized authentication/Single-Sign-On platform based on OAuth 2.0/OIDC. Casdoor/elk-auth-casdoor serves as a reverse proxy designed to intercept all HTTP data flow towards the ELK/Kibana stack. It guides users who haven't logged in to log in. This reverse proxy operates transparently as long as the user has logged in.

If a user hasn't been correctly authenticated, the request will be temporarily cached, and the user will be redirected to the Casdoor login page. Once the user logs in through Casdoor, the cached request will be restored and sent to Kibana. Therefore, if a POST request (or any other request type besides GET) is intercepted, the user won't need to refill the form and resend the request. The reverse proxy will remember it for you.

The casdoor/elk-auth-casdoor repository is located at <https://github.com/casdoor/elk-auth-casdoor>.

## How to run it?

0. Ensure that you have the Go programming language environment installed.

1. Go to [casdoor/elk-auth-casdoor](https://github.com/casdoor/elk-auth-casdoor) and fetch the code.

2. Register your proxy as an app with Casdoor.

3. Modify the configuration.

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

4. Visit <http://localhost:8080> (in the above example) and log in following the redirection guidance. You should then see Kibana protected and authenticated by Casdoor.

5. If everything works well, don't forget to block external access to the original Kibana port by configuring your firewall (or another method). This ensures that outsiders can only access Kibana via this reverse proxy.
