---
title: Overview
---

In this section, we will show how to connect your application to Casdoor. 

As Service Provider (SP), Casdoor supports two authentication protocols:

- `OAuth 2.0 (OIDC)`
- `SAML`

As Identity Provider (IdP), Casdoor supports one authentication protocol:

- `OAuth 2.0`
- `OIDC`
- `SAML`
- `CAS 1.0, 2.0, 3.0`

Therefore, your application will talk to Casdoor via OAuth 2.0 (OIDC). Specifically, there are three ways for connecting to Casdoor:

1. **[Standard OIDC client](/docs/how-to-connect/oidc-client)**: use a standard OIDC client implementation, which is usually widely provided in any programming language or framework.
2. **[Casdoor SDK](/docs/how-to-connect/sdk)**: For most programming languages, Casdoor will provide easy-to-use SDK library on top of OIDC, with supporting extended functionality which are only available in Casdoor.
3. **[Casdoor plugin](/docs/how-to-connect/plugin)**: if your application is built on top of a popular platform (like Spring Boot, WordPress, etc.) and Casdoor (or a third-party) has already provided a plugin or middleware for it, then use it. It will be much easier to use a plugin than manually invoking Casdoor SDK because the former is specially made for the platform.
4. **[CAS](/docs/how-to-connect/cas)**: Casdoor have implemented CAS 2.0 features.  