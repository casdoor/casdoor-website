---
title: WeChat Pay
description: Add WeChat Pay OAuth provider to your application.
keywords: [WeChat Pay, payment]
authors: [Wrapping-2000]
---
## Step 1: Deploy Casdoor

Firstly, Casdoor should be deployed.

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation). Please deploy your Casdoor instance in **production mode**.

After a successful deployment, you need to ensure:

- Open your favorite browser and visit **<http://localhost:8000>**; you will see the login page of Casdoor.
- Input `admin` and `123` to verify that the login functionality is working fine.

Then you can quickly implement a Casdoor based login page in your own app with the following steps.

## Step 2: Configure payment callback notification address

Before that, please log in to the WeChat Pay Merchant Platform. In order for Casdoor to receive payment result notifications, you need to set a callback notification address in the WeChat Pay Merchant Platform.

- In the Merchant Dashboard, go to `Development Configuration` -> `Payment Configuration`.
- Find the `Callback Notification Address` setting and click the `Modify` button.
- Fill in the payment callback notification address of the Casdoor instance. For example:

```url
https://your-casdoor-url.com/api/wechat-payment-callback
```

## Step 3: Configure API Security

### Get APIv3 key

To ensure the security of API calls, you need to configure API security settings in the WeChat Pay Merchant Platform.

Log in to the [WeChat Merchant Platform](https://pay.weixin.qq.com/), go to `Account center` -> `Account settings` -> `API security` -> `APIv3 key` -> `Set up`.

### Get the serial number of the merchant certificate

It is also necessary to obtain the serial number of the merchant certificate. Follow these steps to obtain it:

Log in to the [WeChat Merchant Platform](https://pay.weixin.qq.com/), go to `Account center` -> `Account settings` -> `API security` ->  `API certificate management` -> copy the serial number.

You can refer to the [WeChat Payment Merchant ID Query Guide](https://kf.qq.com/faq/200729EZ7fEj200729aumYR7.html), [APIv3 Key Settings](https://kf.qq.com/faq/180830E36vyQ180830AZFZvu.html), and [How to View the Certificate Serial Number](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay7_0.shtml#part-5) for help.

## Step 4: Add the payment provider

### Select WeChat Pay as the payment type

![wechat_select](/img/providers/payment/wechat_select.png)

### Get the payment URL

Log in to the [WeChat Merchant Platform](https://pay.weixin.qq.com/), go to `Commodity centered` -> `Development arrangement` -> `Payment arrangements` -> `Payment URL` -> `Copy`

### Fill in the necessary information in Casdoor

There are four required fields: `Client ID`, `Client secret`, `App ID`, `Provider URL`. The relationship corresponding to the Azure Blob account is as follows:

| Name          | Name in WeChat Pay |  Is Required |
|---------------|--------------------|-------------|
| Client ID     | Merchant ID        | Yes         |
| Client secret | APIv3 key          | Yes         |
| App ID        | App ID             | Yes         |
| Provider URL  | Payment URL        | Yes         |

The acquisition of `Merchant ID` and `APIv3 key` is as mentioned before. For the App ID, see [here](https://pay.weixin.qq.com/static/pay_setting/appid_protocol.shtml) for more help.

![wechat_provider](/img/providers/payment/wechat_Provider.png)

## Step 5: Add WeChat Cert

In this step, you need two required fields: `Serial number` and `Private key`.

How to obtain the serial number has been explained in the third step.

To get the `Private key`, click [here](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay3_1.shtml) for help.

![wechat_cert](/img/providers/payment/wechat_cert.png)

## Step 6: Add WeChat Payment Provider in Products

![wechat_provider](/img/providers/payment/wechat_products.png)

Final effect:
![wechat_provider](/img/providers/payment/wechat_result.png)

## What's more

You can explore the following projects/docs to learn more about WeChat Pay:

- [wechatpay-apiv3-go-sdk](https://github.com/wechatpay-apiv3/wechatpay-go)
- [WeChat Payment Development Document](https://pay.weixin.qq.com/wiki/doc/api/index.html)
