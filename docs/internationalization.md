---
title: Internationalization
description: Casdoor’s supported languages and how to contribute translations.
keywords: [i18n, translation, internationalization, localization]
authors: [ErikQQY]
---

Casdoor’s interface and backend messages are translated into multiple languages. Supported languages include: English, Spanish, French, German, Japanese, Chinese, Vietnamese, Portuguese, Turkish, Polish, and Ukrainian. The same set of languages is available across the product (e.g. user profiles, organization settings) for a consistent experience.

Translations are managed on [Crowdin](https://crowdin.com/project/casdoor-web). The project syncs with Crowdin so that community contributions are pulled in and kept up to date.

If you want to improve or add translations, contribute on [Crowdin](https://crowdin.com/project/casdoor-web). Your contributions help users in your language use Casdoor more effectively.

## How Casdoor picks the language

The Casdoor frontend, including the sign-in pages and the admin console, picks its language in this order:

1. The language that the visitor picked in this browser, for example with the language selector of the sign-in page. Casdoor stores it in the browser's local storage. A `language` query parameter in the URL, such as `?language=fr`, sets it too.
1. Otherwise, `forceLanguage` in [`app.conf`](/docs/basic/configuration).
1. Otherwise, the browser language, if Casdoor supports it.
1. Otherwise, `defaultLanguage` in `app.conf`.

After a user signs in, Casdoor applies the **Language** of the user's account only when the browser has no stored language. So `forceLanguage` doesn't override a language that the user picked or that is saved in their account.

The `lang` attribute of the HTML page that the server sends is based on `forceLanguage`, then the `Accept-Language` header, then `defaultLanguage`, and finally `en`.

## Where Casdoor saves the language of a user

Casdoor saves the language to the **Language** field of the user's account:

- At sign-up, when the user picks a language with the language selector of the sign-up page. The sign-up item **Languages** controls the selector. When the organization offers only one language in its **Languages** setting, the sign-up page uses it and hides the selector.
- At sign-in, Casdoor saves the language that the sign-in page was shown in. For a sign-in through an OAuth provider, Casdoor remembers the language from the moment the user clicked the provider button until the provider redirects back. When this sign-in creates the account, the new account gets that language.

## See also

- [Configuration reference](/docs/basic/configuration)
- [Sign-up items](/docs/application/signup-items-table)
