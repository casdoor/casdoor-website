---
title: Overview
description: Connect your app to Casdoor
keywords: [OAuth, OAuth2.0, OIDC, SAML, CAS]
authors: [nomeguy]
---

In this section, we will show how to connect your application to Casdoor.

As Service Provider (SP), Casdoor supports two authentication protocols:

- `OAuth 2.0 (OIDC)`
- `SAML`

As Identity Provider (IdP), Casdoor supports 4 authentication protocols:

- `OAuth 2.0`
- `OIDC`
- `SAML`
- `CAS 1.0, 2.0, 3.0`

## OAuth 2.0 (OIDC)

<details>

<summary>What is OAuth 2.0?</summary>

[OAuth 2](https://oauth.net/2/) is an authorization framework that enables applications — such as Facebook, GitHub, and Casdoor — to obtain
limited access to user accounts on an HTTP service. It works by delegating user authentication to the service that hosts
a user account and authorizing third-party applications to access that user account. OAuth 2 provides authorization flows
for web and desktop applications, as well as mobile devices.

</details>

Casdoor's authorization process is built upon the OAuth 2.0 protocol. We recommend using the OAuth 2.0 protocol:

1. The protocol is simple and easy to implement, and can solve many scenarios.
2. High maturity and extensive community support

Therefore, your application will talk to Casdoor via OAuth 2.0 (OIDC). Specifically, there are three ways for connecting to Casdoor:

### Standard OIDC client

**[Standard OIDC client](/docs/how-to-connect/oidc-client)**: use a standard OIDC client implementation, which is usually widely provided in any programming language or framework.

<details>

<summary>What is OIDC?</summary>

[OpenID Connect (OIDC)](https://openid.net/connect/) is an open authentication protocol that works on top of the OAuth 2.0 framework. Targeted toward consumers, OIDC allows individuals to use single sign-on (SSO) to access relying party sites using OpenID Providers (OPs), such as an email provider or social network, to authenticate their identities. It provides the application or service with information about the user, the context of their authentication, and access to their profile information.

</details>

Casdoor has fulfilled the OIDC protocol completely. If your application is already running against another OAuth 2.0 (OIDC)
identity provider via a **standard OIDC client library**, and you want to migrate to Casdoor, using OIDC discovery will be very **easy** for you to switch to Casdoor.

### Casdoor SDKs

**[Casdoor SDKs](/docs/how-to-connect/sdk)**: For most programming languages, Casdoor will provide easy-to-use SDK library on top of OIDC, with supporting extended functionality which are only available in Casdoor.

Compared to the standard OIDC protocol, Casdoor provides more functionalities in its SDK, like user management, resource
uploading, etc. Connecting to Casdoor via Casdoor SDK costs more time than using a standard OIDC client library but will
provide the best **flexibility** and the most **powerful** API.

### Casdoor plugin

**[Casdoor plugin](/docs/how-to-connect/plugin)**: if your application is built on top of a popular platform (like Spring Boot, WordPress, etc.) and Casdoor (or a third-party) has already provided a plugin or middleware for it, then use it. It will be much easier to use a plugin than manually invoking Casdoor SDK because the former is specially made for the platform.

**plugin:**

- [Jenkins plugin](/docs/integration/java/jenkins%20plugin)
- [APISIX plugin](/docs/integration/lua/apisix#connect-casdoor-via-apisixs-casdoor-plugin)

**Middleware:**

- [Spring Boot plugin](https://github.com/casdoor/casdoor-spring-boot-starter)
- [Django plugin](https://github.com/casdoor/django-casdoor-auth)

## SAML

<details>

<summary>What is SAML?</summary>

Security Assertion Markup Language (SAML) is an open standard that allows identity providers (IdP) to pass authorization credentials to service providers (SP). What that jargon means is that you can use one set of credentials to log into many different websites. It’s much simpler to manage one login per user than it is to manage separate logins to email, customer relationship management (CRM) software, Active Directory, etc.

SAML transactions use Extensible Markup Language (XML) for standardized communications between the identity provider and service providers. SAML is the link between the authentication of a user’s identity and the authorization to use a service.

</details>

Casdoor can be used as **SAML IdP**. Up to now the Casdoor has supported the main features of **SAML 2.0**. More details see **[SAML](/docs/how-to-connect/saml/overview)**.

**Example:**

[Casdoor as a SAML IdP in keycloak](/docs/how-to-connect/saml/keycloak#casdoor-as-a-saml-idp-in-keycloak)

**Suggestion:**

1. The protocol is **powerful** and covers many scenarios, which can be said to be one of the most comprehensive SSO protocols.
2. The protocol is **too large**, and there are many optional parameters, so it is difficult to cover all application scenarios 100% in the actual implementation.
3. If the application is **newly** developed, SAML is **not** recommended because of its high technical complexity.

## CAS

<details>

<summary>What is CAS?</summary>

The Central Authentication Service (CAS) is a single sign-on protocol for the web. Its purpose is to permit a user to access multiple applications while providing their credentials (such as user ID and password) only once. It also allows web applications to authenticate users without gaining access to a user's security credentials, such as a password.

</details>

Casdoor has implemented CAS 1.0, 2.0, 3.0 features. More details see **[CAS](/docs/how-to-connect/cas)**.

**Suggestion:**

1. The protocol itself is relatively lightweight and easy to implement, but it can solve a single scenario.
2. The mutual trust between the CAS Client and the CAS Server is established through interface invocation without any encryption or signature mechanism to ensure further security.
3. CAS protocol has no advantage over other protocols.

## Integrations table

Some applications already have examples that connect to Casdoor. You can follow the documentation to quickly connect to Casdoor.
You can see all applications in [Integrations table](/docs/category/integrations).
