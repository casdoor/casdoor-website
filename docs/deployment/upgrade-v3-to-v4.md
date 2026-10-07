---
title: Upgrading from v3 to v4
description: What changed between Casdoor v3 and v4, which v4 release to pick, and what to check after the upgrade.
keywords: [upgrade, migration, v3, v4, deployment]
authors: [hsluoyz]
---

Casdoor v4.0.0 was released on September 1, 2026. It replaces the web console and the sign-in pages with a new frontend. The backend, the REST API, the database and `conf/app.conf` are compatible with v3, so most deployments upgrade by switching the image tag or rebuilding from source.

v3.164.0 is the last v3 release. Bug fixes and security fixes are only published in v4.

## What changed

| Area | v3 | v4 |
|------|----|----|
| Frontend UI | Ant Design | shadcn/ui and Tailwind CSS |
| Frontend build | create-react-app (craco), JavaScript | Vite, TypeScript |
| Build output | `web/build/static/js`, `web/build/static/css` | `web/build/assets` |
| Frontend source | `web/` | `web/` (the v3 frontend is kept in `web-old/` for reference and is not built) |
| Backend, API, SDKs | | No change needed |
| Database | | New tables and columns are created automatically on startup |
| `conf/app.conf` | | `aiAssistantUrl` was removed and is ignored if still present |

## Which v4 release to use

Upgrade to the [latest v4 release](https://github.com/casdoor/casdoor/releases/latest). If you need to pin a version, use **v4.6.0 or later**. The first v4 releases had regressions that are fixed in the versions below:

| Problem | Affected | Fixed in |
|---------|----------|----------|
| No Docker image was published | v4.1.0 | v4.2.0 |
| Sign-in and sign-up page customization (custom HTML, sign-in items, custom CSS) was ignored | v4.0.0 – v4.1.0 | v4.2.0 |
| Sign-in through an OIDC provider failed with `Unknown column 'oidc'` | v4.0.0 – v4.1.0 | v4.2.0 |
| Startup failed with MySQL `Error 1118` on MySQL 8.0.46, 8.4.9 – 8.4.10 and 9.7.0 – 9.7.2 | v4.4.0 | v4.5.0 |
| The UI was always in English instead of following the browser language | up to v4.5.0 | v4.6.0 |

v4.5.0 also fixes CVE-2026-5469, CVE-2026-9091, CVE-2026-9093, CVE-2026-9096, CVE-2026-9097 and CVE-2026-9098.

## Before you upgrade

1. Check the version you are running: `curl http://localhost:8000/api/get-version-info`. See [Version information](/docs/deployment/version-info).
2. Back up the database. Casdoor adds tables and columns when v4 starts, and the backup is how you go back to v3.
3. If you customized the sign-in page with CSS or HTML, save a screenshot of it so you can compare after the upgrade.

## Upgrade

### Docker

Change the image tag and restart the container. Keep the same `app.conf` and the same database.

```bash
docker pull casbin/casdoor:latest
```

With Docker Compose, update `image:` and run `docker compose up -d`. With Helm, set the new image tag and run `helm upgrade`.

### From source

Pull the code, rebuild the frontend and restart the server. The commands are the same as in v3, and Node.js 20 and Yarn 1.x are still the required versions.

```bash
git pull
cd web && yarn install && yarn build && cd ..
go build && ./casdoor
```

During development, `yarn start` still serves the frontend on port 7001.

## What to check after the upgrade

### Static file paths

The hashed `.js` and `.css` files moved from `web/build/static/js` and `web/build/static/css` to `web/build/assets`. Update anything that refers to the old paths:

- Reverse proxy rules that cache or rewrite `/static/js/` or `/static/css/`. Use `/assets/` instead.
- A CDN that hosts the frontend files. Run the upload script again after building v4. See [Hosting static files in a CDN](/docs/deployment/deploy-cdn).

### Sign-in page customization

Custom HTML, sign-in items and theme settings of an application are applied in v4 as before. Custom CSS needs a review, because the pages are no longer built from Ant Design components: selectors that target Ant Design class names such as `.ant-btn` or `.ant-input` no longer match anything. Open the sign-in, sign-up and forgot-password pages of each customized application and adjust the CSS in **Applications → UI customization**.

### Modified frontend code

If you maintain a fork with changes under `web/`, those changes do not carry over. The v3 code is in `web-old/` so you can read your old changes next to the new code, but only `web/` is built and served. Port your changes to the TypeScript sources in `web/src`.

### Applications that use Casdoor

Nothing changes for applications. OAuth, OIDC, SAML, CAS, LDAP and the REST API behave as in v3, and the SDKs do not need an update.

## Rolling back

Stop Casdoor, restore the database backup, and start the v3 image or binary you were running before.

## Getting help

If something worked in v3 and does not in v4, [open an issue](https://github.com/casdoor/casdoor/issues) with both version numbers and your database type.
