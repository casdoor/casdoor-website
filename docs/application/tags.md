---
title: Restrict sign-in by user tags
sidebar_label: Application tags
description: Allow only users with a matching tag to sign in to an application.
keywords: [tags, application, access control]
authors: [Chinoholo0807]
---

This guide explains how to restrict an application to users with certain tags. Only a user who has at least one of the tags of the application can sign in to it.

---

#### Learning outcomes

- Add tags to an application.
- Understand how Casdoor matches the tags of users.

#### What you need

- An [application](/docs/application/overview)
- Users with [tags](/docs/user/overview#user-tags)

---

## Add tags to the application {#configuration}

1. In the Casdoor admin console, open the edit page of the application.
1. In **Tags**, add the tags whose users may sign in.

   ![Tags field of the application](/img/application/tags/configure_app_tags.png)

1. Save the application.

<video src="/video/application/application_tags.mp4" controls="controls" width="100%"></video>

## How Casdoor matches tags {#multiple-tags-per-user}

The tag of a user can hold several tags, separated by commas, for example `dev,qa,staging`. Casdoor splits the value and allows the sign-in if any one of the tags is a tag of the application.

For example, an application has the tags `dev` and `staging`. Users with `dev`, with `staging`, or with `dev,qa` can sign in. A user with `prod` can't.

The following users aren't restricted:

- Administrators of the organization and global administrators
- Users and applications of the `built-in` organization

The tag `guest-user` is reserved for [guest users](/docs/how-to-connect/guest-auth). A guest user receives the tag `normal-user` after setting a username or a password.

## See also

- [Users](/docs/user/overview#user-tags)
- [Customize the sign-up form](/docs/application/signup-items-table#tag-item)
- [Sign users in as guests](/docs/how-to-connect/guest-auth)
