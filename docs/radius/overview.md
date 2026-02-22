---
title: Overview
description: Run Casdoor as a RADIUS server for network access and accounting.
keywords: [RADIUS, NAS, authentication, accounting]
authors: [Chinoholo0807]
---

Casdoor can act as a **RADIUS** server. RADIUS clients (e.g. a NAS or any host with RADIUS client software) send authentication and accounting requests to Casdoor.

## Configuration

In `conf/app.conf` set the RADIUS port and shared secret:

```text
radiusServerPort = 1812
radiusSecret = "secret"
```

Then start Casdoor; the RADIUS server will listen on the configured port.

## Supported messages

- **Access-Request** — The client sends an auth request; Casdoor accepts or rejects based on the user and replies with `Access-Accept` or `Access-Reject`.
- **Accounting-Request** — The client sends start/interim/stop accounting; Casdoor records it and replies with `Accounting-Response`.

![radius flow](/img/radius/radius_flow.png)

Users in Casdoor belong to an **organization**. Set the RADIUS request’s **Class** attribute to the user’s organization name so Casdoor can resolve the user correctly.

![set organization in request](/img/radius/set_org_in_request.png)
