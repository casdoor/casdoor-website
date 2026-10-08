---
title: Customize the sign-in page
sidebar_label: Sign-in items table
description: Choose which elements the sign-in page of an application shows and how the forgot-password link, the language selector, and the captcha behave.
keywords: [signin, items, table]
authors: [DacongDA]
---

This guide explains how to choose the elements of the sign-in page of an application with the **Signin items** table.

---

#### Learning outcomes

- Show, hide, and order the elements of the sign-in page.
- Turn off the forgot-password feature.
- Change how the language selector and the captcha appear.

#### What you need

- An [application](/docs/application/overview)

---

## About the sign-in items

Each row of **Signin items** is one element of the sign-in page.

![Signin items table of an application](/img/application/signin-items-table/signin-items-table.png)

## Columns {#column-reference}

| Column | Values | Description |
|--------|--------|-------------|
| **Name** | — | Name of the signin item. |
| **Visible** | `True` / `False` | Show or hide on the sign-in page. |
| **Label HTML** | — | For custom items, HTML used as the field label. |
| **Custom CSS** | — | CSS for this signin item. |
| **Placeholder** | — | Placeholder text for the field. |
| **Rule** | Rule items | Rule that customizes this item (see below). |
| **Action** | — | Move up, move down, or delete. |

## Configure the page

1. In the Casdoor admin console, open the edit page of the application.
1. In **Signin items**, add, remove, and order the items, and set **Visible** for each one.
1. Set a rule for the items that support one.
1. Save the application.

## Turn off the forgot-password feature {#forgot-password-visibility}

Set **Visible** of the **Forgot password?** item to off. This turns off the feature in the UI and in the API: the `/api/send-verification-code` endpoint then rejects password reset requests, so that clients can't get around the hidden link by calling the API.

## Change the language selector {#language-selector-rules}

The rule of the **Languages** item sets how the language selector appears on the sign-in and sign-up pages:

| Rule | Description |
|------|-------------|
| (empty) | Globe icon dropdown (default behavior). |
| **Label** | A labeled Select component is shown instead of the icon dropdown. |

## Change the captcha {#captcha-rules}

The rule of the **Captcha** item sets where the captcha appears:

| Rule | Description |
|------|-------------|
| **Normal** | Captcha is shown in a modal when sending verification codes. |
| **Inline** | Captcha is shown directly on the sign-in page. |

## See also

- [Sign-in methods](/docs/application/signin-methods)
- [Customize the sign-up form](/docs/application/signup-items-table)
- [UI customization](/docs/application/ui-customization)
- [Captcha providers](/docs/provider/captcha/overview)
