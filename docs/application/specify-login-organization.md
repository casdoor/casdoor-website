---
title: Let users choose their organization at sign-in
sidebar_label: Specify login organization
description: Show an organization picker or an organization field on the sign-in page, so that users of several organizations share one sign-in page.
keywords: [UI, login, application, organization]
authors: [leo220yuyaodog]
---

This guide explains how to let users choose or enter their organization on the sign-in page. For example, `/login` is the sign-in page of the `built-in` organization. With this option on `app-built-in`, users choose an organization first and Casdoor sends them to `/login/<organization>`.

---

#### Learning outcomes

- Show an organization picker or an input field on the sign-in page.
- Understand how Casdoor remembers the organization of a user.

#### What you need

- An application that is the default application of its organization, or `app-built-in`

---

## Show the organization choice {#configuration}

1. In the Casdoor admin console, open the edit page of the application.
1. Set **Org choice mode**:

   | Mode | Behavior |
   |------|----------|
   | **None** | Organization selection is not shown. |
   | **Input** | User types the organization name in an input. |
   | **Select** | User chooses the organization from a dropdown. |

   ![Org choice mode setting](/img/application/specify-login-organization/mode_config.png)

1. Save the application.

With `Input`, the sign-in page shows a field for the organization name:

![Sign-in page with an organization field](/img/application/specify-login-organization/mode_input.png)

With `Select`, it shows a list of organizations:

![Sign-in page with an organization list](/img/application/specify-login-organization/mode_select.png)

:::info
The organization choice appears only on `/login` and `/login/<organization>`, and only if the application is the default application of the organization or `app-built-in`.
:::

## Return to the same organization {#automatic-redirect-after-session-expiry}

When a user visits the sign-in page of an organization, such as `/login/my-org`, the browser remembers the organization. When the session of the user expires, Casdoor sends the user to the sign-in page of that organization instead of `/login`.

If the browser hasn't stored an organization, Casdoor sends the user to `/login`, where the user chooses the organization if the mode is `Input` or `Select`.

## See also

- [Organizations](/docs/organization/overview)
- [Shared applications](/docs/application/shared-application)
