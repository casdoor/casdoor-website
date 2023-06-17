---
title: Password Complexity
description: Support different password complexity options.
keywords: [password complexity]
authors: [leoil]
---

Casdoor support customize password complexity options for user password in each organization.

# Supported Complexity Options

We currently support 5 options:

  - `AtLeast6`: The password must have at least 6 characters
  - `AtLeast8`: The password must have at least 8 characters
  - `Aa123`: The password must contain at least one uppercase letter, one lowercase letter and one digit
  - `SpecialChar`: The password must contain at least one special character
  - `NoRepeat`: The password must not contain any repeated characters

If you want to use multiple options, you can select them in the organization edit page:

1. Click the **Edit** button in organization list page

![org edit](/img/organization/password_complexity/org_edit.png)

2. Then select the option you need in the `Password complexity options`  colomn.

![option selection](/img/organization/password_complexity/select_password_option.png)


##  Password Complexity Autocheck
We support password complexity autocheck in the following pages:

1. Sign up page
    ![forget page check](/img/organization/password_complexity/forget_demo.gif)

2. Forget password page
    ![signup page check](/img/organization/password_complexity/sign_up_demo.gif)

3. User edit page
    ![user-edit page check](/img/organization/password_complexity/user_edit_demo.gif)



