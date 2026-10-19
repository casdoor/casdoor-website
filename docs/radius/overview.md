---
title: Overview
description: Run Casdoor as a RADIUS server for network access and accounting.
keywords: [RADIUS, NAS, authentication, accounting]
authors: [Chinoholo0807]
---

Casdoor can act as a **RADIUS** server. RADIUS clients (e.g. a NAS or any host with RADIUS client software) send authentication and accounting requests to Casdoor.

## Configuration

In `conf/app.conf` set the RADIUS port, the default organization, and the shared secret:

```text
radiusServerPort = 1812
radiusDefaultOrganization = "built-in"
radiusSecret = "secret"
```

Then start Casdoor; the RADIUS server will listen on the configured port.

`radiusDefaultOrganization` is the organization that Casdoor uses when a request doesn't name one. If it's empty, Casdoor uses `built-in`.

## Turn on RADIUS for an organization

The RADIUS server serves only the users of organizations that have **Enable RADIUS** turned on. The switch is off by default, and only global administrators can change it.

1. In the Casdoor admin console, open the organization edit page.
1. Turn on **Enable RADIUS** and save.

:::caution
For an organization with **Enable RADIUS** off, Casdoor answers every Access-Request with `Access-Reject` and doesn't answer Accounting-Requests at all. If you used the RADIUS server before this switch existed, turn it on for each organization whose users sign in through RADIUS, or those sign-ins start to fail after the upgrade.
:::

## Supported messages

- **Access-Request** — The client sends an auth request; Casdoor accepts or rejects based on the user and replies with `Access-Accept` or `Access-Reject`. For users with multi-factor authentication (MFA), Casdoor replies with `Access-Challenge` first. See [MFA](#mfa).
- **Accounting-Request** — The client sends start/interim/stop accounting; Casdoor records it and replies with `Accounting-Response`.

![radius flow](/img/radius/radius_flow.png)

Users in Casdoor belong to an **organization**. Set the RADIUS request’s **Class** attribute to the user’s organization name so Casdoor can resolve the user correctly. Without a **Class** attribute, Casdoor uses `radiusDefaultOrganization`. In an Accounting-Request, the **User-Name** can also carry the organization, as `<organization>/<username>`.

![set organization in request](/img/radius/set_org_in_request.png)

## Sign-in policy

Besides a wrong password, Casdoor replies with `Access-Reject` when:

- The user's organization has **Disable signin** turned on.
- The user must change the password first, or must set up the MFA that the organization requires. The user has to finish that on the Casdoor sign-in page before a RADIUS sign-in works.

## MFA

When the user has MFA turned on, a correct password isn't enough:

1. Casdoor replies to the Access-Request with `Access-Challenge`, a **State** attribute, and the **Reply-Message** `please enter OTP`.
1. The client sends a second Access-Request with the same **User-Name**, the same **State**, and the time-based one-time password (TOTP) from the user's authenticator app in **User-Password**. The **State** is valid for 120 seconds and only once.
1. Casdoor replies with `Access-Accept` if the passcode is correct, otherwise with `Access-Reject`.

Only TOTP (authenticator app) MFA works over RADIUS. A user whose MFA is SMS or email only is rejected.

Wrong passcodes count against the organization's **Failed signin limit**. When the limit is reached, Casdoor rejects the user's passcodes for **Failed signin frozen time** minutes. This counter is separate from the one for wrong passwords.

## Message-Authenticator

The Message-Authenticator attribute (RFC 2869) protects RADIUS packets against the Blast-RADIUS attack (CVE-2024-3596). The built-in RADIUS server handles it this way:

- When an Access-Request carries a Message-Authenticator, Casdoor verifies it with the shared secret. It drops a request with a wrong one without replying, and it adds a Message-Authenticator to its reply.
- When an Access-Request has no Message-Authenticator, Casdoor processes it as before and replies without one.

Configure your RADIUS clients to send the Message-Authenticator attribute.

## See also

- [RADIUS MFA provider](/docs/provider/mfa/radius)
- [Multi-factor authentication](/docs/user/multi-factor-authentication)
- [Organization overview](/docs/organization/overview)
