---
title: SAML providers
sidebar_label: Overview
description: Let users sign in to Casdoor with an external SAML 2.0 identity provider, with Casdoor as the service provider.
keywords: [SAML, Keycloak, Alibaba Cloud IDaaS]
authors: [seriouszyx]
---

A SAML provider lets users sign in to Casdoor with an external SAML 2.0 identity provider (IdP), such as Keycloak, Azure AD, or Google Workspace. Casdoor is the service provider (SP). The IdP authenticates the user, and Casdoor never sees the credentials.

For the opposite direction, with Casdoor as the IdP of other applications, see [Use Casdoor as a SAML identity provider](/docs/how-to-connect/saml/overview).

## Terms

| Term | Meaning |
|---|---|
| Identity provider (IdP) | The service that holds the identities and authenticates users, such as Keycloak or Azure AD |
| Service provider (SP) | The application that relies on the IdP. Here, Casdoor |
| Assertion Consumer Service (ACS) | The endpoint of the SP that receives the SAML assertions of the IdP |

## How the sign-in works {#how-saml-integration-works}

![SAML sign-in between the user, Casdoor, and the IdP](/img/providers/SAML/SAML.png)

## Supported types

| Type | IdP |
|---|---|
| `Aliyun IDaaS` | Alibaba Cloud IDaaS. See [Alibaba Cloud IDaaS](/docs/provider/saml/aliyun) |
| `Keycloak` | Keycloak. See [Keycloak](/docs/provider/saml/keycloak) |
| `Custom` | Any SAML 2.0 IdP. See [Custom SAML](/docs/provider/saml/custom), [Azure AD](/docs/provider/saml/azure-ad), and [Google Workspace](/docs/provider/saml/google-workspace) |

| Alibaba Cloud IDaaS | Keycloak | Custom |
| :----------: | :------: | :-----: |
| <img src="https://cdn.casbin.org/img/social_aliyun.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_keycloak.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_custom.png" width="40"></img> |
|      ✅      |    ✅    |    ✅    |

## Values for the IdP {#configuring-the-external-idp-casdoor-as-sp}

When you register Casdoor at the IdP, use the following values. Replace `<your-casdoor-domain>` with the domain of Casdoor, for example `door.example.com`.

| Setting at the IdP | Value |
|---|---|
| ACS URL | `https://<your-casdoor-domain>/api/acs` |
| SP entity ID | The same URL: `https://<your-casdoor-domain>/api/acs` |
| Binding | HTTP POST. The `/api/acs` endpoint accepts only `POST` requests |

## Usernames {#user-attribute-mapping}

Casdoor reads the user from the attributes of the SAML assertion, according to the attribute mapping of the provider. If the assertion has no username, Casdoor uses, in this order:

1. The email address in the assertion
1. The NameID of the assertion

Sign-in therefore works with IdPs that don't send a separate username attribute by default, such as Azure AD.

## The SAML button on the sign-in page {#login-behavior}

Casdoor always shows a button for each SAML provider on the sign-in page, even if it is the only sign-in method. Unlike an OAuth provider, a SAML provider never redirects the user automatically. Users choose SAML explicitly, which avoids unexpected redirects where SAML is one option among several.

## See also

- [Custom SAML](/docs/provider/saml/custom)
- [Providers](/docs/provider/overview)
