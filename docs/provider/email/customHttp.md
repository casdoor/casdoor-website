---
title: Send email through your own HTTP API
sidebar_label: Custom HTTP Email
description: Connect Casdoor to any email service or webhook that accepts an HTTP request, by describing the request in a Custom HTTP Email provider.
keywords: [Custom HTTP Email, email, provider, HTTP, webhook]
authors: [hsluoyz]
---

This guide explains how to send the emails of Casdoor, such as verification codes and password reset links, through an HTTP endpoint that you describe. Use it for an email service that has no built-in type, or for your own service that builds and sends the emails.

---

#### Learning outcomes

- Describe the HTTP request of your email service in Casdoor.
- Understand how Casdoor builds the request.

#### What you need

- An email service or a webhook with an HTTP API that returns HTTP 200 on success
- Administrator access to the Casdoor admin console

---

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Email` and **Type** to `Custom HTTP Email`.
1. Fill in the fields:

   | Field | Description |
   |---|---|
   | **From address** | Email address of the sender |
   | **From name** | Name of the sender. If empty, Casdoor uses the display name of the organization |
   | **Endpoint** | URL of your API. The default is `https://example.com/send-custom-http-email` |
   | **Method** | `GET`, `POST` (default), `PUT`, or `DELETE` |
   | **Content type** | For methods other than `GET`: `application/x-www-form-urlencoded` (default) or `application/json` |
   | **HTTP header** | Extra request headers, such as an `Authorization` header with your API key. Enter each header as a row of **Keys** and **Values** |
   | **HTTP body mapping** | For methods other than `GET`: the field names of the request. See [Field names](#field-names) |

1. Write the **Email title** and the **Email content**. See [Templates](/docs/provider/email/overview#email-content-and-placeholders).
1. Save the provider and add it to your application. See [Add providers to an application](/docs/application/providers).

The page also shows **Host**, **Port**, **SSL mode**, **Enable proxy**, and **Test SMTP Connection**. A Custom HTTP Email provider doesn't use them.

## Send to a private endpoint

Casdoor limits organisation-owned providers to public addresses by default. If you operate a self-hosted instance, you can approve specific mail endpoints using `tenantPrivateEmailEndpoints` in `conf/app.conf`, or the environment variable of the same name. The organisation can continue to manage its providers in the admin console.

Set the option to a JSON object keyed by the organisation name. For each exact HTTPS URL, set `allowedCIDRs` to the IPv4 or IPv6 destinations the provider may reach and `headers` to the custom header names it may send.

```ini
tenantPrivateEmailEndpoints = {"example-org":{"https://mail.internal.example.com/send":{"allowedCIDRs":["10.20.0.0/24","fd12:3456:789a::/64"],"headers":["Authorization","Accept-Language"]}}}
```

1. List each mail route with its full URL, including the path and any explicit port. Use a DNS hostname or an IP address covered by the endpoint's TLS certificate. Omit user information, query strings, fragments, and wildcards.
1. List at least one specific destination network in CIDR notation. Use `/32` for a single IPv4 address or `/128` for a single IPv6 address.
1. List only the custom headers required for the route. Include `Accept-Language` for verification emails and magic links because Casdoor can add that header automatically. Omit `headers` or use `[]` for a route that needs no custom headers. Keep header values in the provider configuration. Casdoor sets `Host` and `Content-Type` itself.
1. Restart Casdoor after changing the setting. Set the provider's **Endpoint** to the same URL, **Method** to `POST`, and **Content type** to `application/x-www-form-urlencoded`.
1. Send a test email, then complete a real verification flow to check the headers Casdoor sends in both cases.

For an approved request, Casdoor verifies TLS and checks the destination address against `allowedCIDRs` before each connection. Loopback, link-local, multicast, known cloud metadata and standard IPv6 translation addresses remain blocked. Casdoor also keeps the existing block on [shared address space](../overview.md#which-addresses-a-provider-can-reach). The private connection uses a direct client with redirects disabled. Application credentials can use a listed endpoint only when their organisation owns the provider. A global administrator can send a test email from the provider editor. Casdoor rejects requests whose method, content type, or headers fall outside the grant.

The default value, `{}`, grants no private access. If the setting is empty or the whole value is invalid, Casdoor uses the default [provider network policy](../overview.md#which-addresses-a-provider-can-reach). A valid organisation entry also uses that policy for URLs absent from its grant list. Each organisation's entry must be a JSON object. Casdoor logs malformed entries at startup and refuses Custom HTTP Email sends for those organisations until the setting is fixed. Approve only dedicated mail routes that you trust to accept requests from the organisation. Remove the URL from the setting and restart Casdoor to restore the default policy for that route.

## How Casdoor builds the request

### Field names

The request has these fields. In **HTTP body mapping**, you can rename each of them to the name that your API expects. Every row of the mapping needs a value.

| Row | Default field name | Value |
|---|---|---|
| **From name** | `fromName` | **From name** |
| **From address** | `fromAddress` | **From address** |
| **To address** | `toAddress` | The recipient |
| **Subject** | `subject` | **Email title** |
| **Email content** | `content` | **Email content**, with the placeholders replaced |

For more than one recipient, Casdoor sends the field `toAddresses` once for each recipient, instead of `toAddress`.

### Methods and content types

- **`GET`**: Casdoor sends all fields as query parameters of the **Endpoint**.
- **`POST`, `PUT`, or `DELETE` with `application/x-www-form-urlencoded`**: Casdoor sends all fields as form fields in the body.
- **`POST`, `PUT`, or `DELETE` with `application/json`**: Casdoor sends a JSON object with the fields of the sender, the subject, and the content.

:::caution
In the current version, the JSON object has no recipient field. Use `application/x-www-form-urlencoded` or `GET` if your API needs the recipient in the request.
:::

Casdoor adds the headers of **HTTP header** to the request. It treats every response other than HTTP 200 as a failure.

### Language of the email

When Casdoor sends a verification code or a magic link, it adds an `Accept-Language` header with the language of the browser that asked for it, as a two-letter code such as `en` or `zh`. If **HTTP header** already has an `Accept-Language` row, Casdoor keeps that value. Your API can use the header to send the email in the language of the user, also for a sign-up code, which Casdoor sends before the user exists.

## Example

An API that accepts a `POST` form with the fields `from`, `to`, `subject`, and `html`:

| Field | Value |
|---|---|
| **Endpoint** | `https://mail.example.com/api/send` |
| **Method** | `POST` |
| **Content type** | `application/x-www-form-urlencoded` |
| **HTTP header** | `Authorization`: `Bearer <your-api-key>` |
| **HTTP body mapping** | **From address**: `from`, **To address**: `to`, **Subject**: `subject`, **Email content**: `html` |

`<your-api-key>` is the API key of your email service.

## Verify the result

1. Save the provider.
1. Enter an address in **Test Email** and click **Send Testing Email**. Your API receives the request.

## See also

- [Email providers](/docs/provider/email/overview)
- [Send SMS through your own HTTP API](/docs/provider/sms/customHttp)
- [Custom HTTP notification provider](/docs/provider/notification/customHttp)
