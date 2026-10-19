---
title: Admin console
description: Find objects with the command palette, and choose columns and delete several rows at once on the list pages of the Casdoor admin console.
keywords: [Casdoor, admin console, command palette, search, bulk delete, columns]
authors: [hsluoyz]
---

The Casdoor admin console is the web interface where administrators manage organizations, users, applications, providers, and the other objects of Casdoor. Every object type has a list page and an edit page. This page describes the tools that all pages share.

## Search with the command palette

The command palette opens a page or an object by its name, without paging through a list.

1. Press Ctrl+K, or ⌘K on macOS, or click **Search** in the header. The palette opens and lists the console pages.
1. Type part of a name. From the second character on, the palette also shows up to 5 matching objects of each kind:
   - **Users** of the organization that is selected in the header. If you aren't a global administrator, your own organization.
   - **Applications** of that organization, or of all organizations when **All** is selected.
   - **Organizations**, for global administrators only.
1. Select a result to open its page.

The palette searches the `name` field of each object, the same search that the **Name** column of a list page runs.

## Choose the columns of a list

1. On a list page, click **Columns**. The button shows how many columns are visible.
1. Select or clear the columns that you want to see. The menu stays open, so you can change several columns in one go.
1. To show every column again, click **Select all**. To go back to the default columns, click **Reset**.

Casdoor saves the choice per list page in the local storage of your browser, so other administrators and other browsers keep their own columns.

## Delete several rows at once

1. On a list page, select the checkboxes of the rows that you want to delete. The checkbox in the header row selects all rows of the current page.
1. At the bottom of the list, check the number after **Selected**, and then click **Delete**.
1. Confirm the deletion.

Rows whose own **Delete** button is disabled, such as the `built-in` organization or the `app-built-in` application, are skipped. The selection is cleared when you go to another page of the list or run a search. To clear it yourself, click **Reset** next to **Selected**.

:::caution
The list page has no undo. Check the number of selected rows before you confirm.
:::

## See also

- [Core concepts](/docs/basic/core-concepts)
- [Upgrade from v3 to v4](/docs/deployment/upgrade-v3-to-v4)
