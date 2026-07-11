---
title: Custom HTTP SMS
description: Use your own HTTP SMS API as an SMS provider in Casdoor.
keywords: [Custom HTTP SMS, SMS, provider, HTTP, webhook]
authors: [casdoor]
---

Use **Custom HTTP SMS** when your SMS gateway is not one of the built-in providers. Casdoor sends the verification code by calling an HTTP endpoint you define, so any SMS API that accepts a plain HTTP request can be integrated.

Create a **SMS** provider in Casdoor and set **Type** to **Custom HTTP SMS**.

## Fields

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

## How the request is built

- The message content is `Template code` with the `%s` placeholder filled by the verification code. An empty **Template code** sends the raw code.
- The phone-number field defaults to `phoneNumber`; the content field defaults to the **Parameter** value. Either can be renamed in **HTTP body mapping**. If **Parameter** is set, it wins over the `content` mapping.
- For `POST`, `PUT`, and `DELETE`, the phone number and content are sent in the request body using the selected **Content type**.
- For `GET`, they are appended as query parameters — unless the **Endpoint** already contains a `{mobile}` or `{code}` placeholder, in which case no extra query parameters are added.

## Example

A gateway that accepts a `POST` form with fields `to` and `text`:

- **Endpoint**: `https://sms.example.com/api/send`
- **Method**: `POST`
- **Content type**: `application/x-www-form-urlencoded`
- **HTTP header**: `Authorization: Bearer <your-token>`
- **HTTP body mapping**: `phoneNumber` → `to`
- **Parameter**: `text`
- **Template code**: `Your verification code is %s`

A gateway that takes everything in the URL via `GET`:

- **Endpoint**: `https://sms.example.com/send?mobile={mobile}&code={code}`
- **Method**: `GET`

After filling in the fields, use **SMS Test** with a phone number to verify the integration.
