---
title: CAS
description: Using Casdoor as CAS server
keywords: [CAS, server]
---

## Using Casdoor as CAS server

Casdoor now can be used as CAS server. Up to now the casdoor have supported the feature of CAS3.0 .

### Overview

The prefix of CAS endpoint in Casdoor is `<Endpoint of casdoor>/cas/<organization name>/<application name>`,which means:

Suppose the endpoint of Casdoor is `https://door.casdoor.com`, which contains an application called `cas-java-app` which belongs to an organization called `casbin`, and if we are trying to let user to login in via CAS, then
- `/login` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/login`
- `/logout` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/logout`
- `/serviceValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/serviceValidate`
- `/proxyValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/proxyValidate`
- `/proxy` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/proxy`
- `/validate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/validate`
- `/p3/serviceValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/p3/serviceValidate`
- `/p3/proxyValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/p3/proxyValidate`
- `/samlValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/samlValidate`

See <https://apereo.github.io/cas/6.0.x/protocol/CAS-Protocol-Specification.html> for more information about CAS and its different versions, as well as parameters for these endpoints.

### An example

Here is an offical example <https://github.com/apereo/cas-sample-java-webapp>, which contains an example web app utlizing the offical CAS java client <https://github.com/apereo/java-cas-client>. By going through this example we will illustarte how to connect to Casdoor via CAS.


:::note

Note: Currently Casdoor only support all three versions of CAS: CAS 1.0 & 2.0 & CAS 3.0 .

:::

The cas configuration is located in `src/main/webapp/WEB-INF/web.yml`.

By default, this app use CAS 3.0, which is specified by the following configurations.
```xml
<filter-name>CAS Validation Filter</filter-name>
<filter-class>org.jasig.cas.client.validation.Cas30ProxyReceivingTicketValidationFilter</filter-class>
```


Suppose you want to protect this web app via CAS 2.0, you are supposed to change CAS Validation Filter to the following content.
```xml
<filter-name>CAS Validation Filter</filter-name>
<filter-class>org.jasig.cas.client.validation.Cas20ProxyReceivingTicketValidationFilter</filter-class>
```


If you want to use CAS 1.0, use
```xml
<filter-name>CAS Validation Filter</filter-name>
<filter-class>org.jasig.cas.client.validation.Cas10TicketValidationFilter</filter-class>
```

For all the apperances of parameter 'casServerUrlPrefix', change them to
```xml

<param-name>casServerUrlPrefix</param-name>
<param-value>http://door.casdoor.com/cas/casbin/cas-java-app</param-value>

```

For all the apperances of parameter 'casServerLoginUrl' change them to
```xml
<param-name>casServerLoginUrl</param-name>
<param-value>http://door.casdoor.com/cas/casbin/cas-java-app/login</param-value>
```

If you need to customize more configurations, see <https://github.com/apereo/java-cas-client> for detailed information. 

:::note

Actually we have already have this demo app run on <https://cas-java-app.casdoor.com>. You can visit here to experience using Casdoor via CAS.

:::