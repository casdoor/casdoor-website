---
title: Require an invitation code at sign-up
sidebar_label: Invitation codes
description: Allow only invited users to sign up to an application by requiring a valid invitation code on the sign-up page.
keywords: [application, signup, invitation code]
authors: [leo220yuyaodog]
---

This guide explains how to restrict the sign-up of an application to invited users. Users then need a valid invitation code to create an account.

---

#### Learning outcomes

- Add the invitation code field to the sign-up form.
- Create invitation codes for the application.

#### What you need

- An [application](/docs/application/overview) with **Enable signup** turned on

---

## Add the invitation code field

1. In the Casdoor admin console, open the edit page of the application.
1. In [**Signup items**](/docs/application/signup-items-table), add the **Invitation code** item and turn on **Visible** and **Required**.
1. Save the application.

## Create invitation codes

1. Go to the **Invitations** page and add an invitation.
1. In **Application**, select the application, or `ALL` for every application of the organization.
1. Set the **Quota**, the number of times that the code can be used, and optionally an expiry time.
1. Save the invitation and give the code or the invitation link to the user.

For all properties of an invitation, including codes that are regular expressions and invitations for a specific user, see [Invitations](/docs/invitation/overview).

## Verify the result

Open the sign-up page of the application. Sign-up succeeds only with a valid code.

![Recording of a sign-up with an invitation code](/img/application/invitation-code/invitation_demo.gif)

:::tip
To keep public sign-up closed while invited users can still register, turn on **Disable self signup** on the application. The sign-up page then accepts only invitation codes. See the [Application settings reference](/docs/application/terminology#authentication).
:::

## See also

- [Invitations](/docs/invitation/overview)
- [Customize the sign-up form](/docs/application/signup-items-table)
