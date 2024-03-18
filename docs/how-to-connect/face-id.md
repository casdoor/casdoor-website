---
title: Face ID
description: Use Face ID to log in in Casdoor
keywords: [face id, signin]
authors: [HGZ-20]
---

## Overview

We've now incorporated `Face ID` login into Casdoor by leveraging face-api.js.

:::danger

Casdoor's current facial recognition is built on the basic, open-source face-api.js, making it insecure. Please carefully consider before enabling facial recognition for login. We may plan to include a more secure, third-party facial recognition SDK in the future.

:::

## Activation method

### Add the Face ID option in the organization's Account items

`User Management` -> `Organizations` -> Choose an organization -> Locate the `Account items` section and incorporate `Face ID`

![Face ID](/img/application/face-id/organization-face-id.png)

### Afterwards, you'll find the Face ID option under User, where users can upload their facial data to be used for logging in

`User Management` -> `Users` -> Choose a user -> Find `Face Ids`, and add facial data. You can add up to 5 facial data entries, and you can give each facial data a custom name.

![Face ID](/img/application/face-id/user-face-id.png)

### Third step: Incorporate Face ID as a login option under the Signin methods section of the application

`Identity` -> `Applications` -> Choose an application -> Go to the `Signin methods` section and incorporate `Face ID` as a login option.

![Face ID](/img/application/face-id/signin-methods-face-id.png)

### Finally, you can log in using the Face ID method on the login page

1. On the login page, select the `Face ID` login method.
2. Enter the username, click on `Sign in with Face ID`.
3. Once you grant permission to access your camera, you'll be able to log in using `Face ID`.

![Face ID](/img/application/face-id/face-id-signin.png)

![Face ID](/img/application/face-id/face-recognition.png)

Here is a video demonstrating how to configure Face ID login:

<video src="/video/application/face-id-demo.mp4" controls="controls" width="100%"></video>
