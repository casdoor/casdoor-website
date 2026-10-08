---
title: Set password complexity rules
sidebar_label: Password complexity
description: Require a minimum length, mixed character classes, special characters, or no repeated characters for the passwords of an organization.
keywords: [password, complexity]
authors: [leoil]
---

This guide explains how to enforce rules for the passwords of the users of an organization.

---

#### Learning outcomes

- Choose the password rules of an organization.
- Know where Casdoor checks the rules.

#### What you need

- Administrator access to the organization in the Casdoor admin console

---

## Password rules {#options}

| Option | A password must |
|---|---|
| `AtLeast6` | Have at least 6 characters |
| `AtLeast8` | Have at least 8 characters |
| `Aa123` | Contain at least one uppercase letter, one lowercase letter, and one digit |
| `SpecialChar` | Contain at least one special character |
| `NoRepeat` | Contain no repeated characters |

You can select several options. A password must then satisfy all of them.

## Set the rules {#configuration}

1. In the Casdoor admin console, go to **User Management** > **Organizations** and open the organization.

   ![Organization list with the edit button](/img/organization/password_complexity/org_edit.png)

1. In **Password complexity options**, select the options.

   ![Password complexity options of the organization](/img/organization/password_complexity/select_password_option.png)

1. Save the organization.

## Verify the result {#where-validation-applies}

Casdoor checks new passwords against the rules in three places.

On the sign-up page:

![Password check on the sign-up page](/img/organization/password_complexity/sign_up_demo.gif)

On the forgot-password page:

![Password check on the forgot-password page](/img/organization/password_complexity/forget_demo.gif)

On the edit page of a user, when the password is changed:

![Password check on the user edit page](/img/organization/password_complexity/user_edit_demo.gif)

## See also

- [Password obfuscator](/docs/organization/passwordObfuscator)
- [Organizations](/docs/organization/overview)
