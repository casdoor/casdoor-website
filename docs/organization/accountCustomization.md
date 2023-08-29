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
|  ViewRule  |    Rule Items    | Select a rule to use when viewing the account item. |
| ModifyRule |    Rule Items    | Select a rule to use when modifying the account item. |

To customize account items, follow these steps:

1. Go to the Organization Edit page.
2. You will find the following options:

   ![account_customize.png](/img/organization/account_customize.png)

3. Casdoor provides simple operations to configure account items:
   - Set the item to be visible or invisible.

     ![account_visible.png](/img/organization/account_visible.png)

   - Set viewing and modifying rules.

     ![account_rule.png](/img/organization/account_rule.png)

There are 3 rules available:

- `Public`: Everyone has permission.
- `Self`: Each user has their own permission.
- `Admin`: The administrator has permission.

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
