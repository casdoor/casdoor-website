---
title: Sentry
description: Sign in to a Sentry organization with Casdoor as the SAML 2.0 identity provider, on self-hosted Sentry and on sentry.io.
keywords: [Sentry, SAML, SAML2, SSO]
authors: [casdoor]
---

[Sentry](https://sentry.io/) is an error tracking and performance monitoring platform. Its organizations can sign members in through a SAML 2.0 identity provider (IdP). With Casdoor as the IdP, members sign in to Sentry with their Casdoor account.

On sentry.io, SAML2 needs the Business or Enterprise plan. Self-hosted Sentry has it built in since version 20.6.0, and the features `organizations:sso-basic` and `organizations:sso-saml2` are on by default.

## Prepare Sentry

Sentry builds the URLs that it gives the IdP from `system.url-prefix`. On self-hosted Sentry, set it in `sentry/config.yml` to the public URL, with the scheme that users open:

```yaml
system.url-prefix: 'https://sentry.example.com'
```

Restart Sentry after you change it. Without it, the sign-in fails, often with HTTP 500 after the user returns from Casdoor.

## Create the application in Casdoor

The examples use the organization slug `my-org` in Sentry. Find yours in the URL of the organization settings.

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the entity ID of Sentry to **Redirect URLs**. Sentry uses its metadata URL as its entity ID:

   ```text
   https://sentry.example.com/saml/metadata/my-org/
   ```

1. On the **SAML** tab, set **SAML reply URL** to the Assertion Consumer Service (ACS) URL of Sentry:

   ```text
   https://sentry.example.com/saml/acs/my-org/
   ```

1. Keep **Enable SAML assertion signature** and **Enable SAML C14N10** off. Casdoor then signs the SAML response, which Sentry verifies. With the assertion signature on, Sentry rejects the response with `Signature validation failed. SAML Response rejected`.
1. Save, and click **Copy SAML metadata URL**. The URL has this form:

   ```text
   https://door.example.com/api/saml/metadata?application=admin/<application-name>
   ```

## Configure SAML2 in Sentry

1. In Sentry, go to **Settings** > **Auth** of the organization, and click **Configure** next to **SAML2**.
1. On the **Metadata URL** tab, enter the metadata URL from Casdoor in **Metadata URL** and click **Get metadata**.

   If Sentry can't reach Casdoor, open the metadata URL in a browser, and paste the XML on the **XML** tab into **Metadata XML** instead.

1. Map the attributes that Casdoor sends:

   | Field | Value |
   |---|---|
   | **IdP User ID** | `Name` |
   | **User Email** | `Email` |
   | **First Name** | `DisplayName` |
   | **Last Name** | (empty) |

   Casdoor sends the username in the `Name` attribute and the display name in `DisplayName`. See [User profile in the response](/docs/how-to-connect/saml/overview#user-profile).

1. Save. The **Auth** page then shows SAML2 as the provider of the organization. To ask the existing members to link their accounts to Casdoor, send them a reminder from this page.

## Verify the result

1. Open `https://sentry.example.com/auth/login/my-org/` in a private browser window and sign in with single sign-on.
1. Sign in to Casdoor. Sentry opens the organization with the Casdoor user signed in. A user who isn't a member yet becomes one at this first sign-in, with the default role of the organization.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| `SAML SSO failed, Signature validation failed. SAML Response rejected` | Turn off **Enable SAML assertion signature** and **Enable SAML C14N10** on the application. If it persists, fetch the metadata again: Sentry must have the certificate of the application's current **Cert**. |
| `Failed to map SAML attributes` | An attribute name in the mapping doesn't match. The message lists the attribute names that the response contains. Check that **Disable SAML attributes** is off. |
| Casdoor shows `AssertionConsumerServiceURL: ... doesn't match the SAML reply URL or the allowed Redirect URI list` | Set **SAML reply URL** to the ACS URL of Sentry, with the organization slug and the trailing slash. |
| Sentry returns HTTP 500 after the sign-in | `system.url-prefix` isn't set or differs from the URL that users open. Fix it and restart Sentry. |
| **Get metadata** fails with a certificate error | Sentry checks the TLS certificate of Casdoor. Serve Casdoor with a valid certificate, or paste the metadata XML instead. |

## See also

- [SAML2](https://docs.sentry.io/organization/authentication/sso/saml2/) in the Sentry documentation
- [Use Casdoor as a SAML identity provider](/docs/how-to-connect/saml/overview)
