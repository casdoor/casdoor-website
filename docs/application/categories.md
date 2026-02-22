---
title: Application categories
description: Default (user-facing) vs Agent (M2M) applications and their types.
keywords: [application, category, type, agent, MCP, A2A]
authors: [copilot]
---

Casdoor uses **categories** and **types** to support both user-facing apps and machine-to-machine (M2M) apps. The category determines which protocol types and features are available.

## Categories

### Default

**Default** applications are for web or mobile apps where users sign in in a browser or client. Choose a protocol type:

- **All** — Multiple protocols
- **OIDC**, **OAuth**, **SAML**, **CAS** — Single protocol

### Agent

**Agent** applications are for M2M: services or tools that authenticate programmatically, without a user UI. Types:

- **MCP** — Model Context Protocol (e.g. AI agents and MCP tools)
- **A2A** — Application-to-application (service-to-service)

When a client registers via OAuth Dynamic Client Registration, Casdoor can assign the Agent category and MCP type by default.

## Changing category

Set or change the category on the application edit page. When you switch category, **Type** is updated automatically: Agent → **MCP**, Default → **All**.

## Custom scopes (Agent only)

Agent applications can define [custom scopes](./scopes.md). Default applications use only standard OAuth/OIDC scopes.
