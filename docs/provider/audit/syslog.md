---
title: Send audit records to Syslog
sidebar_label: Syslog
description: Forward every audit record of Casdoor to a Syslog server over UDP, TCP, or TLS with an Audit provider.
keywords: [audit, Syslog, provider, SIEM, RFC 5424, RFC 3164]
authors: [hsluoyz]
---

This guide explains how to send the audit records of Casdoor to a Syslog server, for example the collector of a security information and event management (SIEM) system. An Audit provider of the type `Syslog` forwards each record that Casdoor stores, the same records that **Auditing** > **Records** lists.

---

#### Learning outcomes

- Add a Syslog audit provider.
- Know which records Casdoor sends and in which format.

#### What you need

- A Syslog server that Casdoor can reach over UDP, TCP, or TLS
- Administrator access to the Casdoor admin console

---

## Add the provider

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Audit`. Casdoor sets **Type** to `Syslog`, the only type, and fills in the defaults.
1. Fill in the fields:

   | Field | Description |
   |---|---|
   | **Host** | Host name or IP address of the Syslog server. Required |
   | **Port** | Port of the Syslog server, from 1 to 65535. The default is `514`. When you switch **Protocol** to `TLS`, Casdoor changes `514` to `6514`, and back when you switch away from `TLS` |
   | **Protocol** | `UDP` (default), `TCP`, or `TLS` |
   | **Facility** | Syslog facility of the messages: `auth` (default), `authpriv`, `user`, `daemon`, `security`, or `local0` to `local7` |
   | **Format** | `RFC 5424` (default) or `RFC 3164` |
   | **State** | `Enabled` (default) or `Disabled`. Casdoor sends nothing through a disabled provider |

1. Save the provider. Casdoor rejects invalid settings, such as an empty host, when you save.

You don't add an Audit provider to an application. It takes effect as soon as you save it.

## Which records Casdoor sends

Casdoor sends each record to the enabled Audit providers of the global `admin` organization and to those of the organization of the record. A record without an organization belongs to `built-in`.

The records are the ones that Casdoor stores in its audit log. With `logPostOnly` set to `true` in `conf/app.conf`, the default, Casdoor doesn't record `GET` requests, except for `logout` and `sso-logout`. See the [Configuration reference](/docs/basic/configuration).

## Message format

The message is the record as JSON, on a single line. Casdoor masks secrets in the request body, such as passwords, and replaces line breaks with spaces.

The severity is `4` (warning) if the status code of the request is 400 or higher, or the response is an error. Otherwise, it is `6` (informational). The priority is the facility number multiplied by 8, plus the severity.

`RFC 5424`:

```text
<priority>1 <time> <hostname> casdoor <process-id> <action> - <record-json>
```

`RFC 3164`:

```text
<priority><time> <hostname> casdoor[<process-id>]: <record-json>
```

- `<time>` is the time of the record, in the RFC 3339 format for `RFC 5424`, and in the format `Jan _2 15:04:05` for `RFC 3164`.
- `<hostname>` is the host name of the Casdoor server.
- `<action>` is the action of the record, such as `login` or `update-user`, with at most 32 characters.

## Delivery

- Casdoor sends the messages in the background, from a queue of 10,000 messages per provider. If the queue is full, Casdoor drops the new record and logs an error.
- If the connection fails, Casdoor retries the message every 10 seconds. Connecting and writing each time out after 5 seconds.
- Over UDP, each datagram carries one message, cut to 60,000 bytes. Over TCP and TLS, each message ends with a line feed.
- Over TLS, Casdoor requires TLS 1.2 or later, and checks the certificate of the server against **Host**.

## Verify the result

1. Save a change in the Casdoor admin console, for example in an application.
1. Check the log of the Syslog server. A message from `casdoor` with the action of the change is there.

## See also

- [Providers](/docs/provider/overview)
- [Log providers](/docs/provider/log/overview)
- [Webhooks](/docs/webhooks/overview)
