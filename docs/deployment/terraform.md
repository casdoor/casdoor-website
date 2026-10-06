---
title: Terraform
description: Manage Casdoor organizations, applications, users, providers, certs, roles, permissions and groups as code with the official Terraform provider.
keywords: [Terraform, OpenTofu, infrastructure as code, IaC, provider, deployment]
authors: [hsluoyz]
---

The official [Casdoor Terraform provider](https://registry.terraform.io/providers/casdoor/casdoor) manages the objects of a Casdoor server as code, so that the configuration can be reviewed, versioned, and applied to several environments.

- Terraform Registry: [`casdoor/casdoor`](https://registry.terraform.io/providers/casdoor/casdoor)
- GitHub repository: [casdoor/terraform-provider-casdoor](https://github.com/casdoor/terraform-provider-casdoor)

It works with Terraform and OpenTofu.

## Resources

| Resource | Casdoor object | Import ID |
|----------|----------------|-----------|
| [`casdoor_organization`](https://registry.terraform.io/providers/casdoor/casdoor/latest/docs/resources/organization) | [Organization](/docs/organization/overview) | `name` |
| [`casdoor_application`](https://registry.terraform.io/providers/casdoor/casdoor/latest/docs/resources/application) | [Application](/docs/application/overview), with its providers | `name` |
| [`casdoor_user`](https://registry.terraform.io/providers/casdoor/casdoor/latest/docs/resources/user) | [User](/docs/user/overview) | `organization/name` |
| [`casdoor_provider`](https://registry.terraform.io/providers/casdoor/casdoor/latest/docs/resources/provider) | [Provider](/docs/provider/overview) | `owner/name` |
| [`casdoor_cert`](https://registry.terraform.io/providers/casdoor/casdoor/latest/docs/resources/cert) | [Cert](/docs/cert/overview) | `owner/name` |
| [`casdoor_role`](https://registry.terraform.io/providers/casdoor/casdoor/latest/docs/resources/role) | [Role](/docs/permission/overview) | `organization/name` |
| [`casdoor_permission`](https://registry.terraform.io/providers/casdoor/casdoor/latest/docs/resources/permission) | [Permission](/docs/permission/overview) | `organization/name` |
| [`casdoor_group`](https://registry.terraform.io/providers/casdoor/casdoor/latest/docs/resources/group) | [Group](/docs/organization/organization-tree) | `organization/name` |

The `owner` of a provider or cert is `admin` for a global object shared by all organizations, or the name of an organization.

## Configure the provider

The provider calls the [Casdoor API](/docs/basic/public-api) as an application, using its client ID and client secret. To manage every organization, use an application of the `built-in` organization, e.g. `app-built-in`: open **Applications** → `app-built-in` in the Casdoor UI and copy its **Client ID** and **Client secret**.

```hcl
terraform {
  required_providers {
    casdoor = {
      source = "casdoor/casdoor"
    }
  }
}

provider "casdoor" {
  endpoint      = "https://door.casdoor.com"
  client_id     = var.casdoor_client_id
  client_secret = var.casdoor_client_secret
}
```

The settings can also be passed with the `CASDOOR_ENDPOINT`, `CASDOOR_CLIENT_ID` and `CASDOOR_CLIENT_SECRET` environment variables, which keeps the secret out of the configuration:

```bash
export CASDOOR_ENDPOINT=https://door.casdoor.com
export CASDOOR_CLIENT_ID=<client ID>
export CASDOOR_CLIENT_SECRET=<client secret>
terraform init
```

## Example

The following configuration creates an organization, a cert, a GitHub identity provider, an application that uses both, a user, a role and a permission:

```hcl
resource "casdoor_organization" "acme" {
  name          = "acme"
  display_name  = "Acme"
  password_type = "bcrypt"
  country_codes = ["US"]
}

resource "casdoor_cert" "acme" {
  name             = "cert-acme"
  crypto_algorithm = "RS256"
  bit_size         = 4096
  expire_in_years  = 20
}

resource "casdoor_provider" "github" {
  name          = "provider-acme-github"
  category      = "OAuth"
  type          = "GitHub"
  client_id     = var.github_client_id
  client_secret = var.github_client_secret
}

resource "casdoor_application" "portal" {
  name          = "app-acme-portal"
  organization  = casdoor_organization.acme.name
  cert          = casdoor_cert.acme.name
  redirect_uris = ["https://portal.acme.example.com/callback"]

  providers = [
    {
      name        = casdoor_provider.github.name
      owner       = "admin"
      can_sign_in = true
      can_sign_up = true
    },
  ]
}

resource "casdoor_user" "alice" {
  owner    = casdoor_organization.acme.name
  name     = "alice"
  email    = "alice@acme.example.com"
  password = var.alice_password
}

resource "casdoor_role" "admins" {
  owner = casdoor_organization.acme.name
  name  = "admins"
  users = ["acme/alice"]
}

resource "casdoor_permission" "portal_admin" {
  owner         = casdoor_organization.acme.name
  name          = "portal-admin"
  roles         = ["acme/admins"]
  resource_type = "Application"
  resources     = [casdoor_application.portal.name]
  actions       = ["Read", "Write"]
  effect        = "Allow"
}

output "portal_client_id" {
  value = casdoor_application.portal.client_id
}
```

Run `terraform plan` to preview the changes and `terraform apply` to apply them. The client ID and client secret of the application are generated by Casdoor and exported as `client_id` and `client_secret` (sensitive), so that they can be passed to the app that signs in with Casdoor.

## Fields not in the configuration

Only the attributes set in the configuration are written to Casdoor. The other fields of an object keep the values they have in Casdoor, including the fields the provider doesn't support yet, so a resource can manage part of an object that is also edited in the Casdoor UI. An attribute that is removed from the configuration keeps its last value in Casdoor.

Casdoor never returns passwords and some secrets, such as a user's `password` and a provider's `client_secret`, so changes made to them outside of Terraform are not detected.

## Import existing objects

Objects created in the Casdoor UI can be brought under Terraform with `terraform import`, using the import ID from the table above:

```bash
terraform import casdoor_organization.acme acme
terraform import casdoor_application.portal app-acme-portal
terraform import casdoor_user.alice acme/alice
terraform import casdoor_provider.github admin/provider-acme-github
```

After an import, the first `terraform apply` writes the `password` and `client_secret` attributes once, since their current values can't be read from Casdoor.

To initialize a new Casdoor server from a file instead, see [Data initialization](/docs/deployment/data-initialization).
