---
title: Require multi-factor authentication
sidebar_label: MFA items
description: Choose which multi-factor authentication methods an organization offers, and whether each one is optional, prompted, or required.
keywords: [organization, MFA, multi-factor authentication, 2FA]
authors: [leo220yuyaodog]
---

This guide explains how to offer multi-factor authentication (MFA) methods to the users of an organization and how to require them.

---

#### Learning outcomes

- Add MFA methods to an organization.
- Make a method optional, prompted, or required.
- Let users skip MFA on a trusted device for a period.

#### What you need

- Administrator access to the organization in the Casdoor admin console

---

## Add MFA methods

1. In the Casdoor admin console, open the edit page of the organization.
1. In **MFA items**, add the MFA methods that the organization offers.

   ![MFA items of an organization](/img/organization/mfa/organization-items-mfa.png)

1. Select a rule for each method:

   | Rule | Behavior |
   |---|---|
   | **Optional** | Users can set up the method or leave it |
   | **Prompt** | Casdoor prompts users who haven't set up the method after they sign in |
   | **Required** | Users must set up the method before they can complete the sign-in |

   ![Rules of the MFA items](/img/organization/mfa/organization-mfa-table.png)

1. Save the organization.

Users then set up and manage their methods on their account page. See [Multi-factor authentication](/docs/user/multi-factor-authentication).

With the **Prompt** rule, users see the following prompt after sign-in:

![Prompt to set up MFA](/img/organization/mfa/mfa-prompt.png)

With the **Required** rule, users go through the setup before the sign-in completes:

![Recording of the required MFA setup](/img/organization/mfa/mfa-required.gif)

## Remember MFA on a device {#remember-mfa}

Users can choose to be remembered on a device, so that Casdoor doesn't ask for the second factor again for a period.

![Remember option during MFA](/img/organization/mfa/mfa-remember.png)

Set the length of the period, for example 12 hours, in **MFA remember time** on the organization edit page.

![MFA remember time of an organization](/img/organization/mfa/mfa-remember-time.png)

## See also

- [Multi-factor authentication](/docs/user/multi-factor-authentication)
- [Casdoor Authenticator app](/docs/how-to-connect/totp-authenticator-app)
- [Customize the account page](/docs/organization/accountCustomization)
