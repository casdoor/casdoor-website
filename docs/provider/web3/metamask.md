---
title: MetaMask
description: Adding the MetaMask Web3 provider to your application
keywords: [MetaMask, Web3, provider]
authors: [Chinoholo0807]
---

:::note

This is an example of how to configure **MetaMask** as a Web3 provider.

:::

[MetaMask](https://metamask.io/) is a browser extension and app that functions as both a cryptocurrency wallet and a gateway to blockchain apps. Casdoor allows you to use MetaMask as an identity provider and enables Web3 login with MetaMask.

### Step 1: Create a MetaMask Web3 provider

To start, you need to create a MetaMask Web3 provider in Casdoor.

|    Name       |   Description          |
|      ----     |   ----                 |  
|Category       |   Choose `Web3`        |
|Type           |   Choose `MetaMask`    |

![Create a MetaMask Web3 provider](/img/providers/web3/metamask_provider_conf.png)

### Step 2: Add the provider to your application

Next, add the MetaMask Web3 provider to your application.

![Add the MetaMask Web3 provider to your application](/img/providers/web3/metamask_app_add.png)

### Step 3: Login with MetaMask

You can now log in with MetaMask. Here is a demo video.

<video src="/video/provider/web3/login_with_metamask.mp4" controls="controls" width="100%"></video>

:::tip

1. When logging in with MetaMask, please authorize only one Ethereum address. Casdoor will only bind one Ethereum address per user.

2. If you want to switch to another Ethereum address for login, please disconnect the connection between the current Ethereum address and Casdoor first.

![Disconnecting MetaMask](/img/providers/web3/metamask_disconnect.png)

:::
