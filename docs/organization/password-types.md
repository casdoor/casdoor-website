---
sidebar_position: 1
title: password-types
---

This section is to help you understand the different Password types when editing your organization info on casbin, here on this page https://door.casdoor.com/organizations/casbin

When editing the Organization: Name,Display name, Favicon, Website URL, the next input field you will find is the password type, which is followed by the Password Salt, Phone prefix, Default avatar, Tags, Master password, Soft deletion and LDAPs.

![Password-Type-Image](/img/casdoor-password-img.png)

The topic of this section is the password type. We will go through each of the different password types listed in the options inorder to guide you on which one to select as per your needs.


## 1. What is a Plain password? 
A `plain`. text password (or Plaintext, or Plain-text) is a way of writing (and sending) a password in a clear, readable format. Such password is not encrypted and can be easily read by other humans and machines. 


### 1.1 Why you should use a plain password? 

- It's simple and customizable: It's simple and customizable. You don't need to rely on any external tools or applications that: might have bugs or vulnerabilities, might be targeted specifically by attackers because they are sufficiently popular.

- You can really rely on one single password: to be able to remember all the others, because in case of "trouble" you might get confused on different passwords.

### 1.2 Why you should not use a plain password? 
- Anyone can read it:  If you store a password in clear, readable text, anyone who has (un)authorized access to your account or device can read it. And if that person is a hacker who has just broken into the database, your sensitive data now belongs to him.

- A plaintext password is a password that is not encrypted using an encryption algorithm, rather the password is displayed on the screen when you enter it through the keyboard. 
Therefore it is stored in the system datbase as plaintext and is easy to for hackers to access your account, when the database is compromised.

### 1.3 Learn more about Plain Password type here 
[Plain text Password from 'Science Direct'](https://www.sciencedirect.com/topics/computer-science/plaintext-password) <br />

[Plain text Password from 'AskingLot'](https://askinglot.com/what-is-a-plaintext-password) <br />

[Plain text Password from 'StromPath.com'](https://stormpath.com/blog/why-you-might-want-to-store-your-passwords-in-plain-text)  <br />


## 2. What is a Salt password?
A `salt` password is simply one where a unique, random string of characters is added to the password before it is hashed. This random string of characters is known only to the site, and it is usually added infront of the password. 
see usgae here https://github.com/casdoor/casdoor/blob/master/cred/sha256-salt.go

### 2.1 Why you should use a salt password?
- The use of unique salts means that common passwords shared by multiple users – such as “123456” or “password” – aren’t immediately revealed when one such hashed password is identified – because despite the passwords being the same the salted and hashed values are not.

- Large salts also protect against certain methods of attack on hashes, including rainbow tables or logs of hashed passwords previously broken.

### 2.2 Why you should not use a plain password? 
Using Salt passwords is wise however, there is a setback to this because;

-  The weakness is that the salt requires to be stored with the password, so the intruder just uses a fast computer. and tries all the main passwords, and is able to determine the original password.

- If the salted password string is short, then it is vulnerable to a brute-force attack.

### 2.3 Learn more about salt Password type here 
[Salt Password type from 'AskingLot'](https://www.sciencedirect.com/topics/computer-science/plaintext-password) <br />
[Risks and Challenges of Hashing](https://www.sitepoint.com/risks-challenges-password-hashing/) <br />
[Problems of Password Hashing from sudonull](https://sudonull.com/post/93227-Risks-and-problems-of-password-hashing)


## 3. What is a md5-salt password? 
`MD5 (Message Digest Method 5)` is a cryptographic hash algorithm used to generate a 128-bit digest from a string of any length. It represents the digests as 32 digit hexadecimal numbers.

### 3.1 Why you should use a md5-salt password? (
- Storing Passwords: By using MD5, passwords are stored in 128-bit format.

- Easy to Compare: Unlike the latest hash algorithm families, a 32 digit digest is relatively easier to compare when verifying the digests.

### 3.2 Why you should not use a md5-salt password? 
- MD5 has prone to hash collision weakness, i.e. it is possible to create the same hash function for two different inputs
 MD5 provides no security over these collision attacks.

### 3.3 Learn more about md5-salt Password type here 
[md5-salt on educba.com](https://www.educba.com/md5-alogrithm/) <br />
[About md5-algorithm](https://www.simplilearn.com/tutorials/cyber-security-tutorial/md5-algorithm) <br />
[What is MD5 SALT](https://bit.ly/3JWh6sH)


## 4. What is a bcrypt password? 
`Bcrypt` is an adaptive hashing algorithm based on the Blowfish symmetric block cipher cryptographic algorithm.
Bcrypt uses a modified key setup algorithm that requires a long time to process. Key strengthening makes a password more secure against brute-force attacks.

### 4.1 Why you should use a bcrypt password? 
- It encrypts text numerous times uptil 64 times using Blowfish. In bcrypt the usual Blowfish key setup function is replaced with an expensive key setup. Making it difficult to decrypt.
- Not easy to attack because potential attackers must spend a substantial amount of time testing every possible key.


### 4.2 Learn more about bcrypt Password type here 
[Understanding bcrypt](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) <br />


## 5. What is a pbkdf2-salt password?
`PBKDF2`, defined in RFC 2898, is a specific Key Derivation Function (KDF). A KDF is simply any mechanism for taking a password (something a user remembers or stores in a password manager) and turning it into a symmetric key suitable for cryptographic operations (i.e., AES). 

### 5.1 Why you should use a pbkdf2-salt password? 
- WIth pbkdf2-salt password type, your password is encrypted, and hard to decrypt in such a way that the attacker can only make, a few thousand guesses per second or even less. Meaning that the password is much longer if pbkdf2-salt,bcrypt, or scrypt are used instead of a regular hash function.

- Predominantly, pbkdf2-salt password is a hashed salted password, that is handy for a variety of use cases. 

### 5.2 Learn more about pbkdf2-salt password 
[pbkdf2-salt password](https://bit.ly/3OkM9ll) <br />
[pbkdf2-salt password](https://bit.ly/3LaHNek) <br />
