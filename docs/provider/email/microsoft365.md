---
title: Send email with Microsoft 365
sidebar_label: Microsoft 365
description: Send the emails of Casdoor from a Microsoft 365 (Exchange Online) mailbox, signing in to SMTP with OAuth instead of a password.
keywords: [email, Microsoft 365, Office 365, Exchange Online, Outlook, SMTP, OAuth, XOAUTH2]
authors: [hsluoyz]
---

This guide explains how to send the emails of Casdoor from a mailbox in Microsoft 365 (Exchange Online). Exchange Online is retiring basic authentication, a username and a password, for SMTP. The `Microsoft 365` type signs in to SMTP with an OAuth token instead: Casdoor gets an app-only token from Microsoft Entra ID with the client credentials flow, and signs in to `smtp.office365.com` with XOAUTH2 as the sending mailbox.

---

#### Learning outcomes

- Register an app in Microsoft Entra ID that may send as a mailbox through SMTP.
- Add Microsoft 365 as an email provider in Casdoor and test it.

#### What you need

- A Microsoft 365 tenant and a mailbox that sends the emails, for example `noreply@contoso.com`. A shared mailbox works and needs no license.
- An account that can register apps and grant admin consent in Microsoft Entra ID, and an Exchange administrator for the PowerShell steps
- Administrator access to the Casdoor admin console

---

## Register an app in Microsoft Entra ID

1. In the [Microsoft Entra admin center](https://entra.microsoft.com/), open **App registrations** and click **New registration**. Enter a name, such as `Casdoor email`, keep **Accounts in this organizational directory only**, and click **Register**.
1. On the **Overview** page of the app, copy the **Application (client) ID** and the **Directory (tenant) ID**.
1. Go to **Certificates & secrets** > **Client secrets** > **New client secret**, and copy the **Value** of the secret. It's shown only once.
1. Go to **API permissions** > **Add a permission** > **APIs my organization uses**, search for `Office 365 Exchange Online`, choose **Application permissions**, and select **SMTP.SendAsApp**. Remove the **User.Read** permission if you don't need it.
1. Click **Grant admin consent** for your organization.

## Let the app send as the mailbox

An app-only token can sign in to SMTP only after Exchange Online knows the app and the app has access to the mailbox. Run these commands in [Exchange Online PowerShell](https://learn.microsoft.com/en-us/powershell/exchange/connect-to-exchange-online-powershell):

1. Find the object ID of the service principal: in the Entra admin center, open **Enterprise applications**, open your app, and copy the **Object ID** on its **Overview** page. Don't use the object ID on the **App registrations** page, which makes the sign-in fail.
1. Register the service principal in Exchange Online and give it access to the mailbox:

   ```powershell
   Connect-ExchangeOnline
   New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
   $sp = Get-ServicePrincipal | Where-Object { $_.AppId -eq "<APPLICATION_ID>" }
   Add-MailboxPermission -Identity "noreply@contoso.com" -User $sp.Identity -AccessRights FullAccess
   ```

   `<APPLICATION_ID>` is the **Application (client) ID**. `Add-MailboxPermission` takes the identity of the service principal in Exchange Online, not the object ID.

1. Make sure that SMTP AUTH is turned on for the mailbox:

   ```powershell
   Set-CASMailbox -Identity "noreply@contoso.com" -SmtpClientAuthenticationDisabled $false
   ```

   If `Get-TransportConfig` shows `SmtpClientAuthenticationDisabled` as `True`, SMTP AUTH is off for the whole organization, and the setting on the mailbox must be `$false` as above, not empty.

The permissions can take some minutes to apply. See [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth) for the details from Microsoft.

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `Microsoft 365`. Casdoor fills in the host, port, token URL, and scope.
1. Fill in the fields:

   | Field | Value |
   |---|---|
   | Client ID | The **Application (client) ID** of the app |
   | Client secret | The **Value** of the client secret |
   | From address | The mailbox that you gave the app access to, for example `noreply@contoso.com`. Casdoor signs in to SMTP as this mailbox, so it's required |
   | From name | (Optional) The sender display name |
   | Host | `smtp.office365.com` |
   | Port | `587` |
   | SSL mode | `Auto`, which uses STARTTLS on port 587 |
   | Token URL | `https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token`, with `<tenant-id>` replaced by the **Directory (tenant) ID** |
   | Scope | `https://outlook.office365.com/.default` |

1. Write the **Email title** and the **Email content**. See [Templates](/docs/provider/email/overview#email-content-and-placeholders).
1. Save the provider.

**Enable proxy** sends both the token request and the SMTP connection through the SOCKS5 proxy of Casdoor. See [Proxy](/docs/provider/email/overview#proxy).

## Verify the result

1. Click **Test SMTP Connection**. Casdoor gets a token and signs in to SMTP as the **From address**, without sending an email.
1. Click **Send Testing Email** and check that the message arrives in the **Test Email** mailbox.

Then add the provider to your application. See [Add providers to an application](/docs/application/providers).

## Troubleshooting

| Error | Cause |
|---|---|
| `the token URL of the Microsoft 365 email provider is required` | **Token URL** is empty or still contains `<tenant-id>` |
| `the from address of the Microsoft 365 email provider must be the mailbox that sends the emails` | **From address** is empty or isn't an email address |
| `oauth2: cannot fetch token` with an `AADSTS` code | Microsoft Entra ID refused the token request. Check the tenant ID in **Token URL**, the **Client ID**, and the **Client secret**, which must be the secret value, not its ID, and must not be expired |
| `535 5.7.3 Authentication unsuccessful` | Exchange Online refused the token. Check that admin consent is granted for **SMTP.SendAsApp**, that the service principal is registered with the object ID of the enterprise application, that the app has access to the **From address** mailbox, and that SMTP AUTH is on for the mailbox. If you just made these changes, wait some minutes and try again |

## See also

- [Email providers](/docs/provider/email/overview)
- [Add providers to an application](/docs/application/providers)
