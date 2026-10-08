---
title: Connect a CAS client
sidebar_label: CAS
description: Use Casdoor as a Central Authentication Service (CAS) server for CAS 1.0, 2.0, and 3.0 clients.
keywords: [CAS, server, SSO]
authors: [ComradeProgrammer]
---

This guide explains how to connect an application that supports the Central Authentication Service (CAS) protocol to Casdoor. Casdoor is a CAS server for CAS 1.0, 2.0, and 3.0.

---

#### Learning outcomes

- Find the CAS endpoints of a Casdoor application.
- Point a CAS client at Casdoor.
- Choose the CAS version that the client uses.

#### What you need

- A running Casdoor instance and an [application](/docs/application/overview) in it
- An application with a CAS client. The example uses the [Java CAS client](https://github.com/apereo/java-cas-client).

#### Sample code

- [Apereo CAS sample Java web application](https://github.com/apereo/cas-sample-java-webapp)

---

## CAS endpoints

Each Casdoor application has its own CAS endpoints under the prefix:

```text
<casdoor-host>/cas/<organization>/<application>
```

For example, for the demo site `https://door.casdoor.com`, the organization `casbin`, and the application `cas-java-app`, the prefix is `https://door.casdoor.com/cas/casbin/cas-java-app`. Casdoor serves the following endpoints under the prefix:

| Endpoint | CAS version |
|---|---|
| `/login` | All |
| `/logout` | All |
| `/validate` | 1.0 |
| `/serviceValidate` | 2.0 |
| `/proxyValidate` | 2.0 |
| `/proxy` | 2.0 |
| `/p3/serviceValidate` | 3.0 |
| `/p3/proxyValidate` | 3.0 |
| `/samlValidate` | SAML 1.1 validation |

For the parameters of each endpoint, see the [CAS protocol specification](https://apereo.github.io/cas/7.1.x/protocol/CAS-Protocol-Specification.html).

## Configure the Java CAS client

The [Apereo CAS sample Java web application](https://github.com/apereo/cas-sample-java-webapp) works with Casdoor. Its CAS configuration is in `src/main/webapp/WEB-INF/web.xml`.

1. Change every `casServerUrlPrefix` parameter to the CAS prefix of your Casdoor application:

   ```xml
   <param-name>casServerUrlPrefix</param-name>
   <param-value>http://door.casdoor.com/cas/casbin/cas-java-app</param-value>
   ```

1. Change every `casServerLoginUrl` parameter to the `/login` endpoint:

   ```xml
   <param-name>casServerLoginUrl</param-name>
   <param-value>http://door.casdoor.com/cas/casbin/cas-java-app/login</param-value>
   ```

1. Choose the CAS version through the validation filter. By default, the sample uses CAS 3.0:

   ```xml
   <filter-name>CAS Validation Filter</filter-name>
   <filter-class>org.jasig.cas.client.validation.Cas30ProxyReceivingTicketValidationFilter</filter-class>
   ```

   For CAS 2.0, use:

   ```xml
   <filter-name>CAS Validation Filter</filter-name>
   <filter-class>org.jasig.cas.client.validation.Cas20ProxyReceivingTicketValidationFilter</filter-class>
   ```

   For CAS 1.0, use:

   ```xml
   <filter-name>CAS Validation Filter</filter-name>
   <filter-class>org.jasig.cas.client.validation.Cas10TicketValidationFilter</filter-class>
   ```

For the other settings of the client, see the [Java CAS client repository](https://github.com/apereo/java-cas-client).

## See also

- [Connect an application to Casdoor](/docs/how-to-connect/overview)
- [OAuth 2.0](/docs/how-to-connect/oauth)
