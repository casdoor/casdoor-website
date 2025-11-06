---
title: Password Obfuscator
description: Supporting different password obfuscator options.
keywords: [password, obfuscator]
authors: [ZhaoYP-2001]
---

Here, we will show you how to enable the option to specify the password obfuscator for password parameters in the login and set-password APIs.

## Configuration

On the organization edit page, you can find the `Password obfuscator` configuration option. You can select the encryption algorithm from the dropdown list.

![password_obfuscator](/img/organization/password_obfuscator/password_obfuscator.png)

- Plain: Password parameters will be transmitted directly in plain text.
- AES: Password parameters will first be encrypted using the AES algorithm and then transmitted in ciphertext form.
- DES: Password parameters will first be encrypted using the DES algorithm and then transmitted in ciphertext form.

Each time you update the encryption algorithm other than Plain, Casdoor will randomly generate an encryption key for you and populate it into the `Password obf key` configuration option. If you want to specify the encryption key for the encryption algorithm, you can modify the key in `Password obf key` configuration option:

![password_obf_key](/img/organization/password_obfuscator/password_obf_key.png)

:::note

If your key does not meet the encryption algorithm requirements, Casdoor will prompt you with the regular expression that the key should meet in the error message.

:::

## API Support

Password obfuscation is supported by the following APIs:

- **Login API** (`/api/login`): Encrypts the password field during authentication
- **Set Password API** (`/api/set-password`): Encrypts both `oldPassword` and `newPassword` fields when changing passwords

When password obfuscation is enabled, Casdoor's frontend automatically encrypts password values before sending them to the server. The backend decrypts these values using the configured key and algorithm, then processes them normally.

### Backward Compatibility

The set-password API maintains full backward compatibility. If obfuscation is not configured or decryption fails, the API automatically falls back to accepting plaintext passwords. This ensures compatibility with:

- Casdoor SDKs that may not support obfuscation yet
- Direct HTTP API calls using plaintext passwords
- Legacy integrations

Here is a demo video that shows how to use password obfuscator:

<video src="/img/organization/password_obfuscator/password_obfuscator.mp4" controls="controls" width="100%"></video>
