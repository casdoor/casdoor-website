---
title: Upgrade Casdoor
description: Check for a new Casdoor release in the admin console, upgrade a release binary in one click, and upgrade Docker, Helm, and source deployments.
keywords: [upgrade, update, release, one-click upgrade, version check]
authors: [hsluoyz]
---

The **System Info** page of the admin console (**Admin** > **System Info**, at `/sysinfo`) shows the version that you run and the latest release on GitHub. When a newer release exists, the page says so and tells you how to upgrade your deployment. Only global administrators (administrators of the `built-in` organization) can see this page.

This feature is available in the releases after v4.22.0.

## Check for new versions

To find the latest release, Casdoor calls the GitHub API (`https://api.github.com/repos/casdoor/casdoor/releases/latest`). Pre-releases and drafts are not counted. The result is cached for an hour, a failed check for 10 minutes. If GitHub can't be reached, for example on an intranet, the page shows the error and everything else on it keeps working.

Casdoor checks only when a global administrator opens the System Info page, not in the background. The request goes through `socks5Proxy` when that option is set, otherwise it uses the `HTTPS_PROXY` environment variable if set.

To turn the check off, for example for an offline deployment, set this in `conf/app.conf`:

```ini
disableVersionCheck = true
```

## Upgrade a release binary in one click

If you run a binary [downloaded from GitHub Releases](/docs/basic/server-installation#download-a-pre-built-binary), the System Info page shows an **Upgrade to vX.Y.Z** button when a newer release exists. After you confirm, Casdoor:

1. Downloads `casdoor_<version>_checksums.txt` and the archive for its platform, such as `casdoor_Linux_x86_64.tar.gz` or `casdoor_Windows_x86_64.zip`, from the GitHub release.
1. Checks the archive's SHA-256 against the checksums file. If they don't match, or if the checksums file is missing, Casdoor stops and doesn't change anything.
1. Takes only the `casdoor` binary and `web/build` from the archive. Your `conf/app.conf`, database, logs, and uploaded files are not touched.
1. Copies the current binary and moves the current `web/build` to `backup/<old-version>_<time>/` next to the binary.
1. Puts the new binary and `web/build` in place.
1. Restarts itself:
   - On Linux and macOS, the new binary replaces the running process with the same process ID and arguments, so systemd and other supervisors don't see a restart.
   - On Windows, a running `.exe` can't be overwritten, so Casdoor renames it to `casdoor.exe.old` first. It then starts the new binary in a new console window and exits. The new process stops anything that still listens on the HTTP port. `casdoor.exe.old` is removed on the next upgrade.

The page shows the download progress, then reconnects and reloads when Casdoor is back with the new version. If something fails, the page shows the error and Casdoor keeps running the old version.

The one-click upgrade needs:

- The binary from a GitHub release. Casdoor detects this from a flag that the release build sets. Binaries that you build yourself, Docker images, and source checkouts don't get the button.
- Write access for the Casdoor process to the binary's folder and to `web/build`.
- `web/build` in the working directory or next to the binary, as in the release archive. If you serve the frontend from somewhere else, only the binary is replaced.
- Access to `github.com`.

Read the [release notes](https://github.com/casdoor/casdoor/releases) before you upgrade, and back up the database. New tables and columns are created on startup, so going back to an older version after an upgrade may need the database backup.

### Roll back

To go back to the previous version, stop Casdoor, copy the binary and `web/build` from `backup/<old-version>_<time>/` back next to the current ones, and start Casdoor again.

### Turn off the upgrade button

To remove the button, for example when Casdoor is upgraded by a deployment pipeline or by configuration management, set this in `conf/app.conf`:

```ini
disableUpgrade = true
```

The page still shows the latest version. The button is also hidden in [demo mode](/docs/basic/configuration) (`isDemoMode = true`). Like other options, both can be set with an environment variable of the same name.

## Upgrade a Docker deployment

The System Info page shows the command to pull the new image. Pull it and recreate the container:

```bash
docker pull casbin/casdoor:4.23.0
docker compose up -d
```

Each release is published as `X.Y.Z`, `vX.Y.Z`, `X.Y`, `X`, and `latest`. Pin `X.Y.Z` or `X.Y` if you don't want to pick up new releases on every pull. See [Deploy Casdoor with Docker](/docs/deployment/docker).

For Helm, set the new chart version or `image.tag` and run `helm upgrade`. See [Run Casdoor on Kubernetes with Helm](/docs/basic/try-with-helm).

## Upgrade a source deployment

If Casdoor runs from a Git clone, the System Info page tells you to pull the new code. Rebuild the frontend and the backend, then restart Casdoor:

```bash
git pull
cd web && yarn install && yarn build && cd ..
go build
```

To upgrade to a release instead of the latest commit, check out its tag, for example `git checkout v4.23.0`.

## Security

- The upgrade API (`POST /api/upgrade-system`) is limited to global administrators, like the System Info page. It accepts only a JSON body that names the latest release, and a request from another origin is treated as anonymous and rejected. Each call is recorded in [Records](/docs/organization/records) with the user and the requested version.
- Casdoor builds the download URLs itself from the release tag, under `https://github.com/casdoor/casdoor/releases/download/`, and installs an archive only when its SHA-256 matches the release's checksums file. The checksums file comes from the same GitHub release over HTTPS. It protects against a damaged or swapped download, not against a compromised GitHub release.
- Archive entries outside the binary and `web/build` are ignored, so a release archive can't write anywhere else.
- If you don't want the admin console to be able to replace the binary, set `disableUpgrade = true`. The option is read from `conf/app.conf` or the environment, so it can't be turned back on from the admin console.

## See also

- [Version information](/docs/deployment/version-info)
- [Upgrade from v3 to v4](/docs/deployment/upgrade-v3-to-v4)
- [Configuration options](/docs/basic/configuration)
