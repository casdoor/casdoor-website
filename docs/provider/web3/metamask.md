---
title: MetaMask
description: Add MetaMask Web3 provider to your application
keywords: [MetaMask, Web3, provider]
authors: [Chinoholo0807]
---

:::note

This is an example of configure **MetaMask** as Web3 provider.

:::

[MetaMask](https://metamask.io/) is a browser extension and app that describes itself as a crypto wallet and a gateway to blockchain apps.
Casdoor allows using MetaMask as an identity provider and enables Web3 login with MetaMask.

### Step1. Create a MetaMask Web3 provider

First, you need to create a MetaMask Web3 provider in Casdoor.

|    Name       |   Description          |
|      ----     |   ----                 |  
|Category       |   choose `Web3`        |
|Type           |   choose `MetaMask`    |

![create a metamask web3 provider](/img/providers/web3/metamask_provider_conf.png)

### Step2. Add provider to your application

Second, add MetaMask Web3 provider to your application.

![add metamask web3 provider to your applicaiton](/img/providers/web3/metamask_app_add.png)

### Step3. Login with MetaMask

Now you can login with MetaMask. Here is a demo video.

<video src="/video/provider/web3/login_with_metamask.mp4" controls="controls" width="100%"></video>

:::tip

1. When login with MetaMask, please authorize only one Ethereum address. Casdoor will only bind one Ethereum address per user.

2. If you want to switch to another Ethereum address for login, please disconnect the connection between current Ethereum address and Casdoor first.

![metamask disconnect](/img/providers/web3/metamask_disconnect.png)

:::
