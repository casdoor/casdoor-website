---
title: Password obfuscator
description: Encrypt password parameters in login and set-password APIs.
keywords: [password, obfuscator, AES, DES]
authors: [ZhaoYP-2001]
---

The **Password obfuscator** option encrypts password parameters for the login and set-password APIs before they are sent to the server. You choose the algorithm and (optionally) the key at the organization level.

## Configuration

On the organization edit page, set **Password obfuscator**:

![password_obfuscator](/img/organization/password_obfuscator/password_obfuscator.png)

| Option | Behavior |
|--------|----------|
| **Plain** | Passwords are sent in plain text. |
| **AES** | Passwords are encrypted with AES before transmission. |
| **DES** | Passwords are encrypted with DES before transmission. |

When you switch to AES or DES, Casdoor generates a key and fills **Password obf key**. You can override it with your own key:

![password_obf_key](/img/organization/password_obfuscator/password_obf_key.png)

:::note
If the key does not match the algorithm’s requirements, Casdoor shows an error with the expected key format (regex).
:::

## API support

| API | Encrypted fields |
|-----|------------------|
| **Login** (`/api/login`) | `password` |
| **Set password** (`/api/set-password`) | `oldPassword`, `newPassword` |

With obfuscation enabled, the Casdoor frontend encrypts these fields before sending; the backend decrypts with the configured key and algorithm, then processes them as usual.

### Backward compatibility

The set-password API accepts both obfuscated and plaintext passwords. If obfuscation is not configured or decryption fails, it falls back to plaintext. This keeps compatibility with:

- SDKs that do not yet support obfuscation
- Direct API calls using plaintext
- Existing integrations

Demo:

<video src="/img/organization/password_obfuscator/password_obfuscator.mp4" controls="controls" width="100%"></video>
