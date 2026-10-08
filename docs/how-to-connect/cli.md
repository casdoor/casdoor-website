---
title: Manage Casdoor from the command line
sidebar_label: Casdoor CLI
description: Install the Casdoor CLI, connect it to your Casdoor instance, and manage users and groups from the terminal.
keywords: [CLI, command-line, terminal, bash, shell, user management, groups, permissions, OAuth2]
authors: [hsluoyz]
---

This guide explains how to install [Casdoor CLI](https://github.com/casdoor/casdoor-cli), the official command-line interface of Casdoor, and how to manage users and groups with it.

---

#### Learning outcomes

- Build and install the CLI on macOS or Linux.
- Connect the CLI to your Casdoor instance and sign in.
- Manage users and groups from the terminal.
- Set up a local environment to develop the CLI.

#### What you need

- macOS or Linux. The CLI is tested on Debian 12 and macOS Sonoma.
- Go 1.22.0 or later
- A system keyring: GNOME Keyring on Linux, Keychain on macOS
- A running Casdoor instance and an [application](/docs/application/overview) for the CLI

---

:::caution
The CLI doesn't run on Windows, including the Windows Subsystem for Linux (WSL). It stores credentials through the Secret Service DBus interface of GNOME Keyring, which WSL doesn't provide.
:::

## About the CLI

| Feature | Description |
|---|---|
| Sign-in in the browser | The CLI signs you in with the OAuth 2.0 flow of Casdoor in your browser. It never sees your password |
| Token storage | The CLI stores tokens in the system keyring. Tokens are never written to disk as plaintext |
| User management | Create, update, and delete users |
| Group management | Create, change, and delete groups |
| Permissions | The CLI controls what a user may do through Casdoor groups, with three built-in roles |

The built-in roles are:

| Role | Rights |
|---|---|
| `lector` | Read-only access |
| `editor` | Can create users, with limited rights to change them |
| `administrator` | Can create, change, and delete users |

## Install the CLI

1. Clone [casdoor-cli](https://github.com/casdoor/casdoor-cli).
1. Build and install the CLI.

   On macOS:

   ```bash
   make build TARGET_OS=darwin && make install TARGET_OS=darwin
   ```

   On Linux:

   ```bash
   make build TARGET_OS=linux && make install TARGET_OS=linux
   ```

1. Add the install directory to your `PATH`.

   In Bash:

   ```bash
   echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   ```

   In Zsh:

   ```bash
   echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

1. Check that the CLI runs:

   ```bash
   casdoor --help
   ```

## Connect the CLI to Casdoor

1. Create an application for the CLI in Casdoor in one of two ways:

   - Load the `init_data.json` of the casdoor-cli repository. See [Initialize and manage data with a file](/docs/deployment/data-initialization).
   - Create and configure the application by hand in the Casdoor admin console.

1. Run the CLI. On its first run, it asks for a `config.yaml` with the connection details. Use `config.yaml.example` of the repository as a template. The required fields are:

   ```yaml
   application_name: your-app-name
   casdoor_endpoint: https://your-casdoor-instance.com
   certificate: |
     -----BEGIN CERTIFICATE-----
     Your certificate content here
     -----END CERTIFICATE-----
   client_id: your-client-id
   client_secret: your-client-secret
   organization_name: your-organization
   redirect_uri: http://localhost:9000/callback
   ```

The CLI stores the configuration, Base64-encoded, in `~/.casdoor-cli/config.yaml` and reads it from there afterward.

## Sign in and out

To sign in, run:

```bash
casdoor login
```

The CLI opens your default browser, where you sign in to Casdoor.

To sign out, run:

```bash
casdoor logout
```

## Manage users and groups

The CLI has the following commands:

```bash
Usage:
  casdoor [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  groups      Manage Casdoor permissions
  help        Help about any command
  login       Login to your Casdoor account
  logout      Logout from your Casdoor account
  users       Manage Casdoor users

Flags:
  -d, --debug   verbose logging
  -h, --help    help for casdoor
```

Manage users:

```bash
# List users
casdoor users list

# Create a user
casdoor users create

# Update a user
casdoor users update

# Delete a user
casdoor users delete
```

Manage groups:

```bash
# List groups
casdoor groups list

# Create a group
casdoor groups create

# Update a group
casdoor groups update

# Delete a group
casdoor groups delete
```

## Set up a development environment

To work on the CLI itself:

1. In the casdoor-cli repository, start the local Casdoor environment:

   ```bash
   docker compose up -d
   ```

   Wait for the Casdoor container to initialize. It restarts several times while it sets up the database.

1. Create `config.yaml` at the root of the repository from `config.yaml.example`, with the settings of the local environment.
1. Run the CLI from source and sign in with the development credentials that the repository documents:

   ```bash
   go run main.go login
   ```

   Or build and install it first:

   ```bash
   make build TARGET_OS=darwin && make install TARGET_OS=darwin  # For macOS
   # OR
   make build TARGET_OS=linux && make install TARGET_OS=linux    # For Linux

   casdoor login
   ```

## See also

- [Call the Casdoor API](/docs/basic/public-api)
- [Manage Casdoor with Terraform](/docs/deployment/terraform)
