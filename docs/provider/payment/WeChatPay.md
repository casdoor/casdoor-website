---
title: WeChatPay
description: Add Wechat OAuth provider to your application
keywords: [WeChatPay, payment]
authors: [Wrapping-2000]
---
## Step1. Deploy Casdoor

Firstly, the Casdoor should be deployed.

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation). Please deploy your Casdoor instance in **production mode**.

After a successful deployment, you need to ensure:

- Open your favorite browser and visit **<http://localhost:8000>**, you will see the login page of Casdoor.
- Input `admin` and `123` to test login functionality is working fine.

Then you can quickly implement a casdoor based login page in your own app with the following steps.

## Step2. Configure payment callback notification address

Before that, please log in to the WeChat Pay Merchant Platform. In order for Casdoor to receive payment result notifications, you need to set a callback notification address in the WeChat Pay Merchant Platform.

- In Merchant Dashboard, go to `Development Configuration` -> `Payment Configuration`.
- Find the `Callback Notification Address` setting, and click the `Modify` button.
- Fill in the payment callback notification address of the Casdoor instance. For example:

```url
https://your-casdoor-instance.com/api/wechat-payment-callback
```

## Step3. Configure API Security

### Get APIv3 key

To ensure the security of API calls, you need to configure API security settings in the WeChat Pay Merchant Platform.

Log in the [WeChat merchant platform](https://pay.weixin.qq.com/) -> `Account center` -> `Account settings` -> `API security` -> `APIv3 key` -> `set up`

### Get the serial number of the merchant certificate

It is also necessary to obtain the serial number of the merchant certificate. The following are the steps to obtain it.

Log in the [WeChat merchant platform](https://pay.weixin.qq.com/) -> `Account center` -> `Account settings` -> `API security` ->  `API certificate management` -> copy the serial number.

You can refer to the [WeChat payment merchant ID query guide](https://kf.qq.com/faq/200729EZ7fEj200729aumYR7.html) , [APIv3 key settings](https://kf.qq.com/faq/180830E36vyQ180830AZFZvu.html) and [How to view the certificate serial number](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay7_0.shtml#part-5) for help.

## Step4. Add payment provider

### Select the WeChat Pay as the Payment type

![wechat_select](/img/providers/payment/wechat_select.png)

### Get Payment URL

Log in the [WeChat merchant platform](https://pay.weixin.qq.com/) -> `Commodity centered` -> `Development arrangement` -> `payment arrangements` -> `Payment URL` -> `copy`

### Fill the necessary information in Casdoor

There are four required fields, `Client ID`, `Client secret`, `appId`, `Provider URL`. The relationship corresponding to the Azure Blob account is as follows:

| Name          | Name in WeChat Pay |   is required |
|---------------|--------------------|  ----         |
| Client ID     | merchant ID        | required     |
| Client secret | APIv3 key          | required      |
| appId         | appId              | required      |
| Provider URL  | Payment URL        | required      |

The acquisition of `merchant ID` and `APIv3 key` is as mentioned before. For appId, see [here](https://pay.weixin.qq.com/static/pay_setting/appid_protocol.shtml) for more help.

![wechat_provider](/img/providers/payment/wechat_Provider.png)

## Step5. Add WeChat Cert

In this step, you need two required fields, `serial number`, `private key`.

How to obtain the serial number has been stated in the third step.

To get `private key`, click [here](https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay3_1.shtml) for help.

![wechat_cert](/img/providers/payment/wechat_cert.png)

## Step6. Add WeChat Payment Provider in Products

![wechat_provider](/img/providers/payment/wechat_products.png)

Final effect:
![wechat_provider](/img/providers/payment/wechat_result.png)

## What's more

You can explore the following projects/docs to learn more about WeChat Pay.

- [wechatpay-apiv3-go-sdk](https://github.com/wechatpay-apiv3/wechatpay-go)
- [Wechat payment development document](https://pay.weixin.qq.com/wiki/doc/api/index.html)
