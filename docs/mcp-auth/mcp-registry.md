---
title: Public MCP server registry
description: The public MCP server registry at mcp.casdoor.org lists MCP servers with a web interface and a JSON API. This page explains how to use it and how to add a server.
keywords: [MCP, registry, MCP servers, public MCP, mcp.casdoor.org]
authors: [hsluoyz]
---

The [public MCP server registry](https://mcp.casdoor.org) is a curated list of publicly available MCP servers. It covers more than 60 servers in nine categories and offers a searchable website and a JSON API.

| Resource | URL |
|---|---|
| Website | [https://mcp.casdoor.org](https://mcp.casdoor.org) |
| JSON API | [https://mcp.casdoor.org/registry.json](https://mcp.casdoor.org/registry.json) |
| Source | [casdoor/public-mcp-server-registry](https://github.com/casdoor/public-mcp-server-registry) |

The **MCP Store** page of the Casdoor admin console shows the same list. See [Add a server from the MCP Store](/docs/how-to-connect/mcp/overview#mcp-store).

## Browse the registry {#browsing-the-registry}

On [mcp.casdoor.org](https://mcp.casdoor.org), search by name, description, or category, or filter by category with the tabs, such as AI & ML, Cloud, and Communication. Each card shows the name, a short description, the endpoint URL, and a link to the website of the server.

## Use the JSON API {#using-the-json-api}

The registry is a JSON array at `/registry.json`:

```bash
curl https://mcp.casdoor.org/registry.json
```

Each entry has the following form:

```json
{
  "id": "stripe",
  "name": "Stripe",
  "description": "Process payments, manage subscriptions, and handle billing through Stripe",
  "category": "payments",
  "website": "https://stripe.com",
  "endpoint": "wss://mcp.stripe.com/v1"
}
```

| Field | Description |
|---|---|
| `id` | Unique identifier (lowercase, hyphenated) |
| `name` | Display name |
| `description` | One-sentence description of what the server exposes |
| `category` | One of: `ai-ml`, `cloud`, `communication`, `data-analysis`, `database`, `development`, `monitoring`, `payments`, `productivity` |
| `website` | Homepage or docs URL |
| `endpoint` | MCP endpoint URL (`https://` for HTTP/SSE, `wss://` for WebSocket) |

## Add a server {#adding-a-server}

1. Fork [casdoor/public-mcp-server-registry](https://github.com/casdoor/public-mcp-server-registry).
1. Add an entry to `registry.json` with the fields above. Keep the description to one sentence, and pick the closest category.
1. Open a pull request. The website redeploys when the pull request is merged.

If none of the nine categories fits, say so in the pull request.

## Connect a listed server {#connecting-a-listed-server}

Most servers in the registry require their own credentials, such as API keys or OAuth tokens. See the website of the server. For servers that use Casdoor as their authorization server, see [Use Casdoor as the authorization server of an MCP server](/docs/mcp-auth/overview).

To use a server in Claude Desktop, add it to the configuration file:

```json
{
  "mcpServers": {
    "stripe": {
      "url": "wss://mcp.stripe.com/v1",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}
```

For more on connecting clients, see [Connect Claude Desktop to the Casdoor MCP server](/docs/how-to-connect/mcp/connect-claude-desktop).

## See also

- [MCP server overview](/docs/how-to-connect/mcp/overview)
