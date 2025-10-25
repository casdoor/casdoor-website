---
title: Verification Code Configuration
description: Configure verification code settings for your application
keywords: [verification code, OTP, email verification, phone verification, resend timeout]
authors: [Copilot]
---

Casdoor provides configurable verification code settings to enhance security and user experience when users sign up or verify their identity through email or SMS.

## Code Resend Timeout

The code resend timeout controls how long users must wait before requesting a new verification code. This prevents abuse while maintaining a smooth user experience.

### Configuration

To configure the code resend timeout for your application:

1. Navigate to your application's edit page in the Casdoor admin panel
2. Locate the **Code resend timeout** field
3. Enter the desired timeout value in seconds
4. Click **Save** to apply the changes

### Default Behavior

- **Default timeout**: 60 seconds
- When set to `0`: Uses the global default of 60 seconds
- **Recommended range**: 30-120 seconds depending on your security requirements

### Example Configuration

```plaintext
Code resend timeout: 90
```

With this setting, users must wait 90 seconds between verification code requests.

### How It Works

When a user requests a verification code via email or SMS:

1. Casdoor generates and sends the verification code
2. The system records the timestamp of the request
3. If the user attempts to request another code before the timeout expires, they receive an error message indicating the remaining wait time
4. After the timeout period, users can request a new code

### Security Considerations

Setting an appropriate timeout helps protect your application from:

- Spam attacks on email/SMS services
- Denial-of-service attempts through excessive code requests
- Unnecessary costs from SMS providers

Shorter timeouts improve user experience but may increase vulnerability to abuse. Longer timeouts enhance security but may frustrate legitimate users who didn't receive their code.

### Troubleshooting

If users report not receiving verification codes:

1. Check that email/SMS providers are properly configured
2. Verify that the timeout isn't too long for your use case
3. Review provider logs for delivery issues
4. Ensure users are checking the correct email address or phone number
