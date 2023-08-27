---
title: Frontend
description: Casdoor Frontend Development Guide
keywords: [frontend, guide]
authors: [hsluoyz]
---

The source code for Casdoor's frontend is located inside the `/web` folder: <https://github.com/casdoor/casdoor/tree/master/web>

It is a [**Create-React-App (CRA)**](https://create-react-app.dev/) project, which follows the classic CRA folder structure as outlined below:

| File/Directory  | Description                                                              |
|-----------------|--------------------------------------------------------------------------|
| public          | The root HTML file for React                                             |
| src             | Source code                                                              |
| craco.config.js | The Craco configuration file. You can change the theme color (blue by default) here |
| crowdin.yml     | Crowdin i18n configuration file                                                 |
| package.json    | NPM/Yarn dependency file                                                 |
| yarn.lock       | Yarn lock file                                                           |

Inside the `/src` directory, you will find several important files and folders:

| File/Directory          | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| account                 | The "My profile" page for logged-in users                    |
| auth                    | All code related to authentication, such as OAuth, SAML, sign up page, sign in page, forget password page, etc. |
| backend                 | The SDK for calling the Go backend API. It contains all the `fetch()` calls |
| basic                   | The homepage (dashboard page) for Casdoor, which contains several card widgets |
| common                  | Shared UI widgets                                            |
| locales                 | i18n translation files in JSON, synced with our Crowdin project: <https://crowdin.com/project/casdoor-site> |
| App.js                  | The entry JS file containing all the routes                  |
| Setting.js              | Utility functions used by other code                     |
| OrganizationListPage.js | The page for the organization list, similar to all other `XXXListPage.js` files |
| OrganizationEditPage.js | The page for editing one organization, similar to all other `XXXEditPage.js` files |
