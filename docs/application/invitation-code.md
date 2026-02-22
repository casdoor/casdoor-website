---
title: Invitation codes
description: Restrict application sign-up to users with a valid invitation code.
keywords: [application, signup, invitation code]
authors: [leo220yuyaodog]
---

Invitation codes let you restrict who can sign up for an application. An admin creates one or more codes per application; each code can be used multiple times. Sign-up is allowed only when the user provides a valid code.

## Configuration

1. Add the **Invitation code** signup item to the [sign-up items table](/docs/application/signup-items-table).
2. On the application configuration page, add the invitation codes you want to allow.

![invitation code](/img/application/invitation-code/invitation_code_config.png)

:::tip
Once the application has invitation codes, sign-up requires a valid code. This applies even if the "Invitation code" signup item is hidden—users must still supply a valid code (e.g. in a hidden field or flow). Always add the Invitation code signup item when using this feature.
:::

Demo:

![invitation code demo](/img/application/invitation-code/invitation_demo.gif)
