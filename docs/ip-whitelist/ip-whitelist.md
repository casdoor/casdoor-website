---
title: IP allowlist
description: Restrict access to login, sign-up, and forgot-password pages by client IP.
keywords: [ip, allowlist, whitelist, CIDR]
authors: [ZhaoYP-2001]
---

Casdoor can restrict entry pages (login, sign-up, forgot-password) by client IP. Access is allowed only if the client IP is in the configured allowlist. Allowlists can be set at **user**, **application**, and **organization** levels; all applicable levels are checked.

## Configuration

### User level

Casdoor checks the user-level allowlist first.

1. Add the **IP allowlist** account item on the organization’s edit page (see [Account customization](/docs/organization/accountCustomization)).
2. For each user, set the allowlist as a comma-separated list of CIDR ranges (e.g. `192.168.1.0/24,25.112.0.0/16`). Leave empty for no IP restriction.

![user_ip_whitelist](/img/ip-whitelist/user_ip_whitelist.png)

### Application level

If the request passes the user-level check, Casdoor then checks the application allowlist. Configure **IP allowlist** on the application edit page.

![app_ip_whitelist](/img/ip-whitelist/app_ip_whitelist.png)

### Organization level

The last check is at the organization level. Set **IP allowlist** on the organization edit page.

![org_ip_whitelist](/img/ip-whitelist/org_ip_whitelist.png)

Here is a demo video that shows how to use ip whitelist:

<video src="/img/ip-whitelist/ip_whitelist.mp4" controls="controls" width="100%"></video>
