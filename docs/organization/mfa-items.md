---
title: MFA items
description: Configure which MFA methods are available and whether they are optional or required.
keywords: [organization, MFA, multi-factor authentication, 2FA]
authors: [leo220yuyaodog]
---

Admins can add **MFA items** to the organization’s account settings. Users then enable and manage MFA on their profile.

![organization-items-mfa](/img/organization/mfa/organization-items-mfa.png)

## MFA rules

For each MFA method, set:

- **Optional** — Users may enable or skip this MFA method.
- **Prompt** — Users are prompted to enable it after sign-in if they haven’t yet.
- **Required** — Users must enable this method before they can complete sign-in.

![organization-mfa-table](/img/organization/mfa/organization-mfa-table.png)

Prompt shown when MFA is set to prompt:

![mfa prompt](/img/organization/mfa/mfa-prompt.png)

When set to required, users must complete MFA setup before finishing login:

![mfa prompt](/img/organization/mfa/mfa-required.gif)

## Remember MFA

Users can choose to have MFA “remembered” for a period so they are not asked again on the same device. Configure **MFA remember time** in the organization settings (e.g. 12 hours).

![mfa remember](/img/organization/mfa/mfa-remember.png)

![mfa remember time](/img/organization/mfa/mfa-remember-time.png)
