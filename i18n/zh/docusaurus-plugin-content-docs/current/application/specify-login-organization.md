---
title: 指定登录组织
description: 指定登录页面中的登录组织
keywords:
  - UI
  - login
  - application
  - organization
authors:
  - leo220yuyaodog
---

Here will show you how to enable specify login organization page for the application.

例如，端点 `/login` 是默认登录到 **built-in** 组织。 You can enable the specify login organization page in **app-built-in** application that belong to **built-in** organization. So that the user can select an organization to login. After the user selects the organization, it will redirect to `/login/<organization>`.


## 配置

In the application edit page, you can see the `Org celect mode` config. You can select the mode in the dropdown list.

![mode_config](/img/application/specify-login-organization/mode_config.png)

- None: Don't show the organization select page.
- Input: The user can input the organization name in the input box.
- Select: The user can select the organization in the dropdown list.

![mode_input](/img/application/specify-login-organization/mode_input.png)

![mode_select](/img/application/specify-login-organization/mode_select.png)

:::info
The organization select page only shows when the route is `/login`, `<organization>/login`. That means the application should be set as **default application** in the organization or the app-built-in.
:::