---
title: Customize the sign-up form
sidebar_label: Sign-up items table
description: Choose which fields the sign-up page of an application shows, which are required, how they are validated, and how some of them behave.
keywords: [signup, items, table, registration]
authors: [Resulte]
---

This guide explains how to build the sign-up form of an application with the **Signup items** table.

---

#### Learning outcomes

- Add, remove, and order the fields of the sign-up form.
- Make fields required and validate them with regular expressions.
- Change the behavior of fields with rules.

#### What you need

- An [application](/docs/application/overview) with **Enable signup** turned on

---

## About the sign-up items

Each row of **Signup items** is one field or element of the sign-up page. Applications that you create through the Casdoor SDK get default items: ID, Username, Display name, Password, Confirm password, Email, Phone, and Agreement.

![Signup items table of an application](/img/application/signup-items-table/signup-items-table.png)

## Columns {#column-reference}

| Column | Values | Description |
|--------|--------|-------------|
| **Name** | — | Name of the signup item. |
| **Visible** | `True` / `False` | Show or hide on the registration page. |
| **Required** | `True` / `False` | Whether the field is mandatory. |
| **Prompted** | `True` / `False` | Whether to prompt the user if they leave it empty. |
| **Regex** | — | Optional regex for client-side validation. |
| **Label** | — | For items starting with `Text`, use HTML for the field; otherwise replaces the item label. |
| **Custom CSS** | — | CSS for this signup item. |
| **Rule** | Rule items | Rule that customizes this item (see table below). |
| **Action** | — | Move up, move down, or delete. |

## Configure the form

1. In the Casdoor admin console, open the edit page of the application.
1. In **Signup items**, add, remove, and order the items, and set **Visible** and **Required** for each one.
1. Set a rule for the items that support one. See [Item rules](#item-rules).
1. Save the application.

For example, to show an email field that doesn't need verification, add the Email item and set its rule to `No verification`.

![Signup items configured with an email field without verification](/img/application/signup-items-table/signup-items-table-demo-config.png)

The sign-up page then looks like this:

![Sign-up page with an email field](/img/application/signup-items-table/signup-items-table-demo-page.png)

## Item rules

| Item | Rules | Description |
|------|-------|-------------|
| **ID** | `Random` / `Incremental` | User ID generation: random or incremental. |
| **Display name** | `None` / `Real name` / `First, last` | How to show the display name; `First, last` shows first and last name separately. |
| **Email** | `Normal` / `No verification` | `Normal` = require email verification; `No verification` = skip verification. |
| **Agreement** | `None` / `Signin` / `Signin (Default True)` | Terms of use: none, require confirmation, or default to confirmed. |
| **Languages** | `None` / `Label` | Adds a language selector to the sign-up page. `None` = show the selector on its own; `Label` = show it with a text label. |

## Let users choose a tag {#tag-item}

The **Tag** item adds a list from which users pick their own [tag](/docs/application/tags) at sign-up. It is hidden by default. Turn on **Visible** to show it.

- The options come from the **Options** of the item. If the item has no options, they come from the **Tags** of the application.
- A tag that the user selects takes precedence over the **Default tag** of the application, which applies only when the user selects none.

## Validate input with a regular expression {#field-validation}

1. In the row of the item, set **Regex** to a pattern, for example `^[a-zA-Z0-9_]+$` for usernames of letters, digits, and underscores.
1. Save the application.

The sign-up page shows an error before submission when the input doesn't match. Validation works for Username, Display name, First name, Last name, Affiliation, and custom fields.

## Use the email address as username

If the organization has **Use Email as username** turned on and the Username item is hidden, the email address of the user becomes the username. See [Organizations](/docs/organization/overview#use-email-as-username).

## See also

- [Sign-in items](/docs/application/signin-items-table)
- [Invitation codes](/docs/application/invitation-code)
- [Application tags](/docs/application/tags)
