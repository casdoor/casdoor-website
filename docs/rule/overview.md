---
title: Rules
description: Define traffic control rules (IP, User-Agent, rate limiting, WAF) for Sites.
keywords: [rule, WAF, IP, rate limiting, user-agent, traffic control]
authors: [hsluoyz]
---

**Rules** define conditions under which incoming requests to a [Site](/docs/site/overview) should be allowed or blocked. Each rule has a type, a set of expressions, and an action.

## Rule properties

| Field | Description |
|-------|-------------|
| **Type** | The kind of matching to perform (see below). |
| **Expressions** | One or more conditions to evaluate. All expressions in a rule are evaluated together. |
| **Action** | `Allow` or `Block` — what to do when the rule matches. |
| **Status code** | HTTP status code returned when the request is blocked (e.g. `403`). |
| **Reason** | Message included in the blocked response. |
| **Verbose mode** | Log detailed information for each request evaluated by this rule. |

## Rule types

### IP

Matches requests by the client's IP address. Expressions support:

| Operator | Description |
|----------|-------------|
| `is in` | IP is within a specific CIDR range (e.g. `192.168.0.0/24`). |
| `is not in` | IP is outside a CIDR range. |
| `equals` | IP matches exactly. |
| `does not equal` | IP does not match exactly. |
| `is abroad` | IP is detected as originating outside the server's country (requires IP geolocation). |

Multiple IP values can be comma-separated in a single expression.

### User-Agent

Matches requests by the `User-Agent` header. Expressions support:

| Operator | Description |
|----------|-------------|
| `contains` | User-Agent contains the specified string. |
| `does not contain` | User-Agent does not contain the string. |
| `equals` | User-Agent matches exactly. |
| `does not equal` | User-Agent does not match. |
| `matches regex` | User-Agent matches a regular expression. |
| `does not match regex` | User-Agent does not match a regular expression. |

### IP Rate Limiting

Limits the number of requests per IP within a time window. Configure the request limit, time window, and the response when the limit is exceeded.

### WAF

Applies Web Application Firewall rules based on request content (headers, body, query parameters). Uses modsecurity-compatible rule syntax to detect and block common attack patterns such as SQL injection, XSS, and path traversal.

### Compound

Combines multiple sub-rules (of any type) into a single rule. The compound rule matches when all sub-rule conditions are satisfied simultaneously.

## Attaching rules to a site

Rules are attached on the [Site](/docs/site/overview) edit page. Rules are evaluated in the order listed; evaluation stops at the first match. You can reorder rules using the arrows in the rule list.

:::tip

Use **Verbose mode** during development to log rule evaluation details and tune your expressions before enabling them in production.

:::
