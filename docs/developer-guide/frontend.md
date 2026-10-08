---
title: Frontend source code
sidebar_label: Frontend
description: The layout of the Casdoor frontend source code in the web directory, and how to run and build it.
keywords: [frontend, React, Vite, TypeScript, development]
authors: [hsluoyz]
---

The Casdoor frontend, which contains the admin console and the sign-in pages, is in the [`web`](https://github.com/casdoor/casdoor/tree/master/web) directory of the Casdoor repository. It is a React application that is written in TypeScript, built with [Vite](https://vite.dev/), and styled with Tailwind CSS and shadcn/ui. This page describes the layout of the source code.

## Run and build the frontend

Run the following commands in the `web` directory.

| Command | Description |
|---|---|
| `yarn install` | Installs the dependencies. Use Yarn 1.x |
| `yarn start` | Starts the development server on port 7001. It expects the backend on port 8000 |
| `yarn build` | Builds the static files into `web/build`, which the backend serves |

For the complete setup, see [Run in development mode](/docs/basic/server-installation#development-mode).

## Files in the web directory

| File or directory | Description |
|---|---|
| `public` | Static files that are copied to the build as they are |
| `src` | Source code of the application |
| `index.html` | HTML entry point |
| `vite.config.ts` | Vite configuration |
| `tailwind.config.js`, `postcss.config.js` | Tailwind CSS configuration |
| `components.json` | shadcn/ui configuration |
| `tsconfig.json` | TypeScript configuration |
| `crowdin.yml` | Crowdin configuration for translations |
| `cypress`, `cypress.config.js` | End-to-end tests |
| `package.json`, `yarn.lock` | Dependencies |

## Files in the src directory

| File or directory | Description |
|---|---|
| `main.tsx` | Entry point that mounts the application |
| `App.tsx` | Routes of the admin console and the sign-in pages |
| `Conf.ts` | Compile-time settings, such as the default theme and the custom footer. See [Compile-time frontend settings](/docs/basic/configuration#compile-time-frontend-settings) |
| `pages` | One file per page. `*ListPage.tsx` is the list of an object type, and `*EditPage.tsx` is its edit page. `pages/auth` contains the sign-in, sign-up, and related pages |
| `components` | Shared components, grouped by area, for example `application`, `provider`, and `user`. `components/ui` contains the shadcn/ui components |
| `backend` | One file per object type with the calls to the Casdoor API, for example `ApplicationBackend.ts` |
| `auth` | Helpers of the sign-in flow, such as provider URLs, the password obfuscator, and WebAuthn |
| `hooks` | React hooks, for example for the signed-in account, the language, and the theme |
| `lib` | Helper functions. `lib/setting.tsx` contains the general helpers |
| `locales` | Translations, one `data.json` per language |
| `i18n.ts` | Setup of the translation library |
| `index.css` | Global styles |

## See also

- [Install the Casdoor server](/docs/basic/server-installation)
- [Internationalization](/docs/internationalization)
- [Generate Swagger files](/docs/developer-guide/swagger)
