---
title: Proxmox VE
description: Add Casdoor to Proxmox VE as an OpenID Connect realm, so administrators sign in to the web interface with their Casdoor account and get permissions from Casdoor groups.
keywords: [Proxmox VE, PVE, OpenID Connect, OIDC, realm, groups]
authors: [casdoor]
---

[Proxmox VE](https://www.proxmox.com/en/products/proxmox-virtual-environment/overview) can authenticate users against an OpenID Connect (OIDC) realm. With Casdoor as the realm, administrators sign in to the Proxmox VE web interface with their Casdoor account, and Proxmox VE permissions follow their Casdoor groups.

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the address of the Proxmox VE web interface to **Redirect URLs**, with the port:

   ```text
   https://pve.example.com:8006
   ```

   Proxmox VE sends the address that the browser opened as the redirect URL, so add every address you use, for example the address of each node.

1. On the **OIDC/OAuth** tab, set **Token group format** to `Name (group)`, so groups arrive as `pve-admins` instead of `my-org/pve-admins`.
1. Save, and note the **Client ID** and **Client secret**.

## Add an OpenID Connect realm

1. On a Proxmox VE node, run:

   ```bash
   pveum realm add casdoor --type openid \
     --issuer-url https://door.example.com \
     --client-id "<your-client-id>" \
     --client-key "<your-client-secret>" \
     --username-claim username \
     --autocreate 1 \
     --groups-claim groups \
     --groups-autocreate 1
   ```

   You can enter the same values in the web interface under **Datacenter** > **Permissions** > **Realms** > **Add** > **OpenID Connect Server**.

   - `--issuer-url`: The URL of Casdoor, without a trailing slash.
   - `--username-claim username`: Reads the `preferred_username` claim, so users appear as `alice@casdoor`. The default, `subject`, uses the Casdoor user ID.
   - `--groups-claim groups`, `--groups-autocreate 1`: Create Proxmox VE groups from the user's Casdoor groups. On versions without these options, leave them out and grant permissions to users instead.

1. Grant a role to the group. Proxmox VE appends the realm name to groups from the claim, so `pve-admins` becomes `pve-admins-casdoor`:

   ```bash
   pveum acl modify / --groups pve-admins-casdoor --roles Administrator
   ```

## Verify the result

1. Open the Proxmox VE web interface, choose the **casdoor** realm, and click **Login (OpenID redirect)**.
1. Sign in to Casdoor as a member of `pve-admins`. Proxmox VE opens with the user signed in as `alice@casdoor` and administrator rights.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | Add the exact address from the error, with the port, to **Redirect URLs**. |
| The user signs in but sees nothing | No permissions apply. Grant a role to the user's group or to the user with `pveum acl modify`. |
| Sign-in fails with `missing claim 'preferred_username'` | The realm can't read the username. Keep **Query userinfo endpoint** on, and request the `profile` scope. |

## See also

- [User management](https://pve.proxmox.com/wiki/User_Management) in the Proxmox VE wiki
