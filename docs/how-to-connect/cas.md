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
- Allow the services of the client in the application.
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

## Configure the application

Casdoor issues tickets only for services that the application allows.

1. In the Casdoor admin console, open the application and go to the **OIDC/OAuth** tab.
1. Add the URL of each CAS service, the `service` parameter that the CAS client sends, to **Redirect URLs**. If the client uses proxy authentication, also add its proxy callback URL (`pgtUrl`) and the URLs of the target services of `/proxy`.
1. Click **Save**.

Casdoor matches `service` against **Redirect URLs** in the same way as an OAuth redirect URL. An empty list allows no service, and script URLs, such as `javascript:` URLs, are always refused. A sign-in with a service that isn't allowed fails with `Redirect URI: <service> doesn't exist in the allowed Redirect URI list`.

## Ticket validation

When the CAS client validates a ticket, Casdoor applies these rules:

- The `service` of the validation request must be exactly the service for which Casdoor issued the ticket, or its URL-encoded form. A service that only starts with the issued service doesn't match.
- Service tickets and proxy tickets work once, and expire 5 minutes after Casdoor issues them. A used or expired ticket fails with `INVALID_TICKET`, or with `no` at `/validate`.
- `/serviceValidate` and `/p3/serviceValidate` accept only service tickets, which start with `ST`. `/proxyValidate` and `/p3/proxyValidate` accept service tickets and proxy tickets.
- `pgtUrl` must be an `https` URL that is in **Redirect URLs**. Otherwise, the validation fails with `INVALID_PROXY_CALLBACK`. Casdoor calls the callback with a timeout of 10 seconds and doesn't follow redirects. For applications outside the `built-in` organization, the callback must be an Internet address, not a private or loopback address.
- `/proxy` issues a proxy ticket only for a `targetService` that is in **Redirect URLs**. Otherwise, it answers `UNAUTHORIZED_SERVICE`.

:::caution
Casdoor keeps tickets in memory. If you run several replicas of Casdoor, route the validation request to the replica that issued the ticket, for example with sticky sessions, or the validation fails.
:::

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
