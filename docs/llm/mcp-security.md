---
title: MCP security
description: How Casdoor secures MCP deployments — OAuth 2.1 for access control and OpenTelemetry for audit and observability.
keywords: [MCP, security, OAuth 2.1, PKCE, DCR, scopes, observability, audit]
authors: [hsluoyz]
---

Deploying an MCP server exposes a tool-calling surface that AI clients can reach directly. Unlike a traditional API consumed by humans, MCP servers are called autonomously by agents that may hold broad permissions. Two concerns matter most: **who can call which tools**, and **what did they actually do**.

Casdoor addresses both. It acts as the OAuth 2.1 authorization server that gates access, and as the telemetry backend that records what happened.

## Access control

MCP uses OAuth 2.1 with a clean separation between the authorization server and the resource server. The MCP server (your tool host) delegates authentication entirely to an external provider — it never manages users or issues tokens. Casdoor fills that role.

### How the flow works

When an MCP client connects to a server for the first time:

1. The server returns `401 Unauthorized` with a `WWW-Authenticate` header pointing to its Protected Resource Metadata endpoint.
2. The client fetches `/.well-known/oauth-protected-resource` to discover which authorization server protects the resource.
3. The client registers itself with Casdoor via Dynamic Client Registration (RFC 7591) if it doesn't have credentials yet.
4. The client completes an authorization code + PKCE flow against Casdoor, obtaining an access token with the scopes the user consented to.
5. Subsequent requests carry `Authorization: Bearer <token>`. The MCP server validates the JWT against Casdoor's JWKS endpoint before executing any tool.

The MCP server's implementation burden is minimal: serve the metadata document, return 401 challenges, validate JWTs, and enforce scopes per tool.

### Scope-based tool authorization

Each tool in an MCP server should require a specific scope. Casdoor lets you define custom scopes per application and presents them on a consent screen so users know exactly what they're granting.

A minimal scope design for a data access server might look like:

| Scope | Grants access to |
|-------|-----------------|
| `data:read` | read-only query tools |
| `data:write` | mutation tools |
| `admin` | schema and configuration tools |

Tokens that don't include a required scope receive a `403` from the tool handler — not a broad authentication failure, but a targeted authorization denial with the missing scope named in the error.

This means an automation that only needs `data:read` can be issued a token without `data:write`, limiting the blast radius if the token is compromised.

### What Casdoor provides out of the box

| Requirement | Casdoor implementation |
|-------------|----------------------|
| OAuth 2.1 authorization server | `/login/oauth` endpoints |
| Dynamic Client Registration | RFC 7591 at `/api/oauth/register` |
| PKCE | Enforced on all authorization code flows |
| Resource Indicators (audience-restricted tokens) | RFC 8707 |
| JWKS for token validation | `/.well-known/jwks` |
| Consent screen | Configurable per application (always / once / never) |
| Custom scopes | Defined per application with display names and descriptions |
| Multi-tenancy | Organization-scoped applications and users |

For a step-by-step walkthrough, see [MCP auth setup](/docs/mcp-auth/setup) and the [integration examples](/docs/mcp-auth/third-party-integration).

## Audit and observability

Authorization controls tell you what *should* happen. Observability tells you what *did* happen.

### Permission audit log

Enable a [Casdoor Permission Log provider](/docs/provider/log/overview#casdoor-permission-log) on your organization. Casdoor then records every non-GET API call as a permission entry:

```text
[info]    sub=org/user  method=POST  url=/api/update-application  allowed=true
[warning] sub=org/user  method=DELETE  url=/api/delete-user  allowed=false
```

These entries appear under **Entries** in the sidebar, scoped to the organization. Denied requests show as warnings, which makes policy violations easy to spot.

### Agent traces with OpenClaw

For deeper visibility into what your AI agents are doing at runtime, deploy [OpenClaw](/docs/llm/openclaw) alongside your application. OpenClaw instruments LLM calls, tool invocations, and agent-to-agent traffic, and ships the traces to Casdoor over OTLP. The trace viewer in Casdoor renders them as a span tree with timing and attributes.

Together, the permission log covers authorization decisions at the Casdoor API layer, while OpenClaw traces cover the agent's internal behavior and external tool calls.

## Threat model considerations

A few things worth keeping in mind when deploying MCP servers:

**Scope creep**: AI clients sometimes request broad scopes by default. Define your scopes narrowly and use "consent always" for tools that perform writes or deletions. Users should be aware of what they're authorizing.

**Token lifetime**: MCP clients typically cache tokens until expiry. Keep access token lifetimes short (15–60 minutes) and issue refresh tokens for longer-running agents. This limits the window if a token leaks.

**Client registration**: Dynamic Client Registration is convenient but means anyone who can reach your Casdoor instance can register an OAuth client. If your MCP server is internal, consider disabling DCR and pre-registering clients manually.

**Audience validation**: Always verify the `aud` claim on incoming tokens. A valid Casdoor token issued for a different resource should be rejected by your MCP server.

## Further reading

- [MCP auth setup](/docs/mcp-auth/setup) — configure Casdoor and your MCP server end-to-end
- [Third-party MCP integration](/docs/mcp-auth/third-party-integration) — working code for Python, Node.js, and Go
- [Casdoor's own MCP server](/docs/how-to-connect/mcp/overview) — use Casdoor's built-in MCP tools
- [OpenClaw](/docs/llm/openclaw) — collect agent traces and logs in Casdoor
- [Log providers](/docs/provider/log/overview) — permission log and OpenClaw provider reference
