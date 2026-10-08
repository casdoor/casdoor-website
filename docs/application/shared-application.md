---
title: Share an application between organizations
sidebar_label: Shared application
description: Let the users of every organization sign in to one application, with a client ID per organization.
keywords: [shared, application, multi-tenant]
authors: [DacongDA]
---

This guide explains shared applications. A shared application serves all organizations: the users of each organization sign in to the same application, and each organization uses its own client ID.

---

#### Learning outcomes

- Share an application.
- Build the client ID and the sign-in URL for an organization.

#### What you need

- An application of the `built-in` organization. Only the `built-in` organization can share applications.

---

## Share the application {#configuration}

1. In the Casdoor admin console, open the edit page of the application.
1. Turn on **Is shared**.

   ![Is shared switch of the application](/img/application/shared-application/shared_application_field.png)

1. Save the application.

:::caution
A shared application is available to all organizations. You can't limit it to some of them.
:::

## Use the application for an organization

To refer to the application for one organization, append `-org-<organization-name>` to its client ID or its name.

For example, the application has the client ID `2dc94ccbec09612c04ac`. For the organization `casbin`, the client ID is `2dc94ccbec09612c04ac-org-casbin`, and the authorization URL is:

```text
https://door.casdoor.com/login/oauth/authorize?client_id=2dc94ccbec09612c04ac-org-casbin&response_type=code&redirect_uri=...&scope=read&state=casdoor
```

Users who sign in through this URL sign in to the organization `casbin`.

![Sign-in link of a shared application for one organization](/img/application/shared-application/shared_application_login_link.png)

<video src="/img/application/shared-application/shared_application_demo.mp4" controls="controls" width="100%"></video>

## Invitations

For [invitations](/docs/invitation/overview) to a shared application, Casdoor generates links with the `-org-<organization-name>` suffix, so that users register in the right organization.

## See also

- [Let users choose their organization at sign-in](/docs/application/specify-login-organization)
- [Organizations](/docs/organization/overview)
