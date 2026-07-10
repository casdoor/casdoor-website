---
title: Security Scan
description: Fingerprint web targets and report matching known vulnerabilities (CVEs).
keywords: [scan, provider, security, CVE, vulnerability, fingerprint]
authors: [hsluoyz]
---

A **Security Scan** provider (Type: **Security Scan**) probes one or more web targets, fingerprints the software they run (product, vendor, version), and reports the known vulnerabilities (CVEs) that match. Fingerprints and CVEs come from an online data source, so the scan reflects an up-to-date list without upgrading Casdoor.

## Configure the provider

1. Go to **Providers** → **Add**.
2. Set **Category** to **Scan** and **Type** to **Security Scan**.
3. Choose a **Sub-type** — it decides where the scan targets come from:

   | Sub-type | Targets |
   |----------|---------|
   | **Site** | The [Sites](/docs/site/overview) configured in the same organization. Casdoor derives the base URLs from each Site and scans them. |
   | **Url** | An explicit list of URLs you enter in the **URL** field. |

4. Fill in the fields below and **Save**.

| Field | Applies to | Description |
|-------|------------|-------------|
| **Online list** | Both | Optional URL of an extra CVE / fingerprint data source (JSON). It is merged on top of the built-in list, so you can add your own signatures. Leave empty to use only the built-in list. |
| **URL** | **Url** sub-type only | One or more target URLs, one per line (for example `https://example.com`). Required for a **Url** scan. |

:::info Data source
Casdoor always loads its built-in CVE and fingerprint list from `https://casdoor.ai/casdoor-data/data.json`, and merges any **Online list** source on top of it. If a source cannot be reached, the scan continues with whatever list was already loaded.
:::

## Run a scan

Open the saved provider and click **Scan**. **The provider must be saved first** — the button is disabled while you are still creating a new provider.

The result appears in a table below the button. Each row is one finding:

| Column | Description |
|--------|-------------|
| **Name** | The target's name (the Site name, or the URL). |
| **Product** / **Vendor** / **Version** | The software detected on the target. |
| **Severity** | Severity of the match. |
| **CVEs** | Matched CVEs, each linking to its reference and showing its own severity and summary. |

A target with no fingerprint match still appears as a single row with no product and no CVEs, so you can see it was scanned. The full result is also saved to the provider's `metadata` field.

## API

A scan is triggered by:

```text
GET /api/scan?owner=<owner>&name=<provider-name>&target=<optional>
```

- `owner` and `name` identify the Security Scan provider; the sub-type, online list and URL targets are read from that provider.
- `target` is optional. For a **Url** scan it overrides the configured URL list; for a **Site** scan it filters the derived base URLs by substring. For a **Url** scan, a target must be supplied either here or in the provider's **URL** field.

The response returns the list of findings, and the same result is persisted to the provider's `metadata`.
