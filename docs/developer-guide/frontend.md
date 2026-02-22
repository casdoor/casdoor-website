---
title: Frontend
description: Casdoor web UI source layout and how to run or customize it.
keywords: [frontend, React, CRA, development]
authors: [hsluoyz]
---

The Casdoor web UI lives in the **`/web`** directory: `https://github.com/casdoor/casdoor/tree/master/web`. It is a [Create React App (CRA)](https://create-react-app.dev/) project with this layout:

| File/Directory   | Description |
|------------------|-------------|
| `public`         | Root HTML and static assets |
| `src`            | Application source code |
| `craco.config.js` | Craco config (e.g. theme; default primary is blue) |
| `crowdin.yml`    | Crowdin i18n config |
| `package.json`   | NPM/Yarn dependencies |
| `yarn.lock`      | Lock file |

Under **`/src`**:

| File/Directory          | Description |
|-------------------------|-------------|
| `account`               | “My profile” page for signed-in users |
| `auth`                  | Auth flows: OAuth, SAML, sign-up, sign-in, forgot password |
| `backend`               | Client for the Go API (all `fetch` calls) |
| `basic`                 | Dashboard (home) and card widgets |
| `common`                | Shared UI components |
| `locales`               | i18n JSON (synced with [Crowdin](https://crowdin.com/project/casdoor-site)) |
| `App.js`                | Root and routing |
| `Setting.js`            | Shared helpers |
| `*ListPage.js` / `*EditPage.js` | List and edit pages per resource (e.g. `OrganizationListPage.js`, `OrganizationEditPage.js`) |
