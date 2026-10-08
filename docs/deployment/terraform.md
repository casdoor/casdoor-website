---
title: Manage Casdoor with Terraform
sidebar_label: Terraform
description: Manage Casdoor organizations, applications, users, providers, certs, roles, permissions, and groups as code with the official Terraform provider.
keywords: [Terraform, OpenTofu, infrastructure as code, IaC, provider, deployment]
authors: [hsluoyz]
---

This guide explains how to manage the objects of a Casdoor server as code with the official [Casdoor Terraform provider](https://registry.terraform.io/providers/casdoor/casdoor), so that you can review, version, and apply the configuration to several environments.

---

#### Learning outcomes

- Configure the Casdoor Terraform provider.
- Create organizations, applications, users, and other objects from a Terraform configuration.
- Bring objects that already exist under Terraform.
- Understand which fields Terraform writes and which it leaves alone.

#### What you need

- Terraform or OpenTofu
- A running Casdoor instance
- The client ID and client secret of a Casdoor application. To manage every organization, use an application of the `built-in` organization, such as `app-built-in`.

---

## About the provider

- Terraform Registry: [`casdoor/casdoor`](https://registry.terraform.io/providers/casdoor/casdoor)
- Source code: [casdoor/terraform-provider-casdoor](https://github.com/casdoor/terraform-provider-casdoor)

The provider calls the [Casdoor API](/docs/basic/public-api) as an application, with the application's client ID and client secret. It supports the following resources:

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

The `owner` of a provider or a cert is `admin` for a global object that all organizations share, or the name of the organization that owns it.

## Configure the provider

1. In the Casdoor admin console, go to **Applications**, open `app-built-in`, and copy its **Client ID** and **Client secret**.
1. Declare the provider in your Terraform configuration:

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

   To keep the secret out of the configuration, omit the settings and pass them as environment variables instead:

   ```bash
   export CASDOOR_ENDPOINT=https://door.casdoor.com
   export CASDOOR_CLIENT_ID=<client ID>
   export CASDOOR_CLIENT_SECRET=<client secret>
   terraform init
   ```

## Create objects

1. Add resources to the configuration. The following example creates an organization, a cert, a GitHub identity provider, an application that uses both, a user, a role, and a permission:

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

1. Preview the changes:

   ```bash
   terraform plan
   ```

1. Apply the changes:

   ```bash
   terraform apply
   ```

Casdoor generates the client ID and client secret of the application. The resource exports them as `client_id` and `client_secret`, which is marked sensitive, so that you can pass them to the application that signs users in with Casdoor.

## Import existing objects

To bring an object that was created in the admin console under Terraform, run `terraform import` with the import ID from the [resource table](#about-the-provider):

```bash
terraform import casdoor_organization.acme acme
terraform import casdoor_application.portal app-acme-portal
terraform import casdoor_user.alice acme/alice
terraform import casdoor_provider.github admin/provider-acme-github
```

After an import, the first `terraform apply` writes the `password` and `client_secret` attributes once, because Terraform can't read their current values from Casdoor.

## Understand which fields Terraform writes {#fields-not-in-the-configuration}

- **Attributes in the configuration**: Terraform writes them to Casdoor.
- **Fields that the configuration doesn't set**: They keep the values that they have in Casdoor. This includes fields that the provider doesn't support yet. A resource can therefore manage part of an object that you also edit in the admin console.
- **Attributes that you remove from the configuration**: They keep their last value in Casdoor.
- **Passwords and secrets**: Casdoor never returns values such as the `password` of a user or the `client_secret` of a provider. Terraform doesn't detect changes that are made to them outside Terraform.

## See also

- [Initialize and manage data with a file](/docs/deployment/data-initialization): Load objects from a file when a new Casdoor server starts.
- [Call the Casdoor API](/docs/basic/public-api)
- [Casdoor plugins](/docs/how-to-connect/plugin)
