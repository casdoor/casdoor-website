---
title: MCP Scan
description: Scan intranet address ranges to discover MCP servers.
keywords: [scan, provider, intranet, MCP, server discovery]
authors: [hsluoyz]
---

An **MCP Scan** provider (Type: **MCP Scan**, Sub-type: **Intranet Scan**) probes one or more intranet CIDR ranges over HTTP and reports which hosts are online and which of them expose an MCP server. For every online host, Casdoor tries each configured port/path combination and records the endpoints that respond as MCP servers. The discovered servers can then be managed on the **Servers** page — for example, as [MCP](/docs/how-to-connect/mcp/overview) servers.

## Configure the provider

1. Go to **Providers** → **Add**.
2. Set **Category** to **Scan**, **Type** to **MCP Scan**, and **Sub-type** to **Intranet Scan**.
3. Fill in the scan target fields below and **Save**.

| Field | Description | Examples |
|-------|-------------|----------|
| **Host** | One or more CIDR ranges to scan. | `127.0.0.1/32`, `10.0.0.0/24`, `172.16.0.0/24`, `192.168.1.0/24` |
| **Port** | Ports to probe on each host. Defaults to `3000`, `8080`, `80` when left empty. | `80`, `3000`, `8080` |
| **Path** | HTTP paths to probe on each open port. Defaults to `/`, `/mcp`, `/sse`, `/mcp/sse` when left empty. | `/`, `/mcp`, `/sse`, `/mcp/sse` |

Each field accepts multiple values — type a value and press <kbd>Enter</kbd> to add it, or pick from the suggested list.

:::tip
Keep the target ranges as narrow as possible. Scanning a large range (for example a full `/16`) multiplies into many host × port × path probes and takes longer. A single scan is capped at **1024 hosts**.
:::

## Run a scan

You can trigger a scan in two places. **The provider must be saved first** — the scan button is disabled while you are still creating a new provider.

### From the provider page

Open the saved Scan provider and click **Scan server**. The result appears in a table below the button, summarizing:

- **Scanned hosts** — number of hosts probed.
- **Online hosts** — hosts that responded.
- **Found servers** — MCP servers discovered across those hosts.

### From the Servers page

1. Go to **Servers** and click **Scan server**.
2. Select a Scan provider (only providers with Category **Scan** / Type **MCP Scan** / Sub-type **Intranet Scan** are listed) and run the scan.
3. Add any discovered server to your Casdoor **Servers** list directly from the result. A scanned server is imported with a display name like `Scanned MCP <host>:<port>` and the discovered URL.

## Defaults and limits

| Setting | Value |
|---------|-------|
| Default ports | `3000`, `8080`, `80` |
| Default paths | `/`, `/mcp`, `/sse`, `/mcp/sse` |
| Per-host request timeout | `1200 ms` |
| Max concurrent probes | `32` |
| Max hosts per scan | `1024` |

## API

Scans triggered from the Servers page call:

```text
POST /api/sync-intranet-servers
```

with the body:

```json
{
  "provider": "<owner>/<provider-name>"
}
```

The host, port and path targets are read from the referenced provider's configuration, so no scan parameters are passed in the request body. The response returns the scanned CIDR ranges, the count of scanned hosts, the list of online hosts, and the discovered servers.

## Migration note

The intranet server scan that was previously built into Casdoor is now modeled as a Scan provider. If you relied on the old built-in MCP scan, create an **MCP Scan** / **Intranet Scan** provider as described above and reference it when scanning from the **Servers** page.
