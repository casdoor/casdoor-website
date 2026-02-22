---
title: Casdoor as a CAS server
description: Use Casdoor as a Central Authentication Service (CAS) server for CAS 1.0, 2.0, and 3.0.
keywords: [CAS, server, SSO]
authors: [ComradeProgrammer]
---

## Overview

Casdoor can act as a **CAS server** and supports CAS 1.0, 2.0, and 3.0.

The CAS URL prefix is: `<casdoor-host>/cas/<organization>/<application>`. Example for `https://door.casdoor.com`, org `casbin`, app `cas-java-app`:

- `/login` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/login`
- `/logout` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/logout`
- `/serviceValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/serviceValidate`
- `/proxyValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/proxyValidate`
- `/proxy` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/proxy`
- `/validate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/validate`
- `/p3/serviceValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/p3/serviceValidate`
- `/p3/proxyValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/p3/proxyValidate`
- `/samlValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/samlValidate`

See the [CAS protocol specification](https://apereo.github.io/cas/7.1.x/protocol/CAS-Protocol-Specification.html) for parameters and versions.

### Example

The [Apereo CAS sample Java webapp](https://github.com/apereo/cas-sample-java-webapp) and [Java CAS client](https://github.com/apereo/java-cas-client) work with Casdoor. Point the client at your Casdoor CAS base URL.

The CAS configuration is located in `src/main/webapp/WEB-INF/web.yml`.

By default, this app uses CAS 3.0, which is specified by the following configurations:

```xml
<filter-name>CAS Validation Filter</filter-name>
<filter-class>org.jasig.cas.client.validation.Cas30ProxyReceivingTicketValidationFilter</filter-class>
```

If you want to protect this web app using CAS 2.0, change the CAS Validation Filter to the following:

```xml
<filter-name>CAS Validation Filter</filter-name>
<filter-class>org.jasig.cas.client.validation.Cas20ProxyReceivingTicketValidationFilter</filter-class>
```

For CAS 1.0, use the following:

```xml
<filter-name>CAS Validation Filter</filter-name>
<filter-class>org.jasig.cas.client.validation.Cas10TicketValidationFilter</filter-class>
```

For all instances of the `casServerUrlPrefix` parameter, change them to:

```xml
<param-name>casServerUrlPrefix</param-name>
<param-value>http://door.casdoor.com/cas/casbin/cas-java-app</param-value>
```

For all instances of the `casServerLoginUrl` parameter, change them to:

```xml
<param-name>casServerLoginUrl</param-name>
<param-value>http://door.casdoor.com/cas/casbin/cas-java-app/login</param-value>
```

If you need to customize more configurations, see the [Java CAS client GitHub Repository](https://github.com/apereo/java-cas-client) for detailed information.
