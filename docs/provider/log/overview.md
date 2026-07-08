---
title: Log providers
description: Collect OS logs, SELinux audit events, OpenTelemetry data, and permission audit events into Casdoor Entry records.
keywords: [log, provider, permission, audit, syslog, system log, SELinux, OpenClaw, OTLP]
authors: [hsluoyz]
---

**Log providers** (Category: **Log**) collect or receive log data and store each record as a Casdoor [Entry](/docs/entry/overview).

| Kind | Description | Types |
|------|-------------|-------|
| **Push-based** | Casdoor writes one entry per event it generates internally | Casdoor Permission Log |
| **Pull-based** | A background collector reads records from an external source | System Log, SELinux Log |
| **Receive-based** | An external agent pushes data to Casdoor over HTTP | Agent (OpenClaw) |

## Provider types

### Casdoor Permission Log

Records every non-GET API call that passes through Casdoor's authorization filter. Each call produces one entry containing the subject, HTTP method, URL path, and whether access was allowed or denied.

No configuration fields are required.

**Entry format:**

```text
[info]    sub=<owner>/<user> method=<METHOD> url=<path> objOwner=<org> allowed=true
[warning] sub=<owner>/<user> method=<METHOD> url=<path> objOwner=<org> allowed=false
```

### System Log

Reads records from the operating system's native logging facility — **journald/syslog** on Linux/Unix and **Windows Event Log** on Windows — and stores each record as an Entry. The collector starts automatically at Casdoor startup.

| Field | Description |
|-------|-------------|
| **Title** | Log tag used to filter records (e.g. `casdoor`). Leave empty to collect all records. |

### SELinux Log

Collects SELinux audit events (AVC denials and related records) from `/var/log/audit/audit.log` and stores each one as an Entry. Only available on Linux systems with SELinux enabled.

Collected record types include: `AVC`, `USER_AVC`, `SELINUX_ERR`, `MAC_POLICY_LOAD`, `MAC_STATUS`.

No configuration fields are required. The provider checks at startup whether SELinux is active and the audit log is readable; if not, it exits cleanly without error.

### Agent (OpenClaw)

Receives OpenTelemetry data pushed by an [OpenClaw](https://openclaw.io) agent over HTTP. Casdoor accepts all three OTLP signal types: traces (`/api/v1/traces`), metrics (`/api/v1/metrics`), and logs (`/api/v1/logs`).

Only requests from the configured IP are accepted; all other senders receive `403 Forbidden`.

| Field | Description |
|-------|-------------|
| **Sub type** | `OpenClaw` |
| **Host** | IP address of the OpenClaw agent (e.g. `192.168.1.100`). Leave empty to allow any IP. |

See [Entries — OpenTelemetry data](/docs/entry/overview#opentelemetry-data-otlp) for details on the payload format and viewer.

## Setting up permission logging

1. Go to **Providers** → **Add**.
2. Set **Category** to `Log`, **Type** to `Casdoor Permission Log`.
3. Save. Enforcement events are recorded as entries immediately.
4. View results under **Entries** in the sidebar.
