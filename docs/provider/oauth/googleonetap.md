---
title: Google One Tap
description: Learn how to add Google One Tap support to your application
keywords: [Google, Google One Tap, OAuth]
authors: [Chinoholo0807]
---

## Step 1: Configure Your Application

If you want to allow login through Google One Tap, you'll need to add Google OAuth Provider to your application. For information on how to do this, please refer to [Google's documentation](./google.md).

Once you've added the Google OAuth Provider, navigate to the application edit page, add the Google OAuth Provider, and switch the `Rule` from `Default` to `One Tap`.

![Switch rule from "Default" to "One Tap".](/img/providers/OAuth/googleonetap_rule_conf.png)

## Step 2: Logging In with Google One Tap

With the setup completed, users can now log in with Google One Tap.

<video src="/video/provider/oauth/googleonetap_login.mp4" controls="controls" width="100%"></video>
