---
title: Sign-in items table
description: Configure signin items to build a custom sign-in page.
keywords: [signin, items, table]
authors: [DacongDA]
---

On the application configuration page, use the **Sign-in items** table to define which elements appear on the sign-in page. Add, remove, or reorder items to customize the form.

![Signin Items Table](/img/application/signin-items-table/signin-items-table.png)

## Column reference

| Column | Values | Description |
|--------|--------|-------------|
| **Name** | — | Name of the signin item. |
| **Visible** | `True` / `False` | Show or hide on the sign-in page. |
| **Label HTML** | — | For custom items, HTML used as the field label. |
| **Custom CSS** | — | CSS for this signin item. |
| **Placeholder** | — | Placeholder text for the field. |
| **Rule** | Rule items | Rule that customizes this item (see below). |
| **Action** | — | Move up, move down, or delete. |

## Captcha rules

The **Captcha** item supports rules that control how verification is shown:

| Rule | Description |
|------|-------------|
| **Normal** | Captcha is shown in a modal when sending verification codes. |
| **Inline** | Captcha is shown directly on the sign-in page. |
