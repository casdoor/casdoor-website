---
title: Providers
sidebar_label: Overview
description: Providers connect Casdoor to external services for sign-in, email, SMS, storage, payment, captcha, and more. This page lists the categories and explains who can use a provider.
keywords: [provider, OAuth, SMS, storage, email, payment, captcha, MFA]
authors: [kininaru]
---

A provider connects Casdoor to an external service, such as an identity provider for sign-in, an email service, or a cloud storage. You create a provider once and then add it to the applications that use it.

## Provider categories {#provider-types}

| Category | Purpose |
|---|---|
| Audit | Send audit events to an external system |
| Captcha | Protect sign-in and sign-up with a captcha. See [Captcha providers](/docs/provider/captcha/overview) |
| Email | Send email, such as verification codes and notifications. See [Email providers](/docs/provider/email/overview) |
| Face ID | Recognize faces for Face ID sign-in. See [Face ID providers](/docs/provider/faceid/overview) |
| ID Verification | Verify the identity of users from ID documents. See [Identity verification providers](/docs/provider/idv/overview) |
| Log | Forward permission audit events to a logging backend, or store them as entries. See [Log providers](/docs/provider/log/overview) |
| MFA | Provide a second factor, such as RADIUS. See [MFA providers](/docs/provider/mfa/radius) |
| Notification | Send messages to chat services, such as Slack and Telegram. See [Notification providers](/docs/provider/notification/overview) |
| OAuth | Let users sign in with external identity providers, such as GitHub and Google. See [OAuth providers](/docs/provider/oauth/overview) |
| Payment | Take payments for products and subscriptions. See [Payment providers](/docs/provider/payment/overview) |
| SAML | Let users sign in with external SAML identity providers. See [SAML providers](/docs/provider/saml/overview) |
| Scan | Scan servers for security issues and MCP endpoints. See [Scan providers](/docs/provider/scan/overview) |
| SMS | Send SMS verification codes. See [SMS providers](/docs/provider/sms/overview) |
| Storage | Store files on the local file system or in cloud object storage. See [Storage providers](/docs/provider/storage/overview) |

## Who can use a provider {#scope-and-permissions}

Only administrators create providers. Where a provider is available depends on who created it:

| Created by | Available to |
|---|---|
| A global administrator: a user of the `built-in` organization, or a user with `IsGlobalAdmin` | All applications |
| An organization administrator: a user with `IsAdmin` | Applications of the same organization |

## Create a provider

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Select the **Category** and the **Type**. Casdoor fills in **Name** and **Display name**: the name follows the pattern `provider_<category>_<type>`, and the display name is `<Category> <Type>`. Casdoor stops updating a field once you edit it yourself.
1. Fill in the fields of the type. The page of each provider type lists them.
1. Save the provider.

## Add a provider to an application {#adding-a-provider-to-an-application}

A provider takes effect only in the applications that you add it to.

1. Open the edit page of the application, go to the **Providers** tab, and add a row.

   ![Add button in the Providers table](/img/providers/provider_overview_add.png)

1. Select the provider. The list shows all providers that are available to the application.

   ![Provider list of the application](/img/providers/provider_overview_select.png)

1. For OAuth and captcha providers, set how the application uses them. See [Add providers to an application](/docs/application/providers) and [Configure the default captcha](/docs/provider/captcha/default#configure-in-casdoor).

   ![Settings of a provider in the application](/img/providers/provider_overview_config.png)

1. Save the application.

## See also

- [Add providers to an application](/docs/application/providers)
- [Core concepts](/docs/basic/core-concepts#provider)
