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

## Proxy configuration

If your server cannot directly access the SMTP service (such as Gmail), you can enable the proxy option. When enabled, email traffic will be routed through the SOCKS5 proxy configured in Casdoor's configuration file.

To enable proxy support, toggle the `Enable proxy` switch in the provider settings. This is particularly useful when connecting to external email services from restricted network environments.

## Modify email content

You can use the following placeholders to display some variables.

1. `%{user.friendlyName}` is the Display name of user.

2. `%link` is the reset link for forget password function. (You should put `%link` in the `<reset-link></reset-link>` label)
