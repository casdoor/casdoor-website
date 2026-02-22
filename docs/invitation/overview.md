---
title: Overview
description: Restrict sign-up to users who have a valid invitation code.
keywords: [invitations, invitation code, sign-up]
authors: [HGZ-20]
---

Casdoor supports invitation-based registration. When an administrator makes the invitation code required on the sign-up page, only users with a valid invitation code can register.

![Add Invitation Code to sign up item](/img/invitation/signup-add-invitation-code.png)

Invitation codes can be a **random string** (default) or a **regular expression** that matches multiple codes.

![Invitations](/img/invitation/invitations.png)

## Invitation properties

Each invitation has:

- **Organization** — Organization that owns the invitation
- **Name** — Unique invitation name
- **Display name** — Label shown in the UI
- **Code** — The invitation code (literal string or regex)
- **Default code** — Value used in the invitation link. For random codes it matches the code; for regex, you must set a value that matches the regex
- **Quota** — Maximum number of uses
- **Used count** — Current use count
- **Application** — Applications that can use this code; `ALL` = all apps in the organization. [Shared applications](/docs/application/shared-application) get organization-specific handling
- **Username / Email / Phone** — Optional fixed values required when registering with this invitation
- **State** — Invitation status (e.g. active, suspended)

## Default invitation

By default, the code is a random alphanumeric string and **Quota** is 1 (single use). **Application** is `ALL` (all apps in the organization).

![Default Invitation](/img/invitation/default-invitation.png)

To tie an invitation to a specific user, set **Username**, **Email**, or **Phone**. If those fields are empty or not shown on the sign-up form, Casdoor does not enforce them.

![Configure the user information corresponding to the invitation code](/img/invitation/invitation-with-user-information.png)

To allow reuse, set **Quota** higher (e.g. 10). To stop new sign-ups with this code, set the invitation **State** to **Suspended**.

![Invitation quota and state](/img/invitation/invitation-quota-state.png)

:::caution
If an invitation has **Username**, **Email**, or **Phone** set, keep **Quota** at 1. Those fields must be unique per user, so only one registration per invitation is allowed.
:::

## Regex-based invitations

For many invitation codes without creating each one manually, use a **regular expression** for **Code**. For example, with `Code` set to `[a-z]2333`, any code matching that pattern (e.g. `a2333`, `b2333`) is accepted.

![Regular Match Invitation](/img/invitation/regular-match-invitation.png)

:::note
With regex codes, each distinct matching code can be used once. **Quota** limits total uses. For example, `Code` = `[a-z]2333` and **Quota** = 2 means at most two successful sign-ups with any matching code.
:::

## Invitation link

Copy an invitation link for an invitation. The code in the link comes from **Default code**; for regex-based invitations, set **Default code** to a value that matches the regex. When users open the link, the sign-up form can be pre-filled from the invitation.

For [shared applications](/docs/application/shared-application), invitation links are generated with the correct `-org-{orgName}` suffix so registration completes in the right organization.

![Invitation Link](/img/invitation/invitation-link-copy.png)

![Registration page corresponding to the invitation link](/img/invitation/signup-with-invitation-code.png)

## Demo

<video src="/video/invitation/invitation.mp4" controls="controls" width="100%"></video>
