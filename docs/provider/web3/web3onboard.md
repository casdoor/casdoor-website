---
title: Web3-Onboard
description: Add the Web3-Onboard Web3 provider to your application
keywords: [Web3-Onboard, Web3, provider]
authors: [Chinoholo0807]
---

:::note

This is an example of how to configure **Web3-Onboard** as a Web3 provider.

:::

[Web3-Onboard](https://onboard.blocknative.com/) can help users use different wallets for Web3 login. Casdoor allows using Web3-Onboard as an identity provider and enables Web3 login with Web3-Onboard.

![web3-onboard](/img/providers/web3/web3onboard.png)

### Step 1: Create a Web3-Onboard Web3 provider

First, you need to create a Web3-Onboard Web3 provider in Casdoor.

| Name          | Description                            |
| ------------- | -------------------------------------- |
| Category      | Choose `Web3`                          |
| Type          | Choose `Web3-Onboard`                  |
| Wallets       | Choose the wallets that are allowed to log in |

![create a web3-onboard web3 provider](/img/providers/web3/web3onboard_provider_conf.png)

Currently, Casdoor only supports the wallets shown in the image above. The `Injected` wallets represent browser-injected wallets such as `MetaMask` or `Coinbase`.

### Step 2: Add the provider to your application

Second, add the Web3-Onboard Web3 provider to your application.

![add the web3-onboard web3 provider to your application](/img/providers/web3/web3onboard_app_add.png)

### Step 3: Login with Web3-Onboard

Now you can log in through Web3-Onboard. Here is a demo video.

<video src="/video/provider/web3/login_with_web3onboard.mp4" controls="controls" width="100%"></video>
