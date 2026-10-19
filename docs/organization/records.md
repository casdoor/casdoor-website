---
title: Records
sidebar_label: Records
description: Casdoor writes a record of every API request to its audit log. This page describes what a record contains, which organization and user it is attributed to, and how long Casdoor keeps it.
keywords: [records, audit log, auditing, organization, retention]
authors: [hsluoyz]
---

A record is an entry in the audit log of Casdoor. Casdoor writes one record for every request to its API, after the request has been handled. Each record belongs to an organization, so the administrators of an organization see the requests that concern it.

## View the records

In the Casdoor admin console, go to **Auditing** > **Records**. Select **View** in the row of a record to see all of its fields.

Organization administrators see only the records of their own organization. Global administrators, that is, users of the `built-in` organization, see the records of all organizations.

You can also read the records with `GET /api/get-records`, with the same scope.

## Record fields

| Field | Description |
|---|---|
| **Name** | Generated identifier of the record |
| **ID** | Sequential number of the record |
| **Timestamp** | When Casdoor handled the request |
| **Organization** | The organization that the record belongs to. See [Organization and user of a record](#organization-and-user-of-a-record) |
| **User** | The user who made the request, or the application for a request with application credentials |
| **Method** | The HTTP method, such as `POST` |
| **Request URI** | The path and query of the request. Casdoor removes secret query parameters, such as `id_token_hint`, `password`, and `access_token` |
| **Language** | The language of the request |
| **Status code** | Casdoor stores `200` for every API request, so use **Response** to see the outcome |
| **Response** | The status (`ok` or `error`) and the message of the response |
| **Object** | The request body. Casdoor masks secret values, such as passwords, client secrets, and tokens, as `***` |
| **Action** | The API action, for example `login`, `update-user`, or `logout` |
| **Is triggered** | Whether the record was sent to the matching [webhooks](/docs/webhooks/overview) without an error |

For a failed sign-in, the `detail` field of the record holds the reason, such as `wrong-password`. See [Sign-in failure classification](/docs/webhooks/overview#sign-in-failure-classification).

## Organization and user of a record

Casdoor attributes each record to an organization and a user in this order:

1. A request from a signed-in user belongs to the organization of the user.
1. A request made with the client ID and client secret of an application belongs to the organization of the application. Its user is `app/<application-name>`, and the console links it to the application.
1. A request without an authenticated user belongs to the organization that the request names. Casdoor looks at `organization` in the body or in the query, then at `application` or `applicationId`, and then at `clientId`. A name counts only when the organization or application exists.
1. Any other request belongs to the `built-in` organization.

## Which requests Casdoor records

When `logPostOnly` in the [configuration file](/docs/basic/configuration) is `true`, which is the default, Casdoor doesn't record `GET` requests. The exceptions are `logout` and `sso-logout`, which Casdoor always records, because OpenID Connect (OIDC) relying parties call them with `GET` for RP-initiated logout. For such a logout without a session cookie, the record takes its user and organization from the subject of `id_token_hint`.

Casdoor also sends every record to the Audit providers of its organization, for example [Syslog](/docs/provider/audit/syslog), and to the webhooks that subscribe to its action.

## How long Casdoor keeps records

By default, Casdoor keeps records forever. To delete old records automatically, set **Record retention days** on the **Advanced** tab of the organization. A daily job then deletes the records of the organization that are older than this number of days. See [Retention of tokens and records](/docs/organization/overview#retention-of-tokens-and-records).

Records from older versions of Casdoor can have no organization or the owner `anonymous`. They follow the **Record retention days** of the `built-in` organization.

## See also

- [Organizations](/docs/organization/overview)
- [Webhooks](/docs/webhooks/overview)
- [Configuration](/docs/basic/configuration)
