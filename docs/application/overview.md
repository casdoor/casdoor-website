---
title: Overview
description: Learn how applications work in Casdoor and how to configure authentication for your services.
keywords: [application, authentication, OAuth, OIDC]
authors: [sh1luo]
---

In Casdoor, each protected service is an **application**. Applications are independent: deploy, configure, or disable any one without affecting others.

To use Casdoor as the identity provider for your web apps, register each app as a Casdoor application. Users who sign in to an organization can then access all applications in that organization without signing in again.

Application configuration is flexible:

- Enable or disable password-based login and third-party login
- Configure which identity providers (e.g., Google, GitHub) users can use to sign in
- Customize sign-up fields and sign-in options per application

This section walks you through creating and configuring your first application.
