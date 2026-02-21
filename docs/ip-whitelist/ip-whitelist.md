---
title: Overview
description: Restrict access to entry pages by IP address.
keywords: [ip, allowlist, ip allowlist]
authors: [ZhaoYP-2001]
---

Casdoor supports the ip whitelist function of the entry page. When a user accesses the entry page (login/signup/forget-password), Casdoor will decide whether to allow the user to access the entry page based on whether the client IP is in the whitelist. Here, we will show you how to enable the option to specify the ip whitelist function of the entry page at the user, application and organization levels.

## Configuration

### User Level

Casdoor will first determine whether the client address meets the user-level ip whitelist requirements.

If you want to specify user-level ip whitelist, you first need to add the "IP whitelist" account item on the edit page of the organization to which the user belongs. Then specify your ip whitelist by filling in the comma separated CIDR list, such as 192.168.1.0/24,25.112.0.0/16. If the ip whitelist is empty, it means there is no restriction on the client IP address.

![user_ip_whitelist](/img/ip-whitelist/user_ip_whitelist.png)

:::info

If you forget how to customize users' **account items**, Please refer to the **[Account Customization](organization/accountCustomization.md)**

:::

### Application Level

If the client IP address passes the user-level check, Casdoor will proceed to perform application-level check. You can specify the ip whitelist through the `IP whitelist` configuration option on the application edit page.

![app_ip_whitelist](/img/ip-whitelist/app_ip_whitelist.png)

### Organization Level

Organization-level check will be performed last. You can use the `IP whitelist` configuration option on the organization edit page to specify organization-level ip whitelist.

![org_ip_whitelist](/img/ip-whitelist/org_ip_whitelist.png)

Here is a demo video that shows how to use ip whitelist:

<video src="/img/ip-whitelist/ip_whitelist.mp4" controls="controls" width="100%"></video>
