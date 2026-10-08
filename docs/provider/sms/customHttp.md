---
title: Send SMS through your own HTTP API
sidebar_label: Custom HTTP SMS
description: Connect Casdoor to any SMS gateway that accepts an HTTP request, by describing the request in a Custom HTTP SMS provider.
keywords: [Custom HTTP SMS, SMS, provider, HTTP, webhook]
authors: [casdoor]
---

This guide explains how to send the verification codes of Casdoor through an SMS gateway that has no built-in type. Casdoor calls an HTTP endpoint that you describe, so any SMS API that accepts a plain HTTP request works.

---

#### Learning outcomes

- Describe the HTTP request of your SMS gateway in Casdoor.
- Understand how Casdoor builds the request.

#### What you need

- An SMS gateway with an HTTP API
- Administrator access to the Casdoor admin console

---

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SMS` and **Type** to `Custom HTTP SMS`.
1. Fill in the fields:

   | Casdoor field     | Meaning                                                                                                          | Required |
   |-------------------|-----------------------------------------------------------------------------------------------------------------|----------|
   | Template code     | Message template. The verification code replaces the `%s` placeholder (e.g. `Your code is %s`). If left empty, the raw code is sent. | No       |
   | Endpoint          | The SMS API URL. Supports the `{mobile}` and `{code}` placeholders, which are replaced with the phone number and code. | Yes      |
   | Method            | HTTP method: `GET`, `POST`, `PUT`, or `DELETE`.                                                                  | Yes      |
   | Content type      | Request body encoding for non-`GET` methods: `application/x-www-form-urlencoded` (default) or `application/json`. | No       |
   | HTTP header       | Extra request headers (e.g. an `Authorization` header for your API key).                                         | No       |
   | HTTP body mapping | Field names used in the request for `phoneNumber` and `content` (non-`GET` methods).                             | No       |
   | Parameter         | The field name that carries the message content. Takes precedence over the `content` value in **HTTP body mapping**. | No       |
   | Enable proxy      | Send the request through the SOCKS5 proxy configured in Casdoor. See [overview](/docs/provider/sms/overview#proxy). | No       |

1. Save the provider.

## How Casdoor builds the request {#how-the-request-is-built}

- **Content**: The message is the **Template code** with `%s` replaced by the verification code. With an empty **Template code**, Casdoor sends the code alone.
- **Field names**: The phone number goes in the field `phoneNumber`, and the content goes in the field that **Parameter** names. You can rename both in **HTTP body mapping**. If **Parameter** is set, it takes precedence over a mapping of `content`.
- **`POST`, `PUT`, and `DELETE`**: Casdoor sends the phone number and the content in the body, in the selected **Content type**.
- **`GET`**: Casdoor appends the phone number and the content as query parameters. If the **Endpoint** contains the placeholder `{mobile}` or `{code}`, Casdoor fills in the placeholders and adds no query parameters.

## Examples

A gateway that accepts a `POST` form with the fields `to` and `text`:

| Field | Value |
|---|---|
| **Endpoint** | `https://sms.example.com/api/send` |
| **Method** | `POST` |
| **Content type** | `application/x-www-form-urlencoded` |
| **HTTP header** | `Authorization: Bearer <your-token>` |
| **HTTP body mapping** | `phoneNumber` to `to` |
| **Parameter** | `text` |
| **Template code** | `Your verification code is %s` |

A gateway that takes everything in the URL with `GET`:

| Field | Value |
|---|---|
| **Endpoint** | `https://sms.example.com/send?mobile={mobile}&code={code}` |
| **Method** | `GET` |

## Verify the result

Enter a phone number in **SMS Test** and send a test message.

## See also

- [SMS providers](/docs/provider/sms/overview)
- [Custom HTTP notification provider](/docs/provider/notification/customHttp)
