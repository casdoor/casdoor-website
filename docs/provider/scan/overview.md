---
title: Scan providers
description: Scan intranet address ranges to discover servers, e.g. for MCP.
keywords: [scan, provider, intranet, MCP, server discovery]
authors: [hsluoyz]
---

**Scan providers** (Category: **Scan**) scan a set of network address ranges to discover reachable servers. The discovered servers can then be managed in Casdoor — for example, as MCP servers.

## Provider types

### MCP Scan

Sub-type: **Intranet Scan**.

Scans one or more intranet CIDR ranges and returns the servers it finds. Typical ranges include:

- `127.0.0.1/32`
- `10.0.0.0/24`
- `172.16.0.0/24`
- `192.168.1.0/24`

## Configure the provider

1. Go to **Providers** → **Add**.
2. Set **Category** to **Scan**, **Type** to **MCP Scan**, and **Sub-type** to **Intranet Scan**.
3. Choose the intranet address range(s) to scan and save.

Once configured, running the scan returns the list of discovered servers, which you can then use from the **Servers** page.
