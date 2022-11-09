---
title: Account Customization
description: Customizing users' account items
keywords: [account customization]
author: leo220yuyaodog
---

## Introduction

In an organization, you can customize users' **account items**. This includes whether each item is **visible**. If visible, 
its **view rule** and **modify rule**. 

When you customize account items in an organization, this configuration 
takes effect on the home page of all members of that organization.

## How to customize?

Account item has four attributes:

|    Column Name    |   Selectable Value  | Description    |
| :---------: | :------------------------------: | -----------|
|    Name    |    -    | Account item name.                                                  |
|    Visible    |      `True` / `False`      | Select whether this account item is visible on the user home page.                                                    |
| ViewRule | `Rule Items` | Select a rule to use with view the account item. |
| ModifyRule | `Rule Items` | Select a rule to use with modify the account item. |

Enter the Organization Edit page, you will find the following:

![account_customize.png](/img/organization/account_customize.png)

Casdoor provides very simple operations to configure:

- Set the item to be visible or invisible

![account_visible.png](/img/organization/account_visible.png)

- Set viewing and modifying rules

![account_rule.png](/img/organization/account_rule.png)

There are 3 rules:

- `Public`: Everyone has permission
- `Self`: The users has their own permission
- `Admin`: The administrator has permission

## Account table

The following are all the fields in account item. For a description, you can see [user](/docs/user/overview).

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
