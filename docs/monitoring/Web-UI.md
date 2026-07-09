---
title: Web UI monitoring
description: View Casdoor runtime metrics in the web UI.
keywords: [monitor, CPU, memory, API latency]
authors: [OutOfEastGate]
---

Casdoor exposes runtime metrics on the **Sysinfo** page (e.g. [door.casdoor.com/sysinfo](https://door.casdoor.com/sysinfo)):

- **CPU and memory usage** — progress bars turn yellow at 70% and red at 90%

  ![Usage Info](/img/monitoring/web-ui/usage_info.png)

- **Disk usage** — bytes used in the `data/` directory vs. total capacity of the filesystem where it lives

- **Network I/O** — cumulative bytes read and written by the Casdoor process (from OS-level I/O counters)

- **API latency** — request counts and average latency per API

  ![API Latency](/img/monitoring/web-ui/api_latency.png)

- **API throughput** — total and per-API throughput

  ![API Throughput](/img/monitoring/web-ui/api_throughput.png)

## Version info

The `/api/get-version-info` endpoint returns the running binary's version:

```json
{
  "version": "v1.x.x",
  "commitId": "abc1234",
  "commitOffset": 42
}
```

This works in both source builds (where the info is read from the local git repository) and official release binaries (where `version`, `commitId`, and `commitOffset` are embedded at build time via linker flags). Deploying a pre-built binary from a release does not require a git repository to be present for this endpoint to return valid data.
