---
title: ELK
description: Overview of casdoor/elk-auth-casdoor
keywords: [ELK]
authors: [ComradeProgrammer]
---

## Overview of casdoor/elk-auth-casdoor
One of the biggest drawbacks of ELK (Elasticsearch, Logstash and Kibana) is that originally, these products have no authentication mechanism, so that everyone can visit the kibana dashboard as long as he has the url of kibana, or ES urls. Later ELK integrated an embedded authentication system "Xpack", whose all advanced functions  **are not free** (eg. Oauth, OIDC, LDAP, SAML), and only plain authentication (setting a set of accounts and passwords) is free of charge, which is quite inconvenient. We cannot just provide a unique account for everyone in a corporation.


Therefore, we have developed a elk authentication solution based on Casdoor, **free of charge, open source and under maintenance, supporting lots of advanced features**. Casdoor is a centralized authentication/ Single-Sign-On platform based on Oauth2.0/OIDC, and casdoor/elk-auth-casdoor is actually a reverse proxy, which is designed to intercept all http data flow toward the elk/kibana, and guides the users who haven't logged in to log in. This reverse proxy is completely transparent as long as the user has logged in.

If this user hasn't been correctly authenticated, the request will be temporally  cached, and the user will be redirected to Casdoor login page. After user logs in through casdoor, the cached request will be restored and sent to kibana. So it's ok if a POST request (or something other than GET) is intercepted, and user won't need to refill the form and resend the request. The reverse proxy will remember it for you.

Location of casdoor/elk-auth-casdoor repository <https://github.com/casdoor/elk-auth-casdoor>

## How to run it?

0. have golang environment installed

1. go to [casdoor/elk-auth-casdoor](https://github.com/casdoor/elk-auth-casdoor) and fetch the code

2. register your proxy as an app of Casdoor.

3. modify the configuration

The configuration file locates in "conf/app.conf". Here is an example, and you should customize changes according to your real demands.

```ini
appname = .
# port on which the reverse proxy shall be run
httpport = 8080
runmode = dev
#EDIT IT IF NECESSARY. The url of this reverse proxy
pluginEndpoint="http://localhost:8080"
#EDIT IT IF NECESSARY. The url of the kibana 
targetEndpoint="http://localhost:5601"
#EDIT IT. The url of casdoor 
casdoorEndpoint="http://localhost:8000"
#EDIT IT. The clientID of your reverse proxy in casdoor  
clientID=ceb6eb261ab20174548d
#EDIT IT. The clientSecret of your reverse proxy in casdoor 
clientSecret=af928f0ef1abc1b1195ca58e0e609e9001e134f4
#EDIT IT. The application name of your reverse proxy in casdoor 
appName=ELKProxy
#EDIT IT. The organization to which your reverse proxy belongs in casdoor
organization=built-in
```

4. visit <http://localhost:8080> (in the example above), and log in following the guidance of redirection, and you shall see kibana protected and authenticated by casdoor.

5. If everything works well, don't forget to block the visits of original kibana's port coming from outside by configurating your firewall(or something else), so that outsiders can only visit kibana via this reverse proxy.