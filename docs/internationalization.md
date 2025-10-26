---
title: Internationalization
description: Helping Casdoor support different languages
keywords: [i18n, translation, internationalization]
authors: [ErikQQY]
---

Casdoor supports multiple languages for both the frontend UI and backend API responses. By deploying the translations to [Crowdin](https://crowdin.com/project/casdoor-web), we can provide support for Spanish, French, German, Chinese, Indonesian, Japanese, Korean, and more.

## Frontend Internationalization

Casdoor utilizes the official Crowdin CLI to synchronize translations from Crowdin. If you wish to add support for additional languages, please submit your proposal in [our community](https://github.com/casdoor/casdoor). Moreover, if you would like to contribute to expediting the translation work, kindly consider assisting us in translating on [Crowdin](https://crowdin.com/project/casdoor-web).

## Backend API Internationalization

Casdoor's backend API supports internationalized responses through the `Accept-Language` HTTP header. When you make API requests, include this header to receive error messages and other text content in your preferred language.

### Using Accept-Language Header

Add the `Accept-Language` header to your API requests:

```bash
curl -X GET https://door.casdoor.com/api/get-account \
  -H "Accept-Language: zh"
```

Common language codes:

- `en` - English (default)
- `zh` - Chinese
- `es` - Spanish
- `fr` - French
- `de` - German
- `ja` - Japanese
- `ko` - Korean
- `pt` - Portuguese

The backend will automatically translate error messages and other text responses based on the language specified. If the requested language is not available, Casdoor falls back to English.
