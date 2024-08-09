---
title: Shared Application
description: Shared application across organizations
keywords: [shared, application]
authors: [DacongDA]
---

## Introduction

If you want to create an application that can be shared with other organizations, you can enable Is Shared field in applicaion(for safety reason, only built-in organization can create shared application). To specified the organiztion, you should add `-org-` and organization name after clientId / application name. For example, the clientId of application is `abcdefg123456`, your organization name is `test`, the clientId for your organization is `abcdefg123456-org-test`.

## Configuration

1. First create a new application.
2. Enable Is Shared field.
3. add `-org-` to split organization and clientId / application name.

![shared application field](/img/application/shared-application/shared_application_field.png)

:::caution

Once you shared an application, it can be used by all organizations, and cannot be disabled for a particular organization.

:::

Here is a demo video that shows how to use shared application:

<video src="/img/application/shared-application/shared_application_demo.mp4" controls="controls" width="100%"></video>
