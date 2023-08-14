---
title: Web3-Onboard
description: Add Web3-Onboard Web3 provider to your application
keywords: [Web3-Onboard, Web3, provider]
authors: [Chinoholo0807]
---

:::note

This is an example of configure **Web3-Onboard** as Web3 provider.

:::

[Web3-Onboard](https://onboard.blocknative.com/) can support users to use different wallets for Web3 login.
Casdoor allows using Web3-Onboard as an identity provider and enables Web3 login with Web3-Onboard.

### Step1. Create a Web3-Onboard Web3 provider

First, you need to create a Web3-Onboard Web3 provider in Casdoor.

|    Name       |   Description                         |
|      ----     |   ----                                |  
|Category       |   Choose `Web3`                       |
|Type           |   Choose `Web3-Onboard`               |
|Wallets        |   Choose the wallets that are allowed to login |

![create a web3-onboard web3 provider](/img/providers/web3/web3onboard_provider_conf.png)

Currently, Casdoor only supports wallets shown in the above image. The `Injected` wallets represent browser injected wallets such as `MetaMask` or `Coinbase`.

### Step2. Add provider to your application

Second, add Web3-Onboard Web3 provider to your application.

![add web3-onboard web3 provider to your applicaiton](/img/providers/web3/web3onboard_app_add.png)

### Step3. Login with Web3-Onboard

Now you can login through Web3-Onboard. Here is a demo video.

<video src="/video/provider/web3/login_with_web3onboard.mp4" controls="controls" width="100%"></video>
