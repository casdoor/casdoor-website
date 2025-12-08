---
title: Overview
description: Managing invitations in casdoor
keywords: [invitations]
authors: [HGZ-20]
---

Currently casdoor already supports a more flexible invitation code method for user registration. Once the administrator opens the registration page with the invitation code as a mandatory option, users can only register if they have a valid invitation code.

![Add Invitation Code to sign up item](/img/invitation/signup-add-invitation-code.png)

There are two main ways to use invitation codes, the default added is a random string code, composed of random numbers and letters. In order to be more flexible, the invitation code also supports regular matching to match multiple different invitation codes.
![Invitations](/img/invitation/invitations.png)

## Invitation Properties

Casdoor manages invitations through the following properties

- `Organization`: The organization that owns the invitation
- `Name`: The unique invitation name
- `Display name`: Displayed Invitation Name
- `Code`: Invitation code, you can fill in the specific invitation code string, you can also fill in the regular expression
- `Default code`: Used to populate the default invitation code in the invitation link. For randomly generated invitation codes, the default code is the same as the invitation code. For code in regular expression form, you need to fill in the default code by yourself that matches the regular expression rule in the code
- `Quota`: Maximum number of times an invitation code can be used
- `Used count`: Number of times the invitation code has been used
- `Application`: Allow applications that use this invitation code. Selecting `ALL` makes it available to all apps under the organization. For [shared applications](/docs/application/shared-application), the invitation system automatically handles organization-specific links
- `Username`: Specific username required when registering with this invitation
- `Email`: Specific email required when registering with this invitation
- `Phone`: Specific phone required when registering with this invitation
- `State`: Status of invitation

## Default Invitation

The invitation code in the default invitation is a randomly generated string of numbers and letters, and with `Quota` set to 1, it can only be used once. Application are set to `ALL` by default, which means that all apps under the organization corresponding to this invitation can use this invitation code.

![Default Invitation](/img/invitation/default-invitation.png)

If the invitation code is set for a specific user and you want the user to register with the given `username`, `email`, `phone` and `invitation code`, you can restrict the user's registration by filling in the corresponding fields. If the fields are empty or if they are not configured on the registration page, casdoor does not force validation of these fields

![Configure the user information corresponding to the invitation code](/img/invitation/invitation-with-user-information.png)

When it is necessary to reuse an invitation code, you can set `Quota` to a larger value, for example, if you want this invitation code to be used 10 times, then you can set `Quota` to 10. When you wish to stop registering with this invitation code, you can also do this by modifying the status of the invitation to `Suspended`.

![Invitation quota and state](/img/invitation/invitation-quota-state.png)

:::caution

When `username`, `email`, or `phone` is configured in the invitation, the `quota` should not be greater than one. This is because the user's `username`, `email`, and `phone` should be unique, and multiple users should not be able to register using the same `username`, `email`, or `phone`.

:::

## Regular Match Invitation

Sometimes there is a need for a large number of invitation codes for user registration, and generating invitation codes one by one can be very inefficient. Casdoor supports validating invitation codes through regular expression matching. For example, by setting the `Code` as `"[a-z]2333"`, any invitation code that matches this regular expression will be successfully matched as a valid invitation code.

![Regular Match Invitation](/img/invitation/regular-match-invitation.png)

:::note

When using regular expressions to validate invitation codes, each invitation code that matches the regular expression can only be used once, and the `Quota` can still limit the number of usages. For example, when the `Code` is `"[a-z]2333"` and the `Quota` is 2, only a maximum of two invitation codes that match the regular expression can be successfully used.

:::

## Invitation Link

Casdoor supports copying the invitation link corresponding to an invitation. The invitation code in the invitation link corresponds to the Default code field. Therefore, for invitations that use regular expressions, the Default code must be manually filled in to generate the correct invitation link. Additionally, when registering using an invitation link, the registration page will automatically populate certain field information set by the invitation corresponding to the invitation code.

When sending invitations for [shared applications](/docs/application/shared-application), the system automatically generates organization-specific links with the correct `-org-{orgName}` suffix, ensuring users can successfully complete registration through the invitation.

![Invitation Link](/img/invitation/invitation-link-copy.png)

![Registration page corresponding to the invitation link](/img/invitation/signup-with-invitation-code.png)

## Demo

<video src="/video/invitation/invitation.mp4" controls="controls" width="100%"></video>
