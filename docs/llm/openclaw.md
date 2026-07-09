---
title: OpenClaw
description: Collect LLM agent traces, metrics, and logs in Casdoor using the OpenClaw observability agent.
keywords: [OpenClaw, observability, LLM, OTLP, OpenTelemetry, traces, agent]
authors: [hsluoyz]
---

[OpenClaw](https://openclaw.io) is an observability agent built for LLM applications. It collects traces, metrics, and logs from your AI agents and services, then pushes them to a backend over the OpenTelemetry (OTLP) protocol. Casdoor can act as that backend, storing each signal as an [Entry](/docs/entry/overview) and rendering traces in a structured viewer.

## How it works

OpenClaw runs alongside your application and instruments outbound LLM calls, tool invocations, and any other spans you configure. At collection intervals it serializes these as OTLP payloads and sends them to Casdoor's ingest endpoints:

| Signal | Endpoint |
|--------|----------|
| Traces | `POST /api/v1/traces` |
| Metrics | `POST /api/v1/metrics` |
| Logs | `POST /api/v1/logs` |

All three expect `Content-Type: application/x-protobuf`. Casdoor stores each payload as an Entry and tags it with the sender's IP and User-Agent.

## Setting up in Casdoor

### 1. Create a Log provider

1. Go to **Providers** → **Add**.
2. Set **Category** to `Log` and **Type** to `Agent (OpenClaw)`.
3. In the **Host** field, enter the IP address of the machine running the OpenClaw agent. Leave it empty to accept from any IP.
4. Save. Casdoor is now ready to receive data.

The **Host** field is an IP allowlist for this provider. Requests from any other address are rejected with `403 Forbidden`, which prevents unauthorized agents from writing entries into your organization.

### 2. Configure OpenClaw

Point OpenClaw at your Casdoor instance using the OTLP HTTP exporter. The exact configuration depends on your OpenClaw version, but the core settings are:

```yaml
exporters:
  otlphttp:
    endpoint: https://your-casdoor.com
    headers:
      Content-Type: application/x-protobuf
```

Refer to the [OpenClaw documentation](https://openclaw.io) for agent-specific options such as sampling rates, batch sizes, and which signals to enable.

## Viewing collected data

Once data is flowing, navigate to **Entries** in the Casdoor sidebar. Each incoming OTLP payload produces one Entry.

- **Trace entries** render as a span tree in the built-in EntryMessageViewer, showing timing, attributes, and status for each span.
- **Metrics and log entries** store the raw OTLP JSON in the `Message` field, which you can inspect directly or export for use in other tools.

Entries are scoped to an organization, so data from different teams or environments can be separated by placing them under different organizations with their own Log providers.

## Connecting to Casdoor agents

If you register your AI agents in Casdoor's [Agents](/docs/agent/overview) section, you can associate telemetry entries with the agent that produced them. The Agent record stores the agent's endpoint URL and bearer token, giving you a single place to correlate identity with observability data.

## Next steps

- [Entries](/docs/entry/overview) — understand entry types and the trace viewer
- [Log providers](/docs/provider/log/overview) — full reference for the Agent (OpenClaw) provider
- [Agents](/docs/agent/overview) — register AI agent endpoints in Casdoor
