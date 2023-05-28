---
title: Specify login Organization
description: Specify login Organization in login page
keywords: [UI, login, application, organization]
authors: [leo220yuyaodog]
---

Here will show you how to enable specify login organization page for the application. 

For example, endpoint `/login` is default sign in to accounts belonging to the **built-in** organization. You can enable the specify login organization page in
**app-built-in** application that belong to **built-in** organization. So that the user can select an organization to login. After the user selects the organization, it will redirect to `/login/<organization>`.


## Config

In the application edit page, you can see the `orgSelectMode` config. You can select the mode in the dropdown list.

![mode_config](/img/application/specify-login-organization/mode_config.png)

- None: Don't show the organization select page.
- Input: The user can input the organization name in the input box.
- Select: The user can select the organization in the dropdown list.

![mode_input](/img/application/specify-login-organization/mode_input.png)

![mode_select](/img/application/specify-login-organization/mode_select.png)
