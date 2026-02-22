---
title: Shared application
description: Use one application across multiple organizations with org-specific client IDs.
keywords: [shared, application, multi-tenant]
authors: [DacongDA]
---

A **shared application** can be used by multiple organizations. Only the **built-in** organization can create shared applications. Each organization uses the same application with an org-specific identifier: append `-org-<organizationName>` to the client ID or application name.

Example: application client ID `2dc94ccbec09612c04ac`, organization `casbin` → use client ID `2dc94ccbec09612c04ac-org-casbin`. OAuth authorize URL: `https://door.casdoor.com/login/oauth/authorize?client_id=2dc94ccbec09612c04ac-org-casbin&response_type=code&redirect_uri=...&scope=read&state=casdoor`.

## Configuration

1. Create the application.
2. Enable **Is Shared**.
3. Use `-org-<orgName>` when referring to the app (e.g. in client_id or login URLs).

![shared application field](/img/application/shared-application/shared_application_field.png)

![shared application login link](/img/application/shared-application/shared_application_login_link.png)

## Invitations

For [invitations](/docs/invitation/overview) with a shared application, Casdoor generates organization-specific links with the `-org-{orgName}` suffix so users register in the correct organization.

:::caution
Once an application is shared, it is available to all organizations and cannot be restricted to a subset.
:::

Here is a demo video that shows how to use shared application:

<video src="/img/application/shared-application/shared_application_demo.mp4" controls="controls" width="100%"></video>
