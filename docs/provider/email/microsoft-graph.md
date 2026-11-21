---
title: Send email with Microsoft Graph
sidebar_label: Microsoft Graph
description: Send the emails of Casdoor from a Microsoft 365 mailbox through the sendMail API of Microsoft Graph, for tenants where SMTP AUTH is turned off.
keywords: [email, Microsoft Graph, sendMail, Microsoft 365, Exchange Online, OAuth]
authors: [hsluoyz]
---

This guide explains how to send the emails of Casdoor from a Microsoft 365 mailbox with the [sendMail](https://learn.microsoft.com/en-us/graph/api/user-sendmail) API of Microsoft Graph. Casdoor gets an app-only token from Microsoft Entra ID with the client credentials flow and calls `POST /users/<mailbox>/sendMail`. It doesn't use SMTP, so it works in tenants where SMTP AUTH is turned off. To send through SMTP instead, see [Microsoft 365](/docs/provider/email/microsoft365).

---

#### Learning outcomes

- Register an app in Microsoft Entra ID that may send mail as a mailbox.
- Add Microsoft Graph as an email provider in Casdoor and test it.

#### What you need

- A Microsoft 365 tenant and a mailbox that sends the emails, for example `noreply@contoso.com`. A shared mailbox works.
- An account that can register apps and grant admin consent in Microsoft Entra ID
- Administrator access to the Casdoor admin console

---

## Register an app in Microsoft Entra ID

1. In the [Microsoft Entra admin center](https://entra.microsoft.com/), open **App registrations** and click **New registration**. Enter a name, such as `Casdoor email`, keep **Accounts in this organizational directory only**, and click **Register**.
1. On the **Overview** page of the app, copy the **Application (client) ID** and the **Directory (tenant) ID**.
1. Go to **Certificates & secrets** > **Client secrets** > **New client secret**, and copy the **Value** of the secret. It's shown only once.
1. Go to **API permissions** > **Add a permission** > **Microsoft Graph** > **Application permissions**, and select **Mail.Send**.
1. Click **Grant admin consent** for your organization.

The **Mail.Send** application permission lets the app send as any mailbox of the tenant. To limit it to the sending mailbox, use [RBAC for Applications in Exchange Online](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac) or an application access policy.

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `Microsoft Graph`. Casdoor fills in the endpoint, token URL, and scope.
1. Fill in the fields:

   | Field | Value |
   |---|---|
   | Client ID | The **Application (client) ID** of the app |
   | Client secret | The **Value** of the client secret |
   | From address | The mailbox that sends the emails, for example `noreply@contoso.com`. Casdoor calls `sendMail` for this mailbox, so it's required |
   | From name | (Optional) The sender display name |
   | Endpoint | `https://graph.microsoft.com/v1.0`. Change it only for a national cloud, for example `https://graph.microsoft.us/v1.0` |
   | Token URL | `https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token`, with `<tenant-id>` replaced by the **Directory (tenant) ID** |
   | Scope | `https://graph.microsoft.com/.default` |

1. Write the **Email title** and the **Email content**. See [Templates](/docs/provider/email/overview#email-content-and-placeholders). Casdoor sends the content as HTML and doesn't keep a copy in **Sent Items**.
1. Save the provider.

**Enable proxy** sends the token request and the API calls through the SOCKS5 proxy of Casdoor. See [Proxy](/docs/provider/email/overview#proxy).

## Verify the result

1. Click **Test SMTP Connection**. For this type, Casdoor only gets a token, which checks the token URL, the client ID, and the client secret, without sending an email.
1. Click **Send Testing Email** and check that the message arrives in the **Test Email** mailbox.

Then add the provider to your application. See [Add providers to an application](/docs/application/providers).

## Troubleshooting

| Error | Cause |
|---|---|
| `the token URL of the Microsoft Graph email provider is required` | **Token URL** is empty or still contains `<tenant-id>` |
| `the from address of the Microsoft Graph email provider must be the mailbox that sends the emails` | **From address** is empty or isn't an email address |
| `oauth2: cannot fetch token` with an `AADSTS` code | Microsoft Entra ID refused the token request. Check the tenant ID in **Token URL**, the **Client ID**, and the **Client secret**, which must be the secret value, not its ID, and must not be expired |
| `Microsoft Graph sendMail failed with status 403` | The app has no **Mail.Send** application permission with admin consent, or an access policy doesn't allow it to send as the **From address** |
| `Microsoft Graph sendMail failed with status 404` | The **From address** isn't a mailbox of the tenant |

## See also

- [Email providers](/docs/provider/email/overview)
- [Microsoft 365](/docs/provider/email/microsoft365)
- [Add providers to an application](/docs/application/providers)
