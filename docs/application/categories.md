---
title: Application Categories
description: Understanding application categories and types in Casdoor
keywords: [application, category, type, agent, MCP, A2A]
authors: [copilot]
---

Casdoor supports different application categories to handle both traditional web applications and modern machine-to-machine scenarios. The category and type system helps organize applications and enables specialized features for different authentication patterns.

## Categories

### Default

Default applications are traditional web or mobile apps where users interact directly with the application through a browser or client interface. These applications typically handle user authentication and authorization flows.

When you create a Default application, you can select from several authentication protocol types:

- **All**: Support multiple authentication protocols
- **OIDC**: OpenID Connect authentication
- **OAuth**: OAuth 2.0 authentication
- **SAML**: SAML-based authentication
- **CAS**: Central Authentication Service protocol

Default applications work well for websites, mobile apps, and desktop applications that need user authentication.

### Agent

Agent applications represent machine-to-machine communication scenarios. These applications don't have traditional user interfaces and instead operate as services or tools that need programmatic access.

When selecting the Agent category, you can choose between these types:

- **MCP**: Model Context Protocol applications - designed for AI agents and tools that follow the MCP specification
- **A2A**: Application-to-Application communication for service-to-service authentication

Agent applications automatically receive specific defaults optimized for programmatic access. For example, when registering a client through OAuth Dynamic Client Registration, Casdoor assigns the Agent category with MCP type by default.

## Changing Categories

The application category can be set when creating an application or changed later from the application edit page. When you change the category from Default to Agent (or vice versa), the Type field updates automatically to match the new category:

- Switching to Agent sets Type to "MCP"
- Switching to Default sets Type to "All"

This automatic behavior ensures your application configuration stays consistent.

## Scopes for Agent Applications

Agent applications have access to a custom scopes feature. While Default applications use standard OAuth/OIDC scopes, Agent applications can define their own scopes to represent specific permissions or capabilities they expose.

For more details about configuring custom scopes, see the [Custom Scopes](./scopes.md) documentation.
