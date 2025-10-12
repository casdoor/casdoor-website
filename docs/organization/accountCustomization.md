---
title: Account Customization
description: Customizing users' account items
keywords: [account customization]
authors: [leo220yuyaodog]
---

## Introduction

In an organization, you can customize users' **account items**. This includes whether each item is **visible** and its **view rule** and **modify rule**.

When you customize account items in an organization, this configuration takes effect on the home page of all members of that organization.

## How to Customize?

Account items have four attributes:

| Column Name | Selectable Value | Description |
| :---------: | :--------------: | ----------- |
|    Name     |        -         | Account item name. |
|   Visible   | `True` / `False` | Select whether this account item is visible on the user home page. |
|  ViewRule  |    Rule Items    | Select a rule to use when viewing the account item. Controls who can **view** this field. |
| ModifyRule |    Rule Items    | Select a rule to use when modifying the account item. Controls who can **edit** this field. |

### Understanding View Rule and Modify Rule

**View rule** and **Modify rule** provide field-level permission control for user account items:

- **View rule**: Determines who can **see** the value of this account field (e.g., email, phone number, address)
- **Modify rule**: Determines who can **change** the value of this account field

This is different from the broader [Permission](/docs/permission/overview) feature, which controls access to applications and resources. View rule and Modify rule specifically control access to individual user profile fields.

### Configuration Steps

To customize account items, follow these steps:

1. Navigate to **Organizations** in the Casdoor sidebar
2. Click on your organization to open the **Edit Organization** page
3. Scroll down to the **Account items** section

   ![account_customize.png](/img/organization/account_customize.png)

4. Casdoor provides simple operations to configure account items:

   **a. Set item visibility**

   Control whether this account item is shown on the user home page:

   ![account_visible.png](/img/organization/account_visible.png)

   **b. Set viewing and modifying rules**

   Configure who can view and modify each field:

   ![account_rule.png](/img/organization/account_rule.png)

### Available Rules

There are 3 rules available for both View rule and Modify rule:

- **Public**: Everyone has permission. Any user can view/modify this field for any user.
- **Self**: Each user has their own permission. Users can only view/modify their own field values.
- **Admin**: The administrator has permission. Only organization administrators can view/modify this field for users.

### Example Use Cases

Here are some common configuration patterns:

| Field | View Rule | Modify Rule | Use Case |
|-------|-----------|-------------|----------|
| Name | Public | Self | Everyone can see names, but users can only change their own |
| Email | Self | Self | Users can only see and change their own email |
| Phone | Admin | Admin | Only admins can see and change phone numbers (for privacy) |
| Display name | Public | Self | Public profile name visible to all |
| Password | Self | Self | Users can only change their own password |

:::tip

Use **Admin** rules for sensitive fields like phone numbers, addresses, or internal identifiers that should only be managed by administrators.

:::

:::note

These field-level permissions work in conjunction with the broader [Permission system](/docs/permission/overview) in Casdoor. The Permission system controls access to applications and API resources, while View rule and Modify rule control access to specific user profile fields within the **Edit Organization** page configuration.

:::

## Account Table

Below are all the fields in the account item. For descriptions, you can refer to [user](/docs/user/overview).

- `Organization`
- `ID`
- `Name`
- `Display name`
- `Avatar`
- `User type`
- `Password`
- `Email`
- `Phone`
- `Country/Region`
- `Location`
- `Affiliation`
- `Title`
- `Homepage`
- `Bio`
- `Tag`
- `Signup application`
- `3rd-party logins`
- `Properties`
- `Is admin`
- `Is global admin`
- `Is forbidden`
- `Is deleted`
