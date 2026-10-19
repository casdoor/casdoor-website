---
title: Allow one session per user
sidebar_label: Exclusive sign-in
description: Limit the number of active sessions of each user in an application or in a whole organization, so that a new sign-in ends the sessions on other devices.
keywords: [exclusive signin, session, single session, max sessions]
authors: [hsluoyz]
---

This guide explains exclusive sign-in. With exclusive sign-in, each user has at most one active session, or at most the number of sessions that you set. A sign-in on another device or in another browser ends the earlier sessions of that user. You turn it on for one application or for a whole organization.

---

#### Learning outcomes

- Turn on exclusive sign-in for an application.
- Turn on exclusive sign-in for all applications of an organization.
- Allow more than one session per user.
- Understand what happens to existing sessions and tokens.

#### What you need

- An [application](/docs/application/overview), or an [organization](/docs/organization/overview) for the organization-wide setting

---

## About exclusive sign-in {#when-to-use-it}

Exclusive sign-in lowers the risk that several people use one account at the same time, for example after a user forgot to sign out on a shared computer. The cost is for users who work on several devices: they sign in again each time they switch.

## Turn on exclusive sign-in {#configuration}

1. In the Casdoor admin console, open the edit page of the application.
1. Turn on **Enable exclusive signin**. The setting applies to all users of the application.
1. Optionally, set **Max sessions** to the number of sessions a user may keep. The default is `1`.
1. Save the application.

## What happens at sign-in {#behavior}

When a user signs in to the application and **Max sessions** is `1` or empty, Casdoor:

1. Expires all access tokens and refresh tokens of the user for the application.
1. Ends all other sessions of the user in the application. The user is signed out of the application everywhere else.
1. Creates a session and tokens for the new sign-in.

For example, a user signs in on a laptop and then on a phone. Casdoor ends the session on the laptop, and only the phone stays signed in.

With **Max sessions** set to a larger number `N`, Casdoor keeps the new session and the `N - 1` other sessions that were active most recently. Expired sessions don't count. Casdoor ends the older sessions and expires only their tokens.

The application setting works per application. Sessions and tokens of the same user in other applications stay. To limit sessions across applications, use the organization setting.

## Turn on exclusive sign-in for an organization {#organization}

1. In the Casdoor admin console, open the edit page of the organization.
1. Turn on **Enable exclusive signin across applications**.
1. Optionally, set **Max sessions**. The default is `1`.
1. Save the organization.

At each sign-in of a user of the organization, Casdoor keeps the current browser session and, with **Max sessions** above `1`, the most recently active other sessions. It ends the other sessions in all applications. For each ended session, Casdoor:

- Sends OpenID Connect (OIDC) back-channel logout and SAML logout requests to the applications.
- Deletes the session and expires its tokens.
- Sends the [single sign-out](/docs/session/single-sign-out) notifications.

Single sign-on into another application in the same browser reuses the browser session, so it doesn't count as another session.

The organization setting comes from the organization of the user. A [shared application](/docs/application/shared-application) of another organization doesn't impose the setting of its own organization. The application setting **Enable exclusive signin** is separate, and both apply when both are on.

## See also

- [Session management](/docs/session/management)
- [Single sign-out](/docs/session/single-sign-out)
- [Application settings reference](/docs/application/terminology#authentication)
