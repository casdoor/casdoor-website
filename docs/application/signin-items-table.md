---
title: Customize the sign-in page
sidebar_label: Sign-in items table
description: Choose which elements the sign-in page of an application shows and how the forgot-password link, the language selector, and the captcha behave.
keywords: [signin, items, table]
authors: [DacongDA]
---

This guide explains how to choose the elements of the sign-in page of an application with the **Signin items** table.

---

#### Learning outcomes

- Show, hide, and order the elements of the sign-in page.
- Understand the forgot-password flow and turn it off.
- Show the terms of use on the sign-in page.
- Change how the language selector and the captcha appear.

#### What you need

- An [application](/docs/application/overview)

---

## About the sign-in items

Each row of **Signin items** is one element of the sign-in page.

![Signin items table of an application](/img/application/signin-items-table/signin-items-table.png)

## Columns {#column-reference}

| Column | Values | Description |
|--------|--------|-------------|
| **Name** | — | Name of the signin item. |
| **Visible** | `True` / `False` | Show or hide on the sign-in page. |
| **Label HTML** | — | For custom items, HTML used as the field label. |
| **Custom CSS** | — | CSS for this signin item. |
| **Placeholder** | — | Placeholder text for the field. |
| **Rule** | Rule items | Rule that customizes this item (see below). |
| **Action** | — | Move up, move down, or delete. |

## Configure the page

1. In the Casdoor admin console, open the edit page of the application.
1. In **Signin items**, add, remove, and order the items, and set **Visible** for each one.
1. Set a rule for the items that support one.
1. Save the application.

## Forgot-password flow {#forgot-password-flow}

The **Forgot password?** link opens the forgot-password page of the application. On that page, the user enters an account, receives a verification code, and sets a new password.

- The page offers email only if the application has an Email provider, and SMS only if it has an SMS provider. A provider counts when its rule in the **Providers** table is `Forget Password` or `All`. See [Provider rules](/docs/application/providers#provider-rules).
- The placeholder of the account field follows the providers: `username or Email` with only an Email provider, `username or phone` with only an SMS provider, and `username, Email or phone` otherwise.
- Casdoor trims the input and matches the username and the email address case-insensitively. A phone number in E.164 format, such as `+8613800000000`, matches the national number that Casdoor stores.
- If the account has no email address or phone number that one of the providers can reach, the page shows "No verification method".

### Users synced from LDAP

The password of an LDAP user lives on the LDAP server. Casdoor refuses the forgot-password flow for these users before it sends a code, with the error "the password of the LDAP user: `<name>` is managed by the LDAP server, please contact your administrator to reset it". To let them reset the password, turn on **Enable password reset** on an LDAP server of the organization. See [Reset passwords of LDAP users](/docs/ldap/config#reset-passwords-of-ldap-users).

### Turn off the forgot-password feature {#forgot-password-visibility}

Set **Visible** of the **Forgot password?** item to off. This turns off the feature in the UI and in the API: the `/api/send-verification-code` endpoint then rejects password reset requests, so that clients can't get around the hidden link by calling the API.

## Show the terms of use {#agreement}

The **Agreement** item adds a checkbox for the terms of use to the sign-in page. Casdoor shows it only when both of these are true:

- **Terms of Use** of the application is set. See [Application settings reference](/docs/application/terminology#security).
- **Visible** of the **Agreement** item is on.

The checkbox starts checked. If the user unchecks it and then submits the sign-in form or clicks a provider button, Casdoor shows "Please accept the agreement!" and doesn't sign the user in.

## Change the language selector {#language-selector-rules}

The rule of the **Languages** item sets how the language selector appears on the sign-in and sign-up pages:

| Rule | Description |
|------|-------------|
| (empty) | Globe icon dropdown (default behavior). |
| **Label** | A labeled Select component is shown instead of the icon dropdown. |

## Change the captcha {#captcha-rules}

The rule of the **Captcha** item sets where the captcha appears:

| Rule | Description |
|------|-------------|
| **Pop up** | Captcha is shown in a modal when sending verification codes. |
| **Inline** | Captcha is shown directly on the sign-in page. |

## See also

- [Sign-in methods](/docs/application/signin-methods)
- [Customize the sign-up form](/docs/application/signup-items-table)
- [UI customization](/docs/application/ui-customization)
- [Captcha providers](/docs/provider/captcha/overview)
