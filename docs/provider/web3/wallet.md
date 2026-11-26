---
title: Sign in with MetaMask and other Ethereum wallets
sidebar_label: Ethereum wallets
description: Let people sign in to Casdoor with MetaMask, Coinbase Wallet, Rabby, OKX Wallet or any other Ethereum wallet by Sign-In with Ethereum (EIP-4361), with the Web3 Wallet Sign-In plugin of the Marketplace.
keywords: [Web3, Ethereum, MetaMask, wallet, SIWE, EIP-4361, Sign-In with Ethereum, Marketplace]
authors: [hsluoyz]
---

This guide explains how to let people sign in to Casdoor with an Ethereum wallet. On the sign-in page they click the wallet button, pick a wallet installed in their browser, such as MetaMask, Coinbase Wallet, Rabby or OKX Wallet, and sign a one-time message. Casdoor checks the signature and signs them in as the wallet address. Nothing is sent to the blockchain, so there is no transaction, no fee and no RPC node to run.

:::info Commercial edition

Web3 Wallet Sign-In is a paid integration of the [Marketplace](/docs/marketplace/overview). It needs a Casdoor Commercial or Enterprise edition license. Its code, including the wallet dialog of the sign-in page, is in the plugin: Casdoor downloads it when you install the plugin, and the sign-in page loads it only when someone clicks the wallet button. See [pricing](https://casdoor.com/pricing).

:::

---

#### Learning outcomes

- Install the Web3 Wallet Sign-In plugin and add the wallet button to an application.
- Know what the user signs and how Casdoor checks it.

#### What you need

- A Casdoor instance with a Commercial or Enterprise edition license, served over HTTPS in production.
- An administrator of the organization.

---

## Set up the provider

1. In the Casdoor admin console, open **Marketplace**, find **Web3 Wallet Sign-In** and install it. Casdoor adds an OAuth provider of type `Plugin` named after the integration.
1. Open the new provider in **Identity** > **Providers**. Keep **Auth URL**, **Client ID** and **Client secret** empty: the plugin signs in on the sign-in page itself instead of on an authorization page.
1. Optionally, offer only some wallets by putting their EIP-6963 names in **Metadata**, for example MetaMask only:

   ```json
   {"wallets": ["io.metamask"]}
   ```

1. Open your application, add the provider to its **Providers**, and save.

The sign-in page now shows the wallet button. Users can also link a wallet to an existing account on their account page, in the list of third-party logins.

## How it works

| Step | Where | What happens |
|---|---|---|
| 1 | Sign-in page | The user clicks the wallet button. Casdoor loads the sign-in script of the plugin, which lists the wallets of the browser (EIP-6963). |
| 2 | Wallet | The user picks a wallet and shares an account. |
| 3 | Casdoor | The plugin writes a [Sign-In with Ethereum (EIP-4361)](https://eips.ethereum.org/EIPS/eip-4361) message with the domain of the sign-in page, the address, a random nonce and an expiration time 5 minutes later. Casdoor keeps it in the user's session. |
| 4 | Wallet | The wallet shows the message and the user signs it (`personal_sign`). Wallets warn when the domain in the message is not the page's. |
| 5 | Casdoor | Casdoor gives the signed message back to the plugin, which checks that it is the message kept in the session, that it hasn't expired, and that the signature recovers to the address in it. The message can be used once. |
| 6 | Casdoor | The user is signed in as the wallet address, or signed up if the address is new and the application allows sign-up. |

The lowercase wallet address is the user's ID for the provider, and the shortened address, such as `0x2c75...5c23`, the display name. A wallet has no email or phone, so an application that requires them asks for them after sign-up as usual.

## Phones

On a phone, wallets don't add themselves to the browser. When no wallet is found, the button offers to open the page in the in-app browser of MetaMask or Coinbase Wallet, where the wallet is available, and otherwise links to a list of wallets to install.

## Limits

- Smart contract wallets that sign with EIP-1271 instead of a key, such as Safe, are not supported.
- WalletConnect, which signs with a wallet on another device by scanning a QR code, is not supported yet.
