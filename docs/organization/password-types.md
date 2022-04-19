

This section is to help you understand the different Passoword types when editing your organization info on casbin, here on this page https://door.casdoor.com/organizations/casbin

When editing your organization info on the page found in this link, 

After Editing the Organization: Name,Display name, Favicon, Website URL, the next input field you will find is the password type, which is followed by the Password Salt, Phone prefix, Default avatar, Tags, Master password, Soft deletion and LDAPs.


The topic of this section is the password type. We will go through each of the different password types listed in the options inorder to guide you on which one to select as per your needs.

-----Menu  Starts here---
1. What is a Plain password? (Include link to corresponding paragraph on this page.Click and go)
    1.1 Why you should use a plain password? (Include link to corresponding paragraph on this page.Click and go)
    1.2 Why you should not use a plain password? (Include link to corresponding paragraph on this page.Click and go)
    1.3 How will plain passwords suite your organizations? (Include link to corresponding paragraph on this page.Click and go)
    1.4 Learn more about Plain Password type here  (Include link to corresponding paragraph on this page.Click and go)

2. What is a Salt password? (Include link to corresponding paragraph on this page.Click and go)
    2.1 Why you should use a salt password? (Include link to corresponding paragraph on this page.Click and go)
    2.2 Why you should not use a salt password? (Include link to corresponding paragraph on this page.Click and go)
    2.3 How will salt passwords suite your organizations? (Include link to corresponding paragraph on this page.Click and go)
    2.4 Learn more about salt Password type here  (Include link to corresponding paragraph on this page.Click and go)


3. What is a md5-salt password? (Include link to corresponding paragraph on this page.Click and go)
    3.1 Why you should use a md5-salt password? (Include link to corresponding paragraph on this page.Click and go)
    3.2 Why you should not use a md5-salt password? (Include link to corresponding paragraph on this page.Click and go)
    3.3 Learn more about md5-salt Password type here  (Include link to corresponding paragraph on this page.Click and go)


4. What is a bcrypt password? (Include link to corresponding paragraph on this page.Click and go)
    4.1 Why you should use a bcrypt password? (Include link to corresponding paragraph on this page.Click and go)
    4.2 Why you should not use a bcrypt password? (Include link to corresponding paragraph on this page.Click and go)
    4.3 Learn more about bcrypt Password type here  (Include link to corresponding paragraph on this page.Click and go)


5. What is a pbkdf2-salt password? (Include link to corresponding paragraph on this page.Click and go)
    5.1 Why you should use a pbkdf2-salt password? (Include link to corresponding paragraph on this page.Click and go)
    5.2 Why you should not use a pbkdf2-salt password? (Include link to corresponding paragraph on this page.Click and go)
    5.3 Learn more about pbkdf2-salt Password type here  (Include link to corresponding paragraph on this page.Click and go)

-----Menu  Ends here---



1. What is a Plain password? 
A plain text password (or Plaintext, or Plain-text) is a way of writing (and sending) a password in a clear, readable format. Such password is not encrypted and can be easily read by other humans and machines. 

1.1 Why you should use a plain password? 

@  It's simple and customizable: It's simple and customizable. You don't need to rely on any external tools or applications that: might have bugs or vulnerabilities, might be targeted specifically by attackers because they are sufficiently popular.

@  You can really rely on one single password: to be able to remember all the others, because in case of "trouble" you might get confused on different passwords.

1.2 Why you should not use a plain password? 
@  Anyone can read it:  If you store a password in clear, readable text, anyone who has (un)authorized access to your account or device can read it. And if that person is a hacker who has just broken into the database, your sensitive data now belongs to him.

@ A plaintext password is a password that is not encrypted using an encryption algorithm, rather the password is displayed on the screen when you enter it through the keyboard. 
Therefore it is stored in the system datbase as plaintext and is easy to for hackers to access your account, when the database is compromised.

1.3 How will plain passwords suite your organizations?
@ Plain text password will suite your organization, if only one person is using your organization account and the organization account is not logged in on multiple devices.

1.4 Learn more about Plain Password type here 
https://www.sciencedirect.com/topics/computer-science/plaintext-password
https://askinglot.com/what-is-a-plaintext-password
https://stormpath.com/blog/why-you-might-want-to-store-your-passwords-in-plain-text


2. What is a Salt password?
A salt password is simply one where a unique, random string of characters is added to the password before it is hashed. This random string of characters is known only to the site, and it is usually added infront of the password. 
see usgae here https://github.com/casdoor/casdoor/blob/master/cred/sha256-salt.go

