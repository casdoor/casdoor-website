---
title: Casdoor CLI
description: Using Casdoor's official command-line interface for managing users, groups, and permissions
keywords: [CLI, command-line, terminal, bash, shell, user management, groups, permissions, OAuth2]
authors: [hsluoyz]
---

**Casdoor CLI** is the official command-line interface for [Casdoor](https://casdoor.org), providing a powerful and intuitive way to manage your Casdoor identity and access management system directly from the terminal.

GitHub repository: <https://github.com/casdoor/casdoor-cli>

## Features

### OAuth2 Browser-Based Authentication

The CLI uses a secure browser-based OAuth2 flow for authentication, ensuring your credentials are protected through Casdoor's standard authentication mechanism.

### Secure Token Storage

Credentials are safely stored using your system's keyring interface (GNOME Keyring on Linux, Keychain on macOS), ensuring tokens never touch disk in plaintext.

### User Management

Create, update, and delete users with ease directly from the command line.

### Permission Management

Control user permissions through Casdoor's group feature with built-in roles:

- `lector`: Read-only access
- `editor`: Can create users, with limited modification rights
- `administrator`: Full control over user creation, modification, and deletion

### Group Management

Create, modify, and delete user groups to organize users and manage permissions efficiently.

## Installation

### Prerequisites

- Go 1.22.0 or higher
- macOS or Linux operating system
- GNOME Keyring (Linux) or Keychain (macOS) for secure credential storage

:::caution

**Platform Support**: Currently supports macOS and Linux (tested on Debian 12 and macOS Sonoma). Windows support via WSL is not available as the CLI requires GNOME's Secret Service DBus interface (GNOME Keyring) for secure credential storage.

:::

### macOS

```bash
make build TARGET_OS=darwin && make install TARGET_OS=darwin
```

### Linux

```bash
make build TARGET_OS=linux && make install TARGET_OS=linux
```

### Configure Your Shell

After installation, add `casdoor-cli` to your `PATH`:

**For Bash users:**

```bash
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**For Zsh users:**

```bash
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Verify the installation:

```bash
casdoor --help
```

## Configuration

### Casdoor Server Setup

To use the CLI, you need a configured Casdoor application. You have two options:

1. **Using the provided bootstrap data**: An `init_data.json` file is included in the repository to quickly bootstrap Casdoor's configuration. Refer to the [Data Initialization documentation](/docs/deployment/data-initialization) for initialization instructions.

2. **Manual configuration**: Create an application directly in your Casdoor admin panel and configure it according to your requirements.

### CLI Configuration

On first launch, `casdoor-cli` will prompt you to provide a `config.yaml` file containing your Casdoor connection details. See the included `config.yaml.example` file in the repository for reference.

**Required configuration fields:**

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

Your configuration will be securely stored in `~/.casdoor-cli/config.yaml` (base64 encoded) for subsequent use.

## Usage

### Available Commands

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

### Login

To authenticate with your Casdoor instance:

```bash
casdoor login
```

This will open your default browser for OAuth2 authentication.

### Managing Users

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

### Managing Groups

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

### Logout

To logout from your Casdoor account:

```bash
casdoor logout
```

## Development

### Local Development Environment

A Docker Compose environment is provided in the repository for local testing and development:

```bash
docker compose up -d
```

:::note

Allow a few moments for the Casdoor container to fully initialize. The container will restart multiple times as it sets up the database.

:::

### Development Configuration

Create a `config.yaml` file from the provided `config.yaml.example` template at the repository root with your local development settings.

### Testing the CLI

Test the login functionality with the default development credentials provided in the repository documentation.

**Run directly with Go:**

```bash
go run main.go login
```

**Or build and install first:**

```bash
make build TARGET_OS=darwin && make install TARGET_OS=darwin  # For macOS
# OR
make build TARGET_OS=linux && make install TARGET_OS=linux    # For Linux

casdoor login
```
