---
title: Specify Login Organization
description: Specify the login organization on the login page
keywords: [UI, login, application, organization]
authors: [leo220yuyaodog]
---

Here, we will show you how to enable the option to specify the login organization for the application.

For example, the endpoint `/login` is the default sign-in page for accounts belonging to the **built-in** organization. However, you can enable the option to specify the login organization on the **app-built-in** application that belongs to the **built-in** organization. This allows the user to select an organization when logging in. After the user selects the organization, they will be redirected to `/login/<organization>`.

## Configuration

On the application edit page, you can find the `Org select mode` configuration option. You can select the mode from the dropdown list.

![mode_config](/img/application/specify-login-organization/mode_config.png)

- None: The organization select page will not be shown.
- Input: The user can input the organization name in the input box.
- Select: The user can select the organization from the dropdown list.

![mode_input](/img/application/specify-login-organization/mode_input.png)

![mode_select](/img/application/specify-login-organization/mode_select.png)

:::info
The organization select page will only be shown when the route is `/login` or `<organization>/login`. This means that the application should be set as the **default application** in the organization or the app-built-in.
:::
