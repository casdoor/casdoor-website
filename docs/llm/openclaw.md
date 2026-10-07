---
title: OpenClaw
description: Collect LLM agent traces, metrics, and logs in Casdoor using the OpenClaw observability agent.
keywords: [OpenClaw, observability, LLM, OTLP, OpenTelemetry, traces, agent]
authors: [hsluoyz]
---

[OpenClaw](https://openclaw.ai) is an open-source, self-hosted AI assistant: a gateway that connects chat apps to AI agents. Its `diagnostics-otel` plugin exports the agent's traces, metrics, and logs over OpenTelemetry (OTLP/HTTP). Casdoor can receive that data, store each payload as an [Entry](/docs/entry/overview), and show OpenClaw sessions as a graph, so you can see what your agents did next to who they act for.

## How it works

OpenClaw sends OTLP payloads to Casdoor's ingest endpoints:

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
3. In the **Host** field, enter the IP address of the machine running OpenClaw. Leave it empty to accept data from any IP.
4. (Optional) **Agent ID** and **Path** tell Casdoor where to find the agent's session transcripts; see [Raw session transcripts](#raw-session-transcripts).
5. (Optional) In the **Storage provider** field, pick which Storage provider should hold the raw session transcripts. Leave it empty to let Casdoor choose automatically.
6. Save. Casdoor is now ready to receive data.

The **Host** field is an IP allowlist for this provider. Requests from any other address are rejected with `403 Forbidden`, which prevents unauthorized agents from writing entries into your organization.

### 2. Configure OpenClaw

Install and enable OpenClaw's `diagnostics-otel` plugin, then point its OTLP exporter at Casdoor. OpenClaw appends `/v1/traces`, `/v1/metrics`, and `/v1/logs` to the endpoint, so the endpoint is Casdoor's URL followed by `/api`:

```bash
openclaw plugins install clawhub:@openclaw/diagnostics-otel
```

```json5
{
  plugins: {
    allow: ["diagnostics-otel"],
    entries: {
      "diagnostics-otel": { enabled: true },
    },
  },
  diagnostics: {
    enabled: true,
    otel: {
      enabled: true,
      endpoint: "https://your-casdoor.com/api",
      protocol: "http/protobuf",
      traces: true,
      metrics: true,
      logs: true,
    },
  },
}
```

See [OpenTelemetry export](https://docs.openclaw.ai/gateway/opentelemetry) in the OpenClaw documentation for sampling, flush intervals, and what content is captured.

## Viewing collected data

Once data is flowing, navigate to **Entries** in the Casdoor sidebar. Each incoming OTLP payload produces one Entry.

- **Trace entries** render as a span tree in the built-in EntryMessageViewer, showing timing, attributes, and status for each span.
- **Metrics and log entries** store the raw OTLP JSON in the `Message` field, which you can inspect directly or export for use in other tools.

Entries are scoped to an organization, so data from different teams or environments can be separated by placing them under different organizations with their own Log providers.

## Raw session transcripts

Beyond the parsed trace view, Casdoor can keep the **raw JSONL transcript** of each OpenClaw session—the exact line-delimited log the agent produced. This is useful when you need the unmodified record for debugging, auditing, or replay.

### Where transcripts are read from

Casdoor reads the transcripts from OpenClaw's state directory on the machine where Casdoor runs, so this feature needs OpenClaw on the same host (or its state directory mounted there). By default the directory is `~/.openclaw/agents/<Agent ID>/sessions`, where **Agent ID** defaults to `main`; `OPENCLAW_STATE_DIR` and `OPENCLAW_PROFILE` are honored as in OpenClaw. Set **Path** on the provider to use another directory.

### Where transcripts are stored

When the OpenClaw provider syncs a session, Casdoor uploads that session's `.jsonl` file to a [Storage provider](/docs/provider/storage/overview) and records it as a resource. It picks the target storage as follows:

1. If you set the **Storage provider** field on the Log provider, that provider is used (it must be an enabled `Storage` provider in the same organization).
2. Otherwise, Casdoor uses the first enabled Storage provider in the organization.
3. If none exists, Casdoor automatically creates a default local Storage provider named `openclaw-transcript-storage`.

Re-syncing a session overwrites its stored transcript rather than creating duplicates.

### Viewing a transcript

Open an OpenClaw session in the graph viewer. When a raw transcript is available, a **Raw JSONL** button appears in the viewer's toolbar; clicking it opens the transcript page for that session.

The viewer streams a preview of the file rather than the whole thing—up to 2&nbsp;MB. For larger transcripts the response is marked as truncated so you know more content exists in the stored file. Behind the UI, the preview is served by:

```text
GET /api/get-openclaw-session-transcript?id=<owner>/<session-name>
```

which returns the file name, total size, the number of bytes loaded, a `truncated` flag, and the transcript `content`.

## Connecting to Casdoor agents

If you register your AI agents in Casdoor's [Agents](/docs/agent/overview) section, you can associate telemetry entries with the agent that produced them. The Agent record stores the agent's endpoint URL and bearer token, giving you a single place to correlate identity with observability data.

## Next steps

- [Entries](/docs/entry/overview) — understand entry types and the trace viewer
- [Log providers](/docs/provider/log/overview) — full reference for the Agent (OpenClaw) provider
- [Agents](/docs/agent/overview) — register AI agent endpoints in Casdoor
