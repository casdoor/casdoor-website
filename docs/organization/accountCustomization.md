---
title: Customize the account page
sidebar_label: Account customization
description: Choose which fields the account page of an organization shows, who can view and edit each field, and how the fields are grouped into tabs.
keywords: [account customization, view rule, modify rule]
authors: [leo220yuyaodog]
---

This guide explains how to configure the account items of an organization. Account items are the fields on the account page and the user edit page of every member of the organization. For each field, you decide whether it is visible, who can view it, and who can edit it.

---

#### Learning outcomes

- Show or hide fields of the account page.
- Restrict who can view and edit a field.
- Group fields into tabs and choose the layout of the tabs.

#### What you need

- Administrator access to the organization in the Casdoor admin console

---

## About account items

Each account item has the following settings:

| Column | Values | Description |
|---|---|---|
| **Name** | A field from the [list of account items](/docs/organization/accountCustomization#account-table) | The field |
| **Visible** | On or off | Whether the field appears on the account page |
| **View rule** | `Public`, `Self`, `Admin` | Who can see the value of the field |
| **Modify rule** | `Self`, `Admin`, `Immutable` | Who can change the value of the field |
| **Tab** | Text | Tab under which the field appears on the user edit page |

The rules have the following meaning:

| Rule | Who can view or change the field |
|---|---|
| `Public` | View rule only. Everyone can see the field of any user |
| `Self` | Each user, for their own account only. Casdoor matches by user ID, or by organization and username if the ID is missing |
| `Admin` | Administrators of the organization only |
| `Immutable` | Modify rule only. Nobody can change the field on the account page |

:::note
View rules and modify rules apply to single fields of a user profile. They are separate from [permissions](/docs/permission/overview), which control access to applications and resources.
:::

## Configure the account items {#configuring-account-items}

1. In the Casdoor admin console, go to **User Management** > **Organizations** and open the organization.
1. Scroll to **Account items**.

   ![Account items of an organization](/img/organization/account_customize.png)

1. To show or hide a field, switch **Visible**.

   ![Visible switch of an account item](/img/organization/account_visible.png)

1. To restrict a field, select a **View rule** and a **Modify rule**.

   ![View rule and Modify rule of an account item](/img/organization/account_rule.png)

1. Save the organization.

### Common patterns {#example-patterns}

| Field | View Rule | Modify Rule | Use Case |
|-------|-----------|-------------|----------|
| Name | Public | Self | Everyone can see names, but users can only change their own |
| Email | Self | Self | Users can only see and change their own email |
| Phone | Admin | Admin | Only admins can see and change phone numbers (for privacy) |
| Display name | Public | Self | Public profile name visible to all |
| Password | Self | Self | Users can only change their own password |

:::tip
Use the `Admin` rule for sensitive fields that only administrators should manage, such as phone numbers, addresses, and internal identifiers.
:::

## Group fields into tabs {#grouping-fields-into-tabs}

Items with the same **Tab** value appear together under one tab of the user edit page. Items without a tab value appear first, outside the tabs.

For example, to create a `Contact` tab with the email address, the phone number, and the location:

1. Open the organization and scroll to **Account items**.
1. Set **Tab** to `Contact` in the rows Email, Phone, and Location.
1. Save the organization. The user edit page now has a `Contact` tab with the three fields.

### Choose the tab layout {#account-menu-layout}

**Account menu** on the organization edit page sets how the tabs are shown:

| Option | Layout |
|---|---|
| **Horizontal** (default) | Tabs across the top of the page |
| **Vertical** | A menu on the left side of the page. Use it for organizations with many tabs |

## List of account items {#account-table}

| Field | Description |
|-------|-------------|
| `Organization` | The organization this user belongs to. |
| `ID` | The user's globally unique identifier (UUID). |
| `Name` | The user's unique login username within the organization. |
| `Display name` | The name shown publicly on the user's profile. |
| `First name` | The user's given name. |
| `Last name` | The user's family name. |
| `Avatar` | The user's profile picture. |
| `User type` | The category of the user account (e.g. normal user, service account). |
| `Password` | The user's login password. |
| `Email` | The user's email address, used for login and notifications. |
| `Phone` | The user's phone number, used for login and SMS verification. |
| `Country code` | The phone country/calling code (e.g. `+1` for the US), used together with `Phone`. |
| `Country/Region` | The user's country or region. |
| `Location` | The user's city or address. |
| `Affiliation` | The user's company, school, or other organizational affiliation. |
| `Title` | The user's job title or position. |
| `ID card type` | The type of government-issued identity document (e.g. passport, national ID card, driver's license). |
| `ID card` | The document number of the user's identity document. |
| `ID card info` | Additional identity document details (e.g. issue date, expiry). Only visible to the user themselves. |
| `Real name` | The user's verified legal name. Locked and cannot be changed after identity verification is completed. |
| `ID verification` | Controls visibility of and access to the **Verify identity** button on the profile page. |
| `Homepage` | The URL of the user's personal website or online profile. |
| `Bio` | A short biography or personal description. |
| `Tag` | One or more custom labels attached to the user, used for filtering or grouping. |
| `Signup application` | The application the user originally signed up through. |
| `Register type` | The method used to register the account (e.g. email, phone, OAuth). |
| `Register source` | The channel or provider through which the user registered (e.g. Google, GitHub, invite link). |
| `Roles` | The roles assigned to this user, which determine access within Casdoor. |
| `Permissions` | The permissions explicitly granted to this user. |
| `Groups` | The user groups this user belongs to. |
| `3rd-party logins` | Linked third-party OAuth accounts (e.g. Google, GitHub, WeChat) used for social login. |
| `Properties` | Custom key-value pairs for storing additional application-specific data about the user. |
| `Balance` | The user's account balance, used for built-in payment or credit features. |
| `Balance credit` | Minimum balance floor for the user's account. Must be ≤ 0. Set to `0` (default) to prevent the balance from going negative. Set to a negative value (e.g. `-50`) to allow the balance to drop as low as that amount before transactions are blocked. |
| `Balance currency` | The currency unit for the user's balance (e.g. `USD`, `CNY`). |
| `Cart` | Items added to the user's shopping cart (for e-commerce integrations). |
| `Score` | A point score assigned to the user, typically by application logic. |
| `Karma` | A reputation score reflecting the user's activity or community standing. |
| `Ranking` | The user's rank among all users, derived from score or other metrics. |
| `Language` | The user's preferred display language for the Casdoor UI. |
| `Is admin` | Whether the user has organization administrator privileges. |
| `Is forbidden` | Whether the user account is banned; forbidden users cannot log in. |
| `Is deleted` | Whether the user account has been soft-deleted (marked as deleted but retained in the database). |
| `Multi-factor authentication` | The user's MFA settings and enrolled second-factor methods (e.g. TOTP app, SMS). |
| `MFA items` | The list of individual MFA methods enrolled by the user. |
| `WebAuthn credentials` | Registered passkeys or hardware security keys (WebAuthn/FIDO2) for passwordless login. |
| `Last change password time` | Timestamp of the user's most recent password change. Admin-only. |
| `Managed accounts` | Sub-accounts or delegated accounts that this user can manage on behalf of others. |
| `Face ID` | Enrolled face recognition data used for biometric login. |
| `MFA accounts` | External accounts linked specifically for multi-factor authentication purposes. |
| `Need update password` | Whether the user is required to change their password at next login. Admin-only. When set, the user is redirected to their **Account** page after sign-in and cannot navigate elsewhere until the password is updated. |
| `IP whitelist` | IP addresses or CIDR ranges from which this user is allowed to sign in. Admin-only. |

## See also

- [Organizations](/docs/organization/overview)
- [Users](/docs/user/overview)
- [MFA items](/docs/organization/mfa-items)
