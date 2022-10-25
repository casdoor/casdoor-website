---
title: WebAuthn
description: Use WebAuthn in Casdoor
keywords: [webauthn]
---

## Overview

We are delighted to inform the Casdoor's customers that Casdoor now supports logging in with WebAuthn, which means, you may be able to log in with your biological identifications like fingerprints or facial recognition even U-disks, provided that your device support these cool authorization method and WebAuthn.

### What is WebAuthn?

The Web Authentication API (also known as WebAuthn: https://webauthn.io/) is a specification written by the W3C and FIDO, with the participation of Google, Mozilla, Microsoft, Yubico, and others. The API allows servers to register and authenticate users using public key cryptography instead of a password. **It allows servers to integrate with the strong authenticators now built into devices, like Windows Hello or Apple’s Touch ID**. 

To be concise, WebAuthn asks users to generate a public key - private key pair, and hand over the public key to the website. When a user wants to log in to a website, the web generates a random number and asks the user to encrypt it with its private key and send back the result. After receiving the result, the website will try to use the public key to decrypt, and if the decrypted number is the same as the random number generated before, the user will be regarded as a legal user and he will be allowed to log in. We call the public key combined with necessary information (like username or information about user's authorizer ) the Webauthn Credential, which is exactly what is stored by the website.

The public key - private key pair is exclusively uniquely distinguished three information: (user's username, user's authorizer, and the website's url). This means, if the (user's username, user's authorizer, and the website's url) is all the same, the key pair should be identical, and vice versa.

For more detailed information about the WebAuthn Technology, you can visit <https://webauthn.guide/>.

### How to use WebAuthn in casdoor?

In the login page, you must have already seen the choice of using WebAuthn to login in. But considering that you haven't got a Webauthn credential (webauth password, if this inaccurate explanation can make you understand better) yet, so in this tutorial, we are going to show you how to create and manage a credential first and then, how to log in with the credential.

#### Step0: modify the configurations and turn on the WebAuthn authentication

In conf/app.conf you can see

```ini
origin = "http://localhost:8000"
```

Please ensure this configuration is EXACTLY the url of your website

**Only https is supported for WebAuthn unless you are using localhost**

Then log in as the administrator and go to the edit page of your application. Turn the switch on "Enable WebAuthn signin". By default, this feature is not enabled.

#### Step 1: go to "my account" page

Step 1: go to account page. On this page, you shall see the "Add WebAuthn Credential" Button and a list manifesting all the Webauthn credentials you have previously registered.

![Webauthn1](/img/webauthn/webauthn.png)

Press the button and then follow the instructions of your device to register a new credential into casdoor.

You can remove any credentials via the "delete" button in the list.

#### Step 2: log in via WebAuthn

Before this step starts, make sure you have logged out the casdoor.

Go to the log in page, choose the wenauthn login method, enter your username and press the login button, and follow the instructions of your device.

(For example, if you use fingerprint and Window Hello, you are supposed to see something like this)

![Webauthn2](/img/webauthn/login_webauthn.png)

Then you will see that you have already logged in.
