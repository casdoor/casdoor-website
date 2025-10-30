---
title: Signin Items Table
description: Configure the signin items table to create a custom signin page
keywords: [signin, items, table]
authors: [DacongDA]
---

On the application configuration page, we can configure the signin items table to create a customized registration page. We can add or delete any signin item on this signin items table.

![Signin Items Table](/img/application/signin-items-table/signin-items-table.png)

For a detailed explanation of each signin item, please refer to the table below.

| Column Name | Selectable Value | Description                                                                                                                                                 |
|:-----------:|:----------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    Name     |        -         | The name of the signin item.                                         |
|   Visible   | `True` / `False` | Select whether this signin item is visible on the registration page.                                                                                        |
| Label HTML  | - | If this signin item is added as a custom item, Label should be the html code for this field.   |
| Custom CSS  | - | CSS code for this signin item.  |
|    Placeholder     |        -         | The placeholder of the signin item.                                         |
|    Rule     |  `Rule Items`   | Select a rule to customize this signin item. Detailed rules are described in the table below. |
|   Action    |        -         | Users can perform actions such as moving this signin item up, moving it down, or deleting it.                            |

The Captcha signin item supports configuration rules to control how verification is presented to users.

| Item Name | Selectable Rules | Description                                                                                                        |
|:---------:|:----------------:|--------------------------------------------------------------------------------------------------------------------|
| Captcha   | `Normal` / `Inline` | Choose how captcha verification is displayed. `Normal` shows a modal dialog when sending verification codes. `Inline` displays the captcha directly on the signin page, streamlining the verification process. |
