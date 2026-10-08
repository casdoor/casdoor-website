---
title: Turn on Google One Tap
sidebar_label: Google One Tap
description: Let users sign in on the Casdoor sign-in page with Google One Tap by setting the rule of the Google provider to One Tap.
keywords: [Google, Google One Tap, OAuth]
authors: [Chinoholo0807]
---

This guide explains how to offer Google One Tap on the sign-in page of an application. Users then sign in with their Google account from a prompt, without leaving the page.

---

#### Learning outcomes

- Switch the Google provider of an application to One Tap.

#### What you need

- A [Google OAuth provider](/docs/provider/oauth/google) in Casdoor

---

## Switch the provider to One Tap {#step-1-configure-your-application}

1. In the Casdoor admin console, open the edit page of the application and go to the **Providers** tab.
1. Add the Google provider if the application doesn't have it yet.
1. Change the **Rule** of the Google provider from `Default` to `One Tap`.

   ![Rule of the Google provider set to One Tap](/img/providers/OAuth/googleonetap_rule_conf.png)

1. Save the application.

## Verify the result {#step-2-logging-in-with-google-one-tap}

Open the sign-in page of the application. The Google One Tap prompt appears, and users sign in from it.

<video src="/video/provider/oauth/googleonetap_login.mp4" controls="controls" width="100%"></video>

## See also

- [Add Google as an OAuth provider](/docs/provider/oauth/google)
