---
title: Public MCP Server Registry
description: A curated registry of publicly available MCP servers, with a web UI and machine-readable JSON API.
keywords: [MCP, registry, MCP servers, public MCP, mcp.casdoor.org]
authors: [hsluoyz]
---

The [Public MCP Server Registry](https://mcp.casdoor.org) is a curated list of publicly available MCP servers. It covers 60+ servers across nine categories and provides both a searchable web interface and a machine-readable JSON API at `/registry.json`.

**Website:** [https://mcp.casdoor.org](https://mcp.casdoor.org)
**Registry API:** [https://mcp.casdoor.org/registry.json](https://mcp.casdoor.org/registry.json)
**Source:** [github.com/casdoor/public-mcp-server-registry](https://github.com/casdoor/public-mcp-server-registry)

## Browsing the registry

Open [mcp.casdoor.org](https://mcp.casdoor.org) in a browser. You can:

- **Search** by name, description, or category using the search bar.
- **Filter** by category using the tab buttons (AI & ML, Cloud, Communication, etc.).

Each card shows the server's name, a short description, its endpoint URL, and a link to its website.

## Using the JSON API

The registry is also served as a JSON array at `/registry.json`, which you can consume programmatically:

```bash
curl https://mcp.casdoor.org/registry.json
```

Each entry has this shape:

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

## Adding a server

To list your MCP server in the registry:

1. Fork [casdoor/public-mcp-server-registry](https://github.com/casdoor/public-mcp-server-registry).
2. Add an entry to `registry.json` following the schema above.
3. Open a pull request. The website redeploys automatically on merge.

Keep the description to one sentence and pick the closest existing category. If none of the nine categories fit, note that in the PR and we'll discuss adding a new one.

## Connecting a listed server

Most servers in the registry require their own authentication (API keys, OAuth tokens). Check the server's website for setup instructions. For servers that use Casdoor as their OAuth provider, see [Casdoor as MCP Auth Provider](./overview.md).

To use a server with Claude Desktop, add it to your config file:

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

For a walkthrough of connecting MCP servers to Claude Desktop, Cursor, or ChatGPT, see [Connect Claude Desktop](../how-to-connect/mcp/connect-claude-desktop.md).
