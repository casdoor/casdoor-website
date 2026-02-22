---
title: Sign-up items table
description: Configure signup items to build a custom registration page.
keywords: [signup, items, table, registration]
authors: [Resulte]
---

On the application configuration page, use the **Sign-up items** table to define which fields appear on the registration page. Add, remove, or reorder items to customize the form.

![Signup Items Table](/img/application/signup-items-table/signup-items-table.png)

:::tip
Applications created via the Casdoor SDK get default signup items (ID, Username, Display name, Password, Confirm password, Email, Phone, Agreement). You can adjust them as needed.
:::

## Column reference

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

Items that support **rules**: ID, Display name, Email, Agreement.

| Item | Rules | Description |
|------|-------|-------------|
| **ID** | `Random` / `Incremental` | User ID generation: random or incremental. |
| **Display name** | `None` / `Real name` / `First, last` | How to show the display name; `First, last` shows first and last name separately. |
| **Email** | `Normal` / `No verification` | `Normal` = require email verification; `No verification` = skip verification. |
| **Agreement** | `None` / `Signin` / `Signin (Default True)` | Terms of use: none, require confirmation, or default to confirmed. |

:::note
Example: to show an email field without verification, add the Email signup item and set its rule to **No verification**.
:::

![Signup Items Table](/img/application/signup-items-table/signup-items-table-demo-config.png)

![Signup Items Table](/img/application/signup-items-table/signup-items-table-demo-page.png)

:::note
If the organization has "Use email as username" enabled and the username field is hidden in signup items, the user’s email is used as their username.
:::

## Field validation

Use the **Regex** column to validate input on the client before submit:

1. Set **Regex** on the signup item (e.g. Username, Display name, or a custom field).
2. Enter a pattern (e.g. `^[a-zA-Z0-9_]+$` for alphanumeric usernames).
3. Users see an error when input does not match.

Works for standard fields (Username, Display name, First name, Last name, Affiliation) and custom fields.
