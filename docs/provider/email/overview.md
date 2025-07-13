---
title: Overview
description: Using Email for authentication
keywords: [email]
authors: [kininaru]
---

## Adding an Email provider

1. Click on `Add` to add a new provider.
2. Select `Email` under the `Category` section.

    ![Email provider](/img/providers/emailprovider.png)

3. Fill in the fields for `Username`, `Password`, `Host`, and `Port` for your SMTP service.

    ![Email Config](/img/providers/emailconfig.png)

4. Customize the `Email Title` and `Email Content`, then save the changes.

## Modify email content

You can use the following placeholders to display some variables.

1. `%{user.friendlyName}` is the Display name of user.

2. `%link` is the reset link for forget password function. (You should put `%link` in the `<reset-link></reset-link>` label)
