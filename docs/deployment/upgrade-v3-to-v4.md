---
title: Upgrade from v3 to v4
description: What changed between Casdoor v3 and v4, which v4 release to use, how to upgrade, and what to check afterward.
keywords: [upgrade, migration, v3, v4, deployment]
authors: [hsluoyz]
---

This guide explains how to upgrade a Casdoor v3 deployment to v4 and what to check after the upgrade.

---

#### Learning outcomes

- Understand what changed between v3 and v4.
- Choose a v4 release.
- Upgrade a Docker, Helm, or source deployment.
- Check the parts of your setup that the new frontend affects.
- Go back to v3 if you have to.

#### What you need

- A Casdoor v3 deployment
- A way to back up and restore its database

---

## About v4

Casdoor v4.0.0 was released on September 1, 2026. It replaces the admin console and the sign-in pages with a new frontend. The backend, the REST API, the database, and `conf/app.conf` are compatible with v3. Most deployments upgrade by switching the image tag or by rebuilding from source.

v3.164.0 is the last v3 release. Bug fixes and security fixes are published in v4 only.

| Area | v3 | v4 |
|------|----|----|
| Frontend UI | Ant Design | shadcn/ui and Tailwind CSS |
| Frontend build | create-react-app (craco), JavaScript | Vite, TypeScript |
| Build output | `web/build/static/js`, `web/build/static/css` | `web/build/assets` |
| Frontend source | `web/` | `web/` (the v3 frontend is kept in `web-old/` for reference and is not built) |
| Backend, API, SDKs | | No change needed |
| Database | | New tables and columns are created automatically on startup |
| `conf/app.conf` | | `aiAssistantUrl` was removed and is ignored if still present |

## Choose a v4 release {#which-v4-release-to-use}

Upgrade to the [latest v4 release](https://github.com/casdoor/casdoor/releases/latest). If you pin a version, use v4.6.0 or later. The first v4 releases had regressions, which are fixed in the following versions:

| Problem | Affected | Fixed in |
|---------|----------|----------|
| No Docker image was published | v4.1.0 | v4.2.0 |
| Sign-in and sign-up page customization (custom HTML, sign-in items, custom CSS) was ignored | v4.0.0 – v4.1.0 | v4.2.0 |
| Sign-in through an OIDC provider failed with `Unknown column 'oidc'` | v4.0.0 – v4.1.0 | v4.2.0 |
| Startup failed with MySQL `Error 1118` on MySQL 8.0.46, 8.4.9 – 8.4.10 and 9.7.0 – 9.7.2 | v4.4.0 | v4.5.0 |
| The UI was always in English instead of following the browser language | up to v4.5.0 | v4.6.0 |

v4.5.0 also fixes CVE-2026-5469, CVE-2026-9091, CVE-2026-9093, CVE-2026-9096, CVE-2026-9097, and CVE-2026-9098.

## Prepare the upgrade {#before-you-upgrade}

1. Check the version that you run. See [Version information](/docs/deployment/version-info).

   ```bash
   curl http://localhost:8000/api/get-version-info
   ```

1. Back up the database. Casdoor adds tables and columns when v4 starts. The backup is your way back to v3.
1. If you customized a sign-in page with CSS or HTML, take a screenshot of it, so that you can compare the page after the upgrade.

## Upgrade Casdoor {#upgrade}

Keep the same `app.conf` and the same database.

### Upgrade a Docker deployment

1. Pull the new image:

   ```bash
   docker pull casbin/casdoor:latest
   ```

1. Restart the container with the new image.

With Docker Compose, update `image:` and run `docker compose up -d`. With Helm, set the new image tag and run `helm upgrade`.

### Upgrade a source deployment

Pull the code, rebuild the frontend, and restart the server. The commands are the same as in v3. Node.js 20 and Yarn 1.x are still the required versions.

```bash
git pull
cd web && yarn install && yarn build && cd ..
go build && ./casdoor
```

In development, `yarn start` still serves the frontend on port 7001.

## Check the result {#what-to-check-after-the-upgrade}

### Static file paths

The hashed `.js` and `.css` files moved from `web/build/static/js` and `web/build/static/css` to `web/build/assets`. Update everything that refers to the old paths:

- **Reverse proxy rules**: Rules that cache or rewrite `/static/js/` or `/static/css/` must use `/assets/` instead.
- **CDN**: If a CDN hosts the frontend files, run the upload script again after you build v4. See [Host the frontend files on a CDN](/docs/deployment/deploy-cdn).

### Sign-in page customization

Casdoor v4 applies the custom HTML, the sign-in items, and the theme settings of an application as before.

Review your custom CSS. The pages are no longer built from Ant Design components, so selectors that target Ant Design class names, such as `.ant-btn` or `.ant-input`, no longer match anything. Open the sign-in, sign-up, and forgot-password pages of each customized application and adjust the CSS on the **UI Customization** tab of the application.

### Modified frontend code

If you maintain a fork with changes under `web/`, those changes don't carry over. The v3 code is in `web-old/`, so that you can read your old changes next to the new code, but Casdoor builds and serves only `web/`. Port your changes to the TypeScript sources in `web/src`.

### Applications that use Casdoor

Nothing changes for your applications. OAuth 2.0, OpenID Connect (OIDC), SAML, CAS, LDAP, and the REST API behave as in v3, and the SDKs don't need an update.

## Roll back to v3 {#rolling-back}

1. Stop Casdoor.
1. Restore the database backup.
1. Start the v3 image or binary that you ran before.

## Get help

If something worked in v3 and doesn't work in v4, [open an issue](https://github.com/casdoor/casdoor/issues) with both version numbers and your database type.

## See also

- [Version information](/docs/deployment/version-info)
- [Database migration](/docs/deployment/db-migration)
- [UI customization](/docs/application/ui-customization)
