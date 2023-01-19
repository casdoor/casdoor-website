---
title: Signup Items Table
description: configure the signup items table to create a custom registration page
keywords: [signup, items, table]
authors: [Resulte]
---

On the application configuration page, we can configure the signup items table to create a customized registration page. And we can add or delete any signup item on this signup items table.

![Signup Items Table](/img/application/signup-items-tabel/signup-items-table.png)

For a detailed explanation of each signup item, please see the table below.

| Column Name | Selectable Value | Description                                                                                                                                                 |
|:-----------:|:----------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    Name     |        -         | Signup item name.                                                                                                                                           |
|   visible   | `True` / `False` | Select whether this signup item is visible on the registration page.                                                                                        |
|  required   | `True` / `False` | Select whether this signup item is mandatorily required.                                                                                                    |
|  prompted   | `True` / `False` | Select whether to give a prompt when user forget to fill in this signup item.                                                                               |
|    rule     |  `Rule Items`   | Select a rule to use with this signup item. The rule is to add some customization to this signup item. The detailed rules are described in the table below. |
|   Action    |        -         | Users can take some action here, such as moving this signup item up, moving this signup item down, or deleting this signup item.                            |

So far, the signup items that support configuration rules include `ID`, `Display name`, `Email` and `Agreement`.

|  Item Name   |              Selectable Rules              | Description                                                                                                                                                                                                                                                                                                                    |
|:------------:|:------------------------------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      ID      |          `Random` / `Incremental`          | Select whether the user ID is randomly generated or incremented.                                                                                                                                                                                                                                                               |
| Display name |    `None`/ `Real name` / `First, last`     | Choose the presentation of the display name. Choose `None` will show `Display name`. Choose `Real name` will show `Real name`. Choose `First, last` will show `First name` and `last name`.                                                                                                                                    |
|    Email     |        `Normal`/ `No verification`         | Select whether to verify the verification code of the mailbox. Choose `Normal` will verify the email code. Choose No verification will not verify the email code.                                                                                                                                                              |
|  Agreement   | `None`/ `Signin` / `Signin (Default True)` | Select whether the user needs to confirm terms of use when logging in. Choose `None` to not display terms of use, and users can log in directly. Choose `Signin` to require users to confirm the terms before logging in. Choose `Signin (Default True)` to set the terms confirmed by default, and users can log in directly. |

:::note

Here, for example, I want to setup my registration page bring a mailbox but do not require a mail verification code.

:::

Firstly, I added some signup items necessary for registration, such as ID, Username, Password, Email.

![Signup Items Table](/img/application/signup-items-tabel/signup-items-table-demo-config.png)

And I selected the email row's rule item to `No verification`. As a result, the generated preview registration page can get the expected effect.

![Signup Items Table](/img/application/signup-items-tabel/signup-items-table-demo-page.png)
