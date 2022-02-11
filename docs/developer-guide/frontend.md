---
title: Frontend
sidebar_position: 1
---

The source code for Casdoor's frontend is inside the `/web` folder: https://github.com/casdoor/casdoor/tree/master/web

It is a [**Create-React-App (CRA)**](https://create-react-app.dev/) project, which has a classic CRA folder structure as
follows:

| File/Directory  | Description                                                              |
|-----------------|--------------------------------------------------------------------------|
| public          | the HTML root file for React                                             |
| src             | source code                                                              |
| craco.config.js | the Craco config file, can change the theme color (blue by default) here |
| crowdin.yml     | Crowdin i18n config file                                                 |
| package.json    | NPM/Yarn dependency file                                                 |
| yarn.lock       | Yarn lock file                                                           |

Inside `/src`, there are several important files or folders as follows:

| File/Directory          | Description                                                                                                  |
|-------------------------|--------------------------------------------------------------------------------------------------------------|
| account                 | the "My profile" page for logged-in user                                                                     |
| auth                    | all code related to authentication, like OAuth, SAML, sign up page, sign in page, forget password page, etc. |
| backend                 | the SDK for calling Go backend API, contains all the `fetch()` calls                                         |
| basic                   | the homepage (dashboard page) for Casdoor, it contains several card widgets                                  |
| common                  | shared UI widgets                                                                                            |
| locales                 | i18n translation files in JSON, synced with our Crowdin project: https://crowdin.com/project/casdoor-site    |
| App.js                  | the entrance JS file, containing all routes                                                                  |
| Setting.js              | the utility functions used by other code                                                                     |
| OrganizationListPage.js | the page for the organization list, similar for all other XXXListPage.js                                     |
| OrganizationEditPage.js | the page for editing one organization, similar for all other XXXEditPage.js                                  |
