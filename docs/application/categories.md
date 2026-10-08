---
title: Application categories
description: The category of an application - Default for applications that users sign in to, Agent for machine clients - and the types that each category offers.
keywords: [application, category, type, agent, MCP, A2A]
authors: [hsluoyz]
---

Every application has a category and a type. The category says who uses the application, a person or a machine, and determines which types and features are available.

## Categories and types {#categories}

| Category | For | Types |
|---|---|---|
| `Default` | Web and mobile applications that users sign in to, in a browser or a client | `All` for several protocols, or one protocol: `OIDC`, `OAuth`, `SAML`, `CAS` |
| `Agent` | Machine-to-machine clients: services and tools that authenticate from code, without a UI for the user | `MCP` for Model Context Protocol clients and servers, such as AI agents and their tools. `A2A` for application-to-application calls between services |

Only applications of the category `Agent` can define [custom scopes](/docs/application/scopes). Applications of the category `Default` use the standard OAuth 2.0 and OpenID Connect (OIDC) scopes.

An application that a client creates through [dynamic client registration](/docs/application/dynamic-client-registration) can get the category `Agent` and the type `MCP` by default.

## Change the category {#changing-category}

1. In the Casdoor admin console, open the edit page of the application.
1. On the **Basic** tab, select the **Category**. Casdoor sets **Type** to `MCP` when you select `Agent`, and to `All` when you select `Default`.
1. Select another **Type** if you need one, and save the application.

## See also

- [Custom scopes](/docs/application/scopes)
- [Application settings reference](/docs/application/terminology)
- [MCP server overview](/docs/how-to-connect/mcp/overview)
