---
title: Send SMS with Twilio Verify
sidebar_label: Twilio Verify
description: Use Twilio Verify to send and check the SMS verification codes of Casdoor.
keywords: [Twilio, Twilio Verify, SMS, OTP, provider]
authors: [hsluoyz]
---

With the `Twilio Verify` type, Twilio generates the SMS verification code, sends it, and checks the code that the user enters. Casdoor only starts the verification and asks Twilio whether the code is approved. Use it instead of [Twilio SMS](/docs/provider/sms/twilio) when you want Twilio to handle the codes, for example to send them without registering a sender number.

---

#### Learning outcomes

- Create a Verify service in Twilio.
- Add Twilio Verify as an SMS provider in Casdoor and test it.

#### What you need

- A Twilio account
- Administrator access to the Casdoor admin console

---

## Create a Verify service

1. In the [Twilio Console](https://console.twilio.com/), copy the Account SID and the Auth Token.
1. Go to **Verify** > **Services** and create a service with the SMS channel. Copy its Service SID, which starts with `VA`.

The code length and the code lifetime are set on the Verify service. Keep the lifetime no shorter than the verification code timeout of Casdoor (`verificationCodeTimeout` in `conf/app.conf`, 10 minutes by default).

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SMS` and **Type** to `Twilio Verify`.
1. Fill in the fields:

   | Casdoor field | Twilio      | Required |
   |---------------|-------------|----------|
   | Client ID     | Account SID | Yes      |
   | Client secret | Auth Token  | Yes      |
   | Service SID   | Service SID | Yes      |

1. Save the provider and add it to your application. See [Add providers to an application](/docs/application/providers).

The provider works in all the places where Casdoor sends SMS codes: sign-up, sign-in with a code, binding or changing a phone number, password recovery, and SMS multi-factor authentication.

## Verify the result

Enter a phone number in **SMS Test** and send a test message. You get a code from Twilio Verify.

## How the codes are checked

- The code that the user enters is checked by the Verification Check API of Twilio. Only an `approved` result passes. A wrong code, or a verification that has expired, has already been approved, or has run out of attempts, counts as a wrong code.
- Casdoor still applies its own limits: the resend interval, the code timeout, the failed attempt limits, and a code that has been used can't be used again.
- Twilio Verify sends its own message text, so the **Template code** field isn't used. The send SMS API of Casdoor also sends a Verify code instead of the content you pass.

## See also

- [Twilio SMS](/docs/provider/sms/twilio)
- [SMS providers](/docs/provider/sms/overview)
