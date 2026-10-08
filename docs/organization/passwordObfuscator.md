---
title: Encrypt passwords in transit
sidebar_label: Password obfuscator
description: Make the Casdoor frontend encrypt passwords with AES or DES before it sends them to the sign-in and set-password APIs.
keywords: [password, obfuscator, AES, DES]
authors: [ZhaoYP-2001]
---

This guide explains how to turn on the password obfuscator of an organization. The Casdoor frontend then encrypts passwords before it sends them to the server, in addition to the encryption of the HTTPS connection.

---

#### Learning outcomes

- Choose the obfuscation algorithm and key of an organization.
- Know which API fields are encrypted and how clients without obfuscation behave.

#### What you need

- Administrator access to the organization in the Casdoor admin console

---

## Turn on the obfuscator {#configuration}

1. In the Casdoor admin console, open the edit page of the organization.
1. Select an option in **Password obfuscator**:

   | Option | Passwords are sent |
   |---|---|
   | `Plain` | As plaintext |
   | `AES` | Encrypted with AES |
   | `DES` | Encrypted with DES |

   ![Password obfuscator field of the organization](/img/organization/password_obfuscator/password_obfuscator.png)

1. When you select `AES` or `DES`, Casdoor generates a key and fills in **Password obf key**. To use your own key, replace the value. If the key doesn't fit the algorithm, Casdoor shows an error with the expected format.

   ![Password obf key field of the organization](/img/organization/password_obfuscator/password_obf_key.png)

1. Save the organization.

<video src="/img/organization/password_obfuscator/password_obfuscator.mp4" controls="controls" width="100%"></video>

## Encrypted fields {#api-support}

| API | Encrypted fields |
|---|---|
| Sign in (`/api/login`) | `password` |
| Set password (`/api/set-password`) | `oldPassword`, `newPassword` |

The frontend encrypts these fields. The backend decrypts them with the algorithm and key of the organization and then processes them as usual.

## Clients without obfuscation {#backward-compatibility}

The set-password API accepts obfuscated passwords and plaintext passwords. If the organization has no obfuscator, or if decryption fails, the API treats the value as plaintext. The following clients therefore keep working:

- SDKs that don't support the obfuscator yet
- Direct API calls with plaintext passwords
- Existing integrations

## See also

- [Password complexity](/docs/organization/passwordComplexity)
- [Organizations](/docs/organization/overview)
