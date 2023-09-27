---
title: Overview
description: Use Casdoor as RADIUS server
keywords: [RADIUS]
authors: [Chinoholo0807]
---

You can use Casdoor as a RADIUS server. RADIUS is a client/server protocol, the client can be a NAS or any computer running RADIUS client software.

## Congiure

Before deploying Casdoor, you need to modify the RADIUS-related configurations in the `conf/app.conf` file, including the server port and secret:

```
radiusServerPort = 1812
radiusSecret = "secret"
```

Now you can use Casdoor as RADIUS server.

## Use Casdoor as RADIUS server

Casdoor currently support follow standard RADIUS request:

- `Access-Request` : The authentication request message is sent by the RADIUS client to the Casdoor. Casdoor determines whether to allow access based on the user information carried in the message and reply with `Access-Reject` or `Access-Accept`.

- `Accounting-Request` : When a user starts or stops accessing network resources, the RADIUS client will send accounting request (Start/Interim-update/Stop) message to Casdoor. Casdoor will record relevant accounting request message and reply with `Accounting-Response`.

![redius flow](/img/radius/radius_flow.png)

Since Casdoor use Organization to manage User, where each User belongs to a specific Organization, the `Class` attribute in the request needs to be set as the User's Organization.

![set organization in request](/img/radius/set_org_in_request.png)
