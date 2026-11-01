---
title: Send email with Brevo
sidebar_label: Brevo
description: Use the SMTP relay of Brevo (formerly Sendinblue) as the email provider of Casdoor.
keywords: [email, Brevo, SMTP]
authors: [UsherFall]
---

This guide explains how to send the emails of Casdoor through the SMTP relay of Brevo, formerly Sendinblue.

---

#### Learning outcomes

- Get the SMTP settings and an SMTP key of a Brevo account.
- Add Brevo as an email provider in Casdoor and test it.

#### What you need

- A Brevo account
- Administrator access to the Casdoor admin console

---

## Prepare Brevo

1. Authenticate your domain and create the sender that Casdoor sends from. See [Send transactional emails using Brevo SMTP](https://help.brevo.com/hc/en-us/articles/7924908994450).
1. In the Brevo dashboard, go to **Settings** > **SMTP & API** and open the **SMTP** tab. Note the SMTP server, `smtp-relay.brevo.com`, and the SMTP login. Depending on when your account was created, the login is your account email address or a generated address like `<ID>@smtp-brevo.com`.

   ![SMTP settings in Brevo](/img/providers/brevo_conf.png)

1. Click **Generate a new SMTP key** and copy the key. Brevo shows the full key only once. Use an SMTP key, not an API key. See [Create and manage your SMTP keys](https://help.brevo.com/hc/en-us/articles/7959631848850).

## Add the provider in Casdoor {#3-configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `Default`.
1. Enter the SMTP server as the **Host**, the **Port** (`587`, or `465` for implicit TLS), the SMTP login as the **Username**, and the SMTP key as the **Password**. Set **From address** to your verified sender.

   ![Brevo SMTP settings in Casdoor](/img/providers/brevo_provider.png)

1. Save the provider.

## Verify the result

1. Click **Test SMTP Connection**. Casdoor reports `SMTP connected successfully`.
1. Click **Send Testing Email**. Casdoor reports `Email sent successfully`, and the message arrives at the **Test Email** address.

## See also

- [Email providers](/docs/provider/email/overview)
