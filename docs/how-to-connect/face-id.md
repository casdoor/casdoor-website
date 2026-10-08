---
title: Set up Face ID sign-in
sidebar_label: Face ID
description: Let users register their face in their Casdoor account and sign in by scanning it on the sign-in page.
keywords: [face id, signin, biometric]
authors: [HGZ-20]
---

This guide explains how to turn on Face ID sign-in. Users register facial data in their account and then sign in by scanning their face on the sign-in page. Casdoor recognizes faces in the browser with face-api.js.

---

#### Learning outcomes

- Show the Face ID field on the account page of an organization.
- Register facial data for a user.
- Offer Face ID as a sign-in method of an application.

#### What you need

- Administrator access to the Casdoor admin console
- A device with a camera

---

## Add Face ID to the account page

1. In the Casdoor admin console, go to **User Management** > **Organizations** and open the organization.
1. In **Account items**, add **Face ID**.

   ![Account items of the organization with Face ID](/img/application/face-id/organization-face-id.png)

1. Save the organization.

## Register facial data

1. Go to **User Management** > **Users** and open the user. Users can do the same on their own account page.
1. In **Face IDs**, add a face entry and give it a name. A user can have up to five entries.

   ![Face IDs of a user](/img/application/face-id/user-face-id.png)

1. Save the user.

## Add Face ID to the sign-in methods

1. Go to **Identity** > **Applications** and open the application.
1. In **Signin methods**, add **Face ID**.

   ![Signin methods of the application with Face ID](/img/application/face-id/signin-methods-face-id.png)

1. Save the application.

## Verify the result

1. On the sign-in page of the application, select the **Face ID** method.
1. Enter the username and click **Sign in with Face ID**.

   ![Sign-in page with the Face ID method](/img/application/face-id/face-id-signin.png)

1. Allow the browser to use the camera, and look into the camera.

   ![Face recognition during sign-in](/img/application/face-id/face-recognition.png)

Casdoor signs you in when the face matches a registered entry.

<video src="/video/application/face-id-demo.mp4" controls="controls" width="100%"></video>

## See also

- [Face ID providers](/docs/provider/faceid/overview)
- [Sign-in methods](/docs/application/signin-methods)
- [Set up WebAuthn sign-in](/docs/how-to-connect/webauthn)
