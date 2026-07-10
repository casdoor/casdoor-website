---
title: Scan provider overview
description: Scan networks and web targets to discover servers or security issues, e.g. for MCP or vulnerability scanning.
keywords: [scan, provider, intranet, MCP, server discovery, security, CVE, vulnerability]
authors: [hsluoyz]
---

**Scan providers** (Category: **Scan**) run a scan against a set of targets. Depending on the provider **Type**, a scan either discovers reachable servers on a network, or fingerprints web targets and reports known security issues (CVEs).

## Provider types

| Type | Sub-types | Purpose |
|------|-----------|---------|
| [MCP Scan](/docs/provider/scan/mcp) | Intranet Scan | Probe intranet CIDR ranges to discover online hosts and the [MCP](/docs/how-to-connect/mcp/overview) servers they expose. |
| [Security Scan](/docs/provider/scan/security) | Site, Url | Fingerprint web targets and report the known vulnerabilities (CVEs) that match. |

Add a provider from **Providers** → **Add**, set **Category** to **Scan**, then pick the **Type** and follow the matching page above.
