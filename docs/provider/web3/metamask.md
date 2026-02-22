---
title: MetaMask Web3
description: Use MetaMask as a Web3 sign-in provider.
keywords: [MetaMask, Web3, provider]
authors: [Chinoholo0807]
---

[MetaMask](https://metamask.io/) is a wallet and gateway to dApps. Casdoor can use it as a Web3 identity provider for “Sign in with MetaMask”.

## 1. Create the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Web3**, **Type** to **MetaMask**. No API keys required.

![Create a MetaMask Web3 provider](/img/providers/web3/metamask_provider_conf.png)

## 2. Add to your application

Add the MetaMask provider to the application’s provider list.

![Add the MetaMask Web3 provider to your application](/img/providers/web3/metamask_app_add.png)

## 3. Sign in with MetaMask

Users can sign in with MetaMask. Demo:

<video src="/video/provider/web3/login_with_metamask.mp4" controls="controls" width="100%"></video>

:::tip
- Authorize only one Ethereum address per user; Casdoor binds one address per account.
- To use a different address, disconnect the current one in Casdoor first, then sign in again with the new address.

![Disconnecting MetaMask](/img/providers/web3/metamask_disconnect.png)
:::
