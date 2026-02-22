---
title: Face ID
description: Sign in with Face ID using face-api.js.
keywords: [face id, signin, biometric]
authors: [HGZ-20]
---

Casdoor supports **Face ID** sign-in using face-api.js. Users register facial data in their account and can sign in by scanning their face on the login page.

## Enable Face ID

### 1. Add Face ID to account items

**User Management** → **Organizations** → select organization → **Account items** → add **Face ID**.

![Face ID](/img/application/face-id/organization-face-id.png)

### 2. Let users add facial data

**User Management** → **Users** → select user → **Face Ids**. Users can add up to 5 face entries and give each a name.

![Face ID](/img/application/face-id/user-face-id.png)

### 3. Add Face ID to sign-in methods

**Identity** → **Applications** → select application → **Signin methods** → add **Face ID**.

![Face ID](/img/application/face-id/signin-methods-face-id.png)

### 4. Sign in with Face ID

1. On the login page, choose the **Face ID** method.
2. Enter the username and click **Sign in with Face ID**.
3. Allow camera access when prompted, then complete face verification.

![Face ID](/img/application/face-id/face-id-signin.png)
![Face ID](/img/application/face-id/face-recognition.png)

Demo video:

<video src="/video/application/face-id-demo.mp4" controls="controls" width="100%"></video>
