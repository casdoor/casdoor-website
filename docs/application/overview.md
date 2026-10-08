---
title: Applications
sidebar_label: Overview
description: An application represents one service that signs users in with Casdoor. This page explains what you configure on an application and how to update one through the API.
keywords: [application, authentication, OAuth, OIDC]
authors: [sh1luo]
---

In Casdoor, each service that signs users in is an application. To use Casdoor as the identity provider of a web application, you register the application in Casdoor. Applications are independent of one another: you can add, change, or turn off one without affecting the others.

An application belongs to one organization. Users who have signed in to the organization can open all of its applications without signing in again.

## What you configure on an application

- **Sign-in methods**: Whether users sign in with a password, a verification code, WebAuthn, or other methods. See [Sign-in methods](/docs/application/signin-methods).
- **Providers**: Which external identity providers, such as Google and GitHub, users can sign in with, and which email, SMS, and storage providers the application uses. See [Add providers to an application](/docs/application/providers).
- **Sign-up and sign-in pages**: The fields of the sign-up form, the elements of the sign-in page, and the look of both. See [Sign-up items](/docs/application/signup-items-table), [Sign-in items](/docs/application/signin-items-table), and [UI customization](/docs/application/ui-customization).
- **Protocol settings**: The client ID and client secret, the redirect URLs, the grant types, the token format, and the SAML settings. See the [Application settings reference](/docs/application/terminology).

To create your first application, see [Application configuration](/docs/application/config).

## Update an application through the API {#partial-updates-with-the-columns-parameter}

The `/api/update-application` endpoint replaces the complete application object by default. To write only some fields and leave all others unchanged, name the fields in the optional `columns` query parameter.

You can write the field names in camelCase or in snake_case. For example, the following two values are equivalent:

```text
columns=displayName,logo
columns=display_name,logo
```

## See also

- [Core concepts](/docs/basic/core-concepts#application)
- [Application settings reference](/docs/application/terminology)
- [Connect an application to Casdoor](/docs/how-to-connect/overview)
