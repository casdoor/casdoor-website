---
title: Password Complexity
description: Supporting different password complexity options.
keywords: [password, complexity]
authors: [leoil]
---

Casdoor supports customizing password complexity options for user passwords in each organization.

## Supported Complexity Options

We currently support five options:

- `AtLeast6`: The password must have at least six characters.
- `AtLeast8`: The password must have at least eight characters.
- `Aa123`: The password must contain at least one uppercase letter, one lowercase letter, and one digit.
- `SpecialChar`: The password must contain at least one special character.
- `NoRepeat`: The password must not contain any repeated characters.

If you want to use multiple options, you can select them on the organization edit page:

1. Click the **Edit** button on the organization list page.

    ![org edit](/img/organization/password_complexity/org_edit.png)

2. Then select the option you need in the `Password complexity options` column.

    ![option selection](/img/organization/password_complexity/select_password_option.png)

## Password Complexity Validation

We support password complexity validation on the following pages:

1. Sign up page.

    ![signup page check](/img/organization/password_complexity/sign_up_demo.gif)

2. Forget password page.

    ![forget page check](/img/organization/password_complexity/forget_demo.gif)

3. User edit page.

    ![user-edit page check](/img/organization/password_complexity/user_edit_demo.gif)
