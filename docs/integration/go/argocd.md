---
title: Argo CD
description: Sign in to the Argo CD UI and CLI with Casdoor over OpenID Connect, and grant Argo CD roles to Casdoor groups.
keywords: [Argo CD, ArgoCD, GitOps, OpenID Connect, OIDC, RBAC, groups]
authors: [casdoor]
---

[Argo CD](https://argo-cd.readthedocs.io/) can use an existing OpenID Connect (OIDC) provider directly, without its bundled Dex. With Casdoor as the provider, users sign in to the Argo CD UI and CLI with their Casdoor account, and Casdoor groups decide what they can do.

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add both callbacks to **Redirect URLs**:

   ```text
   https://argocd.example.com/auth/callback
   http://localhost:8085/auth/callback
   ```

   The second one is for `argocd login --sso` from the CLI.

1. On the **OIDC/OAuth** tab, set **Token group format** to `Name (group)`, so groups arrive as `argocd-admins` instead of `my-org/argocd-admins`. Keep **Token format** at the default `JWT`: Argo CD reads groups from the ID token, and the default format carries them there.
1. Save, and note the **Client ID** and **Client secret**.

## Configure Argo CD

1. Store the client secret in the `argocd-secret` Secret:

   ```bash
   kubectl -n argocd patch secret argocd-secret \
     --patch='{"stringData": {"oidc.casdoor.clientSecret": "<your-client-secret>"}}'
   ```

1. Add Casdoor to the `argocd-cm` ConfigMap:

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: argocd-cm
     namespace: argocd
   data:
     url: https://argocd.example.com
     oidc.config: |
       name: Casdoor
       issuer: https://door.example.com
       clientID: <your-client-id>
       clientSecret: $oidc.casdoor.clientSecret
       requestedScopes: ["openid", "profile", "email"]
       enablePKCEAuthentication: true
   ```

   - `url`: The public URL of Argo CD.
   - `issuer`: The URL of Casdoor, without a trailing slash. It must be exactly the `issuer` shown at `https://door.example.com/.well-known/openid-configuration`.
   - `$oidc.casdoor.clientSecret`: Reads the secret you stored in the previous step.

1. Grant roles to Casdoor groups in the `argocd-rbac-cm` ConfigMap. This example gives members of `argocd-admins` full access and everyone else read-only access:

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: argocd-rbac-cm
     namespace: argocd
   data:
     policy.default: role:readonly
     policy.csv: |
       g, argocd-admins, role:admin
     scopes: "[groups]"
   ```

## Verify the result

1. Open Argo CD. The sign-in page shows **Log in via Casdoor**.
1. Click it and sign in to Casdoor as a member of `argocd-admins`. Argo CD opens with full access.
1. From the CLI, run:

   ```bash
   argocd login argocd.example.com --sso
   argocd account get-user-info
   ```

   The output lists the user's groups, for example `Groups: argocd-admins`.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| A member of `argocd-admins` only gets read-only access | The group arrives as `my-org/argocd-admins`. Set **Token group format** to `Name (group)`, or use the full value in `policy.csv`. Users have to sign in again to pick up group changes. |
| Sign-in fails with an issuer error | `issuer` differs from the `issuer` in Casdoor's discovery document. Set `origin` in Casdoor's `conf/app.conf` to its public URL and use the same value. |
| The CLI login fails with a redirect error | Add `http://localhost:8085/auth/callback` to the application's **Redirect URLs**. |

## See also

- [User management](https://argo-cd.readthedocs.io/en/stable/operator-manual/user-management/) in the Argo CD documentation
- [Kubernetes](/docs/integration/go/kubernetes)
