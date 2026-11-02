---
title: Manage Casdoor from the command line
sidebar_label: Casdoor CLI
description: Install the Casdoor CLI on macOS, Linux or Windows, log in to Casdoor, and manage users, groups and every other Casdoor object from the terminal.
keywords: [CLI, command-line, terminal, bash, shell, powershell, windows, wsl, user management, groups, permissions, OAuth2]
authors: [hsluoyz]
---

This guide explains how to install [Casdoor CLI](https://github.com/casdoor/casdoor-cli), the official command-line interface of Casdoor, and how to manage users and groups with it.

---

#### Learning outcomes

- Install the CLI on macOS, Linux or Windows.
- Connect the CLI to your Casdoor instance and log in.
- Manage users, groups and the other Casdoor objects from the terminal.
- Set up a local environment to develop the CLI.

#### What you need

- macOS, Linux or Windows. WSL works as Linux.
- Go 1.24.0 or later when you build it from source. The release binaries need no Go.
- A running Casdoor instance and an [application](/docs/application/overview) for the CLI.

---

## About the CLI

| Feature | Description |
|---|---|
| Browser sign-in | The CLI signs you in with the OAuth 2.0 flow (authorization code with PKCE) in your browser. It never sees your password |
| Password and application logins | For a server without a browser, or for scripts and CI |
| Profiles | Every server and login is saved as a profile, `casdoor login` remembers it |
| Credential storage | A file only your user can read; on Windows the secrets are encrypted with DPAPI |
| Every Casdoor object | Users, groups, roles, permissions, applications, providers and the other objects |
| Output | Table, JSON, YAML or `owner/name`, for people and scripts |

### Credential storage

Each login is saved in a profile in `casdoor/config.json` in the user's config directory:

| OS | Path |
|---|---|
| Linux | `~/.config/casdoor/config.json` |
| macOS | `~/Library/Application Support/casdoor/config.json` |
| Windows | `%AppData%\casdoor\config.json` |

`casdoor profile path` prints the exact path. `$CASDOOR_CONFIG` uses another file.

On Linux and macOS the file is created with mode `0600`. On Windows the client secret, access token and refresh token are encrypted with DPAPI, so another user or another computer cannot read them; a config encrypted on Windows cannot be used on another OS, log in again. In WSL, run the Linux binary and keep the config in the Linux home: a file under `/mnt/c` does not get the `0600` mode.

## Install the CLI

Download the archive for your OS and architecture from the [latest release](https://github.com/casdoor/casdoor-cli/releases/latest): `.tar.gz` on macOS and Linux, `.zip` on Windows. Then put `casdoor` (or `casdoor.exe`) in your `PATH`.

Or install it with Go:

```bash
go install github.com/casdoor/casdoor-cli/cmd/casdoor@latest
```

Check that it runs:

```bash
casdoor --help
```

## Log in

Create an application for the CLI in Casdoor, or use an existing one. The browser login needs `http://localhost:9000/callback` in the application's **Redirect URLs**; `--port` picks another port.

**Browser** (the default):

```bash
casdoor login --endpoint https://door.casdoor.com --client-id <client-id> --organization <organization>
```

**Password**, for a server without a browser. Enable the `Password` grant type of the application:

```bash
casdoor login --endpoint https://door.casdoor.com --client-id <client-id> --client-secret <client-secret> --organization <organization> --username alice
```

**Application**, where no user logs in and the CLI acts as the application:

```bash
casdoor login --endpoint https://door.casdoor.com --client-id <client-id> --client-secret <client-secret> --organization <organization> --client-credentials
```

What the CLI may do is Casdoor's decision: an admin of an organization manages that organization, a global admin (of the `built-in` organization) manages everything, a normal user mostly sees themselves. `casdoor whoami` shows the current login, `casdoor logout` forgets it.

### Profiles

Each login is saved as a profile, `default` unless `--profile` is given. The last login becomes the current profile.

```bash
casdoor login --profile prod --endpoint https://door.example.com --client-id <id> --organization acme
casdoor profile list
casdoor profile use prod
casdoor --profile staging users list
casdoor profile delete staging
```

The environment variables override the profile, so CI needs no config file:

| Variable | Meaning |
| --- | --- |
| `CASDOOR_ENDPOINT` | the URL of the Casdoor server |
| `CASDOOR_CLIENT_ID`, `CASDOOR_CLIENT_SECRET` | the application's credentials |
| `CASDOOR_ORGANIZATION` | the organization, the default owner of the objects |
| `CASDOOR_APPLICATION` | the application name |
| `CASDOOR_ACCESS_TOKEN` | a user's access token, used instead of the client secret |
| `CASDOOR_PROFILE` | the profile to use |
| `CASDOOR_CONFIG` | the config file |

## Manage objects

Every object has the same commands:

```bash
casdoor <objects> list [--owner ORG] [--search field=value] [--sort field --desc] [--page N] [--page-size N] [--columns a,b]
casdoor <objects> get NAME
casdoor <objects> create [NAME] [--file FILE] [--set key=value ...]
casdoor <objects> update NAME [--file FILE] [--set key=value ...]
casdoor <objects> delete NAME [--yes]
```

For example:

```bash
casdoor users list --columns name,displayName,email
casdoor groups list
casdoor users update alice --set displayName="Alice Smith" --set properties.team=dev
casdoor roles create admins --set users:='["acme/alice","acme/bob"]'
```

The objects are `users`, `groups`, `roles`, `permissions`, `models`, `adapters`, `enforcers`, `organizations`, `applications`, `providers`, `certs`, `tokens`, `sessions`, `ldaps`, `syncers`, `webhooks`, `invitations`, `resources`, `products`, `orders`, `payments`, `transactions`, `plans`, `pricings`, `subscriptions`, `coupons`, `keys`, `forms`, `tickets`, `agents`, `servers`, `entries`, `sites`, `rules` and `records`. `casdoor --help` lists them.

`--set key=value` sets a string, `--set key:=json` any JSON value, and nested fields use dots. `--file` reads the fields from a JSON or YAML file, `-` from stdin. `-o table` is the default; `-o json`, `-o yaml` and `-o name` are for scripts.

`casdoor enforce`, `casdoor api` and `casdoor completion` cover the rest:

```bash
casdoor enforce --permission acme/permission-1 acme/alice data1 read
casdoor api get-global-users pageSize=10 p=1
casdoor completion powershell
```

## Set up a development environment

```bash
git clone https://github.com/casdoor/casdoor-cli
cd casdoor-cli
go build ./cmd/casdoor
go test ./...
```

Run `./casdoor login --endpoint ...` against a Casdoor instance you can use. The [demo](https://door.casdoor.com) is read-only for most objects.

## See also

- [Call the Casdoor API](/docs/basic/public-api)
- [Manage Casdoor with Terraform](/docs/deployment/terraform)
