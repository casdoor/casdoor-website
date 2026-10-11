---
title: Marketplace
description: Install app integrations, identity provider templates and sign-in themes from the Casdoor Marketplace in one click, and uninstall them cleanly.
keywords: [Casdoor, marketplace, integrations, SSO, Grafana, GitLab, Keycloak, identity provider, theme, login page]
authors: [hsluoyz]
---

The Marketplace is a catalog of ready-made integrations that you install from the Casdoor console. Instead of creating an application or provider by hand and copying settings from a guide, you pick an integration, fill in a few values, and Casdoor creates the objects for you. Uninstalling removes them again, or restores what was there before.

Browse the catalog on the web at [marketplace.casdoor.com](https://marketplace.casdoor.com). The integrations themselves are open source in [casdoor/casdoor-integrations](https://github.com/casdoor/casdoor-integrations).

:::info

The Marketplace is in Casdoor master since October 2026 and in every release after v4.19.0. Casdoor Cloud instances already have it.

:::

## What you can install

| Type | What installing it does | Examples |
|---|---|---|
| **App integration** | Creates an [application](/docs/application/overview) with the redirect URLs, grant types and token format the app needs. The guide then shows the app's own settings with your Casdoor address, client ID and client secret filled in. | Grafana, GitLab, Nextcloud, Vaultwarden, Argo CD, Immich, Open WebUI, Portainer, Gitea, Proxmox VE |
| **Identity provider** | Creates a [provider](/docs/provider/overview) from a template, so your users can sign in to Casdoor with an identity system they already have. Optionally adds it to the sign-in page of an application. | Keycloak, authentik, ZITADEL, Authelia, GitLab Self-Managed |
| **Sign-in theme** | Replaces the look of the sign-in pages of one application: `themeData`, `formOffset`, `formCss`, `formCssMobile`, `formSideHtml` and `footerHtml`. | Midnight, Split |

## Install an integration

1. In the console, open **Identity → Marketplace**. Filter by type or search by name.
2. Click **Install** on an integration.
3. Fill in the form:
   - **Organization**: where the integration is installed.
   - **Name**: also the name of the application or provider it creates, so it must not be taken. Letters, digits, `-` and `_`.
   - The integration's own variables, for example the URL of your Grafana or the realm of your Keycloak. URLs must start with `http://` or `https://`; colors are `#rrggbb`.
   - For an identity provider: the **client ID** and **client secret** of the client you registered on the other side, with `<your Casdoor address>/callback` as its redirect URI, and optionally an application to add the provider to.
   - For a theme: the application whose sign-in pages get the theme. The dialog shows a live preview of that application's sign-in page with the theme applied. Empty fields are previewed with their examples, and nothing changes until you install.
4. Click **Install**.

Installed integrations are listed under **Identity → Integrations**. The page of an installed integration shows what it created and the remaining setup steps on the other side, with your Casdoor address, client ID, client secret and variables already filled in, ready to copy.

## Uninstall

Delete the integration under **Identity → Integrations**:

- **App integration**: deletes the application it created. People can no longer sign in to the app with Casdoor.
- **Identity provider**: removes the provider from the application it was added to, then deletes it.
- **Sign-in theme**: restores the look the application had before the theme was installed.

## Who can install what

- Organization admins can install integrations into their own organization, add providers and themes only to their own organization's applications, and uninstall only their own organization's integrations. Their quotas apply as when they add an application or provider by hand.
- A theme that sets the side panel or footer HTML (`formSideHtml`, `footerHtml`) can only be installed by a global admin, because only global admins can change those fields. Such themes are marked on their Marketplace page.
- An application can have one installed theme at a time.

## Where the catalog comes from

Casdoor downloads the catalog index and the integration bundles from the URL in the `marketplaceUrl` setting of `conf/app.conf`. The default is `https://cdn.jsdelivr.net/gh/casdoor/casdoor-integrations@dist`, the published build of casdoor-integrations.

```ini
marketplaceUrl = "https://cdn.jsdelivr.net/gh/casdoor/casdoor-integrations@dist"
```

- In mainland China, where jsDelivr is slow, use `https://marketplace.casdoor.cn/data`.
- On a network without Internet access, serve a copy of the `dist` branch of casdoor-integrations from your own web server and point `marketplaceUrl` to it.

Like other settings, `marketplaceUrl` can also be set as an environment variable. Casdoor keeps the index in memory for 10 minutes; **Refresh** on the Marketplace page fetches it again.

Before installing, Casdoor checks each downloaded bundle against the SHA-256 hash in the index, checks that its manifest matches the integration and version it asked for, and refuses integrations or versions that the index lists as revoked.

## Contribute an integration

Integrations are JSON files in [casdoor/casdoor-integrations](https://github.com/casdoor/casdoor-integrations): a manifest plus the application, provider or theme to create and a setup guide. Its README describes the format for each type. Open a pull request there to add one, or [open an issue](https://github.com/casdoor/casdoor-integrations/issues/new) to request one. Once merged, it is published to the `dist` branch, from which Casdoor's Marketplace page picks it up when the CDN cache refreshes (jsDelivr caches a branch for up to 12 hours), and marketplace.casdoor.com shows it at its next build.
