---
title: Shared Application
description: Shared application across organizations
keywords: [shared, application]
authors: [DacongDA]
---

## Introduction

If you want to create an application that can be shared with other organizations, you can enable Is Shared field in application(for safety reasons, only built-in organization can create shared application). To specify the organization, you should add `-org-` and organization name after clientId / application name. For example, the clientId of application is `2dc94ccbec09612c04ac`, your organization name is `casbin`, the clientId for your organization is `2dc94ccbec09612c04ac-org-casbin` and the login url for oauth is `https://door.casdoor.com/login/oauth/authorize?client_id=2dc94ccbec09612c04ac-org-casbin&response_type=code&redirect_uri=http://localhost:9000&scope=read&state=casdoor`.

## Configuration

1. First create a new application.
2. Enable Is Shared field.
3. add `-org-` to split organization and clientId / application name.

![shared application field](/img/application/shared-application/shared_application_field.png)

![shared application login link](/img/application/shared-application/shared_application_login_link.png)

## Using Invitations with Shared Applications

When sending [invitations](/docs/invitation/overview) using a shared application, Casdoor automatically generates the correct organization-specific invitation links. The system appends the `-org-{orgName}` suffix to ensure users can successfully register through the invitation, even when the application is shared across multiple organizations.

:::caution

Once you shared an application, it can be used by all organizations, and cannot be disabled for a particular organization.

:::

Here is a demo video that shows how to use shared application:

<video src="/img/application/shared-application/shared_application_demo.mp4" controls="controls" width="100%"></video>
