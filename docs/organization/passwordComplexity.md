---
title: Password complexity
description: Configure password strength rules per organization.
keywords: [password, complexity]
authors: [leoil]
---

Each organization can enforce password complexity rules for user passwords.

## Options

| Option | Requirement |
|--------|-------------|
| **AtLeast6** | At least 6 characters. |
| **AtLeast8** | At least 8 characters. |
| **Aa123** | At least one uppercase letter, one lowercase letter, and one digit. |
| **SpecialChar** | At least one special character. |
| **NoRepeat** | No repeated characters. |

Multiple options can be enabled; all selected rules apply.

## Configuration

1. Open the organization list and click **Edit** for the organization.
2. In **Password complexity options**, select the options to enforce.

![org edit](/img/organization/password_complexity/org_edit.png)
![option selection](/img/organization/password_complexity/select_password_option.png)

## Where validation applies

- **Sign-up page** — new passwords must satisfy the rules.
- **Forgot password page** — reset passwords must satisfy the rules.
- **User edit page** — password changes must satisfy the rules.

![signup page check](/img/organization/password_complexity/sign_up_demo.gif)
![forget page check](/img/organization/password_complexity/forget_demo.gif)
![user-edit page check](/img/organization/password_complexity/user_edit_demo.gif)
