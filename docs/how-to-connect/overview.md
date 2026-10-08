---
title: Connect an application to Casdoor
sidebar_label: Overview
description: Choose how your application signs users in with Casdoor - OAuth 2.0 and OpenID Connect, SAML, or CAS - and whether to use an OIDC library, a Casdoor SDK, or a plugin.
keywords: [OAuth, OAuth 2.0, OIDC, SAML, CAS, integration]
authors: [nomeguy]
---

Your application signs users in with Casdoor through a standard protocol. This page helps you choose the protocol and the kind of client, and links to the guide for each choice.

## Choose a protocol

Casdoor is an identity provider (IdP) for the following protocols:

| Protocol | Use it when | Guide |
|---|---|---|
| OAuth 2.0 and OpenID Connect (OIDC) | You build a new application, or your application already supports OIDC. This is the recommended protocol | [OAuth 2.0](/docs/how-to-connect/oauth) |
| SAML 2.0 | Your application or a product that you bought supports only SAML | [SAML](/docs/how-to-connect/saml/overview) |
| CAS 1.0, 2.0, and 3.0 | You connect an existing application that supports only CAS | [CAS](/docs/how-to-connect/cas) |

Casdoor is also a service provider (SP): it lets users sign in with accounts from external identity providers over OAuth 2.0, OIDC, and SAML. See [Providers](/docs/provider/overview).

## OAuth 2.0 and OpenID Connect

[OAuth 2.0](https://oauth.net/2/) is an authorization framework. It lets an application get limited access to a user's account at a service, without seeing the user's password. [OpenID Connect](https://openid.net/connect/) adds an identity layer on top of OAuth 2.0: a standard way for the application to learn who the user is, and single sign-on (SSO) across applications.

The sign-in flow of Casdoor is the OAuth 2.0 authorization code flow, and Casdoor is a complete OIDC provider. Choose one of three kinds of client:

| Client | Use it when | Guide |
|---|---|---|
| Standard OIDC client library | Your language or framework has an OIDC library, or your application already uses another OIDC provider. Switching to Casdoor is then a change of the discovery URL and the credentials | [Standard OIDC client](/docs/how-to-connect/oidc-client) |
| Casdoor SDK | You also want to call the Casdoor API from your application, for example to manage users or upload files. The SDKs build on OIDC and add these functions | [Casdoor SDKs](/docs/how-to-connect/sdk) |
| Casdoor plugin or middleware | Your application runs on a platform that has one. This is the fastest way to add Casdoor to that platform | [Casdoor plugins](/docs/how-to-connect/plugin) |

Plugins and middleware include:

- [Jenkins plugin](/docs/integration/java/jenkins-plugin)
- [APISIX plugin](/docs/integration/lua/apisix#connect-casdoor-via-apisixs-casdoor-plugin)
- [Spring Boot starter](https://github.com/casdoor/casdoor-spring-boot-starter)
- [Quarkus extension](/docs/integration/java/quarkus)
- [Django middleware](https://github.com/casdoor/django-casdoor-auth)

## SAML

Security Assertion Markup Language (SAML) is an XML-based standard through which an IdP passes authentication and authorization information to an SP. It is common in enterprise SSO.

Casdoor is a SAML 2.0 IdP and supports the main features of SAML 2.0. See [SAML](/docs/how-to-connect/saml/overview). For an example, see [Add Casdoor as a SAML IdP in Keycloak](/docs/how-to-connect/saml/keycloak#add-the-saml-idp-in-keycloak).

SAML is a large protocol with many optional parts. For a new application, OAuth 2.0 and OIDC are simpler. Choose SAML when you have to connect a system that supports only SAML.

## CAS

The Central Authentication Service (CAS) is a web SSO protocol. Applications authenticate users through the CAS server and never handle passwords.

Casdoor supports CAS 1.0, 2.0, and 3.0. See [CAS](/docs/how-to-connect/cas).

CAS is lightweight but limited. The CAS client and the server establish trust through back-channel calls, not through cryptographic signatures. For a new application, prefer OAuth 2.0 and OIDC.

## Step-by-step guides for specific applications

To connect a specific product, such as GitLab, Grafana, or Jenkins, see [Integrations](/docs/category/integrations).

## See also

- [Core concepts](/docs/basic/core-concepts)
- [Single sign-on](/docs/session/single-sign-on)
- [Call the Casdoor API](/docs/basic/public-api)