2.1 Why you should use a salt password?
@ The use of unique salts means that common passwords shared by multiple users – such as “123456” or “password” – aren’t immediately revealed when one such hashed password is identified – because despite the passwords being the same the salted and hashed values are not.

@ Large salts also protect against certain methods of attack on hashes, including rainbow tables or logs of hashed passwords previously broken.

2.2 Why you should not use a plain password? (Include link to corresponding paragraph on this page.Click and go)

Using Salt passwords is wise however, there is a setback to this because;

    1)  The weakness is that the salt requires to be stored with the password, so the intruder just uses a fast computer. and tries all the main passwords, and is able to determine the original password.

    2) If the salted password string is short, then it is vulnerable to a brute-force attack.

2.4 Learn more about salt Password type here  (Include link to corresponding paragraph on this page.Click and go)
https://www.sciencedirect.com/topics/computer-science/plaintext-password
https://www.sitepoint.com/risks-challenges-password-hashing/
https://sudonull.com/post/93227-Risks-and-problems-of-password-hashing


3. What is a md5-salt password? 
MD5 (Message Digest Method 5) is a cryptographic hash algorithm used to generate a 128-bit digest from a string of any length. It represents the digests as 32 digit hexadecimal numbers.

3.1 Why you should use a md5-salt password? (
    1) Storing Passwords: By using MD5, passwords are stored in 128-bit format.

    2) Easy to Compare: Unlike the latest hash algorithm families, a 32 digit digest is relatively easier to compare when verifying the digests.

3.2 Why you should not use a md5-salt password? 
1) MD5 has prone to hash collision weakness, i.e. it is possible to create the same hash function for two different inputs
 MD5 provides no security over these collision attacks.

3.3 Learn more about md5-salt Password type here 
https://www.educba.com/md5-alogrithm/
https://www.simplilearn.com/tutorials/cyber-security-tutorial/md5-algorithm
https://bit.ly/3JWh6sH


4. What is a bcrypt password? (Include link to corresponding paragraph on this page.Click and go)
Bcrypt is an adaptive hashing algorithm based on the Blowfish symmetric block cipher cryptographic algorithm.
Bcrypt uses a modified key setup algorithm that requires a long time to process. Key strengthening makes a password more secure against brute-force attacks.

4.1 Why you should use a bcrypt password? 
1) t encrypts text numerous times uptil 64 times using Blowfish. In bcrypt the usual Blowfish key setup function is replaced with an expensive key setup. Making it difficult to decrypt.
2) Not easy to attack because potential attackers must spend a substantial amount of time testing every possible key.



4.3 Learn more about bcrypt Password type here  (Include link to corresponding paragraph on this page.Click and go)
https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
https://docs.pega.com/security/86/bcrypt-hashing-algorithm-password-property-types


5. What is a pbkdf2-salt password? (Include link to corresponding paragraph on this page.Click and go)
PBKDF2, defined in RFC 2898, is a specific Key Derivation Function (KDF). A KDF is simply any mechanism for taking a password (something a user remembers or stores in a password manager) and turning it into a symmetric key suitable for cryptographic operations (i.e., AES). 

5.1 Why you should use a pbkdf2-salt password? 
1) WIth pbkdf2-salt password type, your password is encrypted, and hard to decrypt in such a way that the attacker can only make, a few thousand guesses per second or even less. Meaning that the password is much longer if pbkdf2-salt,bcrypt, or scrypt are used instead of a regular hash function.

5.2 Why you should not use a pbkdf2-salt password? (Include link to corresponding paragraph on this page.Click and go)
Predominantly, pbkdf2-salt password







- `plain`. The password will be stored in cleartext. (default)
- `salt`. The password will be stored using [SHA256](https://github.com/casdoor/casdoor/blob/master/cred/sha256-salt.go) algorithm.
- `md5-salt`. The password will be stored using the [MD5](https://github.com/casdoor/casdoor/blob/master/cred/md5-user-salt.go) algorithm.
- `bcrypt`. The password will be stored using the [bcrypt](https://github.com/casdoor/casdoor/blob/master/cred/bcrypt.go) algorithm.
- `pbkdf2-salt`. The password will be stored using the [SHA256 and PBKDF2](https://github.com/casdoor/casdoor/blob/master/cred/pbkdf2-salt.go) algorithm. It's originally implemented in Casdoor for Keycloak syncer.  Select this option if you import users by Keycloak syncer. 




