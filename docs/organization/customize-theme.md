---
title: Customize the theme
sidebar_label: Customize theme
description: Set the primary color and the border radius of the Casdoor pages for an organization or for a single application.
keywords: [theme, organization, application]
authors: [leo220yuyaodog]
---

This guide explains how to match the Casdoor pages to your brand by setting the primary color and the border radius.

---

#### Learning outcomes

- Understand the three levels of themes.
- Set the theme of an organization.
- Set the theme of a single application.

#### What you need

- Administrator access to the Casdoor admin console

---

## Theme levels

| Level | Where you set it | Where it applies |
|---|---|---|
| Global | In the source code only, in [`web/src/Conf.ts`](/docs/basic/configuration#compile-time-frontend-settings) | Every organization that has no theme of its own |
| Organization | Edit page of the organization | All pages of the admin console for members of the organization, and the entry pages (sign-in, sign-up, forgot password, and so on) of the applications that follow the organization theme |
| Application | Edit page of the application | The entry pages of that application only |

## Set the theme of an organization {#organization-theme}

1. In the Casdoor admin console, open the edit page of the organization.
1. In **Theme**, set the primary color and the border radius.
1. Save the organization.

![Recording of editing the theme of an organization](/img/organization/edit_theme.gif)

If you edit the organization that you are signed in to, the change applies at once. Otherwise, sign in to that organization to see the theme.

## Set the theme of an application {#application-theme}

1. Open the edit page of the application.
1. Turn off **Follow organization theme**, and set the primary color and the border radius in the theme editor.
1. Check the result in the preview panel of the application.

   ![Theme preview on the application edit page](/img/organization/application_preview.png)

1. Save the application.

## See also

- [UI customization](/docs/application/ui-customization)
- [Configuration reference](/docs/basic/configuration)
