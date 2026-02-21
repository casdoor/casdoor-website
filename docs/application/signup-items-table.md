---
title: Sign-up Items Table
description: Configure the signup items table to create a custom registration page
keywords: [signup, items, table]
authors: [Resulte]
---

On the application configuration page, we can configure the signup items table to create a customized registration page. We can add or delete any signup item on this signup items table.

![Signup Items Table](/img/application/signup-items-table/signup-items-table.png)

:::tip

When creating applications via the Casdoor SDK, default signup items are automatically initialized (including ID, Username, Display name, Password, Confirm password, Email, Phone, and Agreement). This ensures applications work correctly without manual configuration.

:::

For a detailed explanation of each signup item, please refer to the table below.

| Column Name | Selectable Value | Description                                                                                                                                                 |
|:-----------:|:----------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    Name     |        -         | The name of the signup item.                                                                                                                                           |
|   Visible   | `True` / `False` | Select whether this signup item is visible on the registration page.                                                                                        |
|  Required   | `True` / `False` | Select whether this signup item is mandatory.                                                                                                    |
|  Prompted   | `True` / `False` | Select whether to prompt the user when they forget to fill in this signup item.                                                                               |
|    Regex    |        -         | Regular expression pattern for input validation. When set, the field will be validated against this pattern before submission.   |
| Label  | - | If this signup item start with `Text`, Label should be the html code for this field. If not it will repalce the label of this signup item.   |
| Custom CSS  | - | CSS code for this signup item.  |
|    Rule     |  `Rule Items`   | Select a rule to customize this signup item. Detailed rules are described in the table below. |
|   Action    |        -         | Users can perform actions such as moving this signup item up, moving it down, or deleting it.                            |

Currently, the signup items that support configuration rules include `ID`, `Display name`, `Email`, and `Agreement`.

|  Item Name   |              Selectable Rules              | Description                                                                                                                                                                                                                                                                                                                    |
|:------------:|:------------------------------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      ID      |          `Random` / `Incremental`          | Select whether the user ID should be randomly generated or incremented.                                                                                                                                                                                                                                                               |
| Display name |    `None`/ `Real name` / `First, last`     | Choose how the display name should be presented. Choosing `None` will display `Display name`. Choosing `Real name` will display the user's actual name. Choosing `First, last` will display the first and last name separately.                                                                                                                                    |
|    Email     |        `Normal`/ `No verification`         | Select whether to verify the email address with a verification code. Choosing `Normal` will require email verification. Choosing `No verification` will allow signup without email verification.                                                                                                                                                              |
|  Agreement   | `None`/ `Signin` / `Signin (Default True)` | Select whether the user needs to confirm the terms of use when logging in. Choosing `None` will not display any terms of use, allowing users to log in directly. Choosing `Signin` will require users to confirm the terms before logging in. Choosing `Signin (Default True)` will set the terms as confirmed by default, allowing users to log in directly. |

:::note

For example, let's say I want to set up my registration page to include an email field, but without requiring email verification.

:::

Firstly, I added some signup items necessary for registration, such as ID, Username, Password, and Email.

![Signup Items Table](/img/application/signup-items-table/signup-items-table-demo-config.png)

Then, I selected the email row's rule item as `No verification`. As a result, the generated preview registration page will have the desired effect.

![Signup Items Table](/img/application/signup-items-table/signup-items-table-demo-page.png)

:::note

When the organization's "Use email as username" option is enabled and the username field is not visible in the signup items table, the user's email address will automatically be used as their username during registration.

:::

## Field Validation

You can add regex patterns to validate user input during signup. The validation happens on the client side, providing immediate feedback to users before they submit the form. To add validation:

1. Set the **Regex** field for any signup item (e.g., Username, Display name, or custom fields)
2. Enter a valid regular expression pattern (e.g., `^[a-zA-Z0-9_]+$` for alphanumeric usernames)
3. Users will see an error message if their input doesn't match the pattern

This works for standard fields (Username, Display name, First name, Last name, Affiliation) and custom input fields, ensuring data quality before it reaches the backend.
