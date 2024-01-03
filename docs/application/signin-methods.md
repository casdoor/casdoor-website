---
title: Signin Methods
description: Configure the login method and the display order of the login methods
keywords: [signin, method]
authors: [HGZ-20]
---

On the Application Configuration page, we can configure the sign-in item table. We can add and remove sign-in items from the table.

![Signin Methods](/img/application/signin-methods/signin-methods.png)

For a detailed explanation of each sign-in item, please refer to the table below. Currently, only `Password`, `verification code` and `WebAuthn` login methods are available.

| Column Name | Selectable Value | Description                                                                                                                                                 |
|:-----------:|:----------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    Name     |        -         | The name of the sign-in method.                                                                                                                                           |
|   DisplayName   | - | The name which the sign-in method displays to the public.                                                                                        |
|    Rule     |  `Rule Items`   | Select a rule to customize this sign-in method. Detailed rules are described in the table below. |
|   Action    |        -         | Users can perform actions such as moving this sign-in method up, moving it down, or deleting it.                            |

Currently, only the `Verification code` sign-in method supports configuration rules.

| Sign-in Method Name |              Selectable Rules              | Description                                                                                                                                                                                                                                                                                                                    |
|:-------------------:|:------------------------------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  Verification code  | `All(default)`/ `Email only` / `Phone only` | Select the sign-in methods available to the user. Choosing `All` , then both email and phone numbers can be verified for sign-in. Choosing `Email only` , then only eamil login is allowed. Choosing `Phone only`, then only the phone number is allowed to authenticate the login. |

:::note

For example, we want users to prioritize logging in with their email, and then consider logging in with a password if they can't use their email.

:::

First, we configure two login options, `Verification Code` and `Password`, and `Verification Code` is the first login option. Then we change the `verification code` rule to `Email only`, so that the user can only receive the login verification code by email.

![Signin Methods](/img/application/signin-methods/signin-methods-demo-config.png)

To make it easier for users to understand, we can change the display name of the `Verification code` login method so that users can easily understand that it is an email login.

![Signin Methods](/img/application/signin-methods/signin-methods-demo-page.png)

:::tip

All sign-in methods will be added by default, it is required that at least one sign-in method be added.

:::

Here is a video of how the sign-in method works:

<video src="/video/application/signin-methods-demo.mp4" controls="controls" width="100%"></video>
