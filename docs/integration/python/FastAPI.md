---
title: FastAPI
description: "Add Casdoor sign-in and Casdoor permission checks to a FastAPI app with the community casbin-fastapi-decorator library."
keywords: [FastAPI, Python, OAuth2, Casbin, authorization]
authors: [Neko1313]
---

[casbin-fastapi-decorator](https://github.com/Neko1313/casbin-fastapi-decorator) is a community library that protects FastAPI routes with decorators. Its Casdoor package, `casbin-fastapi-decorator-casdoor`, signs users in through Casdoor (OAuth2) and checks permissions by calling Casdoor's [`/api/enforce`](/docs/permission/exposed-casbin-apis) API, so the policies live in Casdoor instead of your app.

:::note
This library is maintained by the community, not by the Casdoor team. Report bugs in its [GitHub repository](https://github.com/Neko1313/casbin-fastapi-decorator/issues).
:::

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: The domain name or IP where Casdoor server is deployed, e.g. `http://localhost:8000`.

`FASTAPI_HOSTNAME`: The domain name or IP where your FastAPI app is deployed, e.g. `http://localhost:8080`.

## Step 1: Deploy Casdoor

Deploy [Casdoor](/docs/basic/server-installation) and make sure you can sign in to it.

## Step 2: Configure Casdoor

1. Create a new [application](/docs/application/overview) or use an existing one.
2. Add `FASTAPI_HOSTNAME/callback` to **Redirect URLs** of the application.
3. Copy the **Client ID**, **Client Secret**, the organization name and the application name.
4. Open the certificate used by the application (**Certs** page) and copy its public key.
5. Create the permission rules that the app should check. You can use an [enforcer](/docs/permission/overview), a [permission](/docs/permission/permission-configuration), a model, a resource or a whole organization as the target; you will pass its ID in Step 4.

## Step 3: Install the library

```bash
pip install "casbin-fastapi-decorator[casdoor]"
```

Python 3.10 or later is required.

## Step 4: Protect your routes

`CasdoorIntegration` creates the Casdoor SDK client, the sign-in routes and a `PermissionGuard` in one call:

```python
from fastapi import FastAPI
from casbin_fastapi_decorator_casdoor import CasdoorEnforceTarget, CasdoorIntegration

casdoor = CasdoorIntegration(
    endpoint="http://localhost:8000",
    client_id="<client-id>",
    client_secret="<client-secret>",
    certificate="-----BEGIN CERTIFICATE-----\n...",
    org_name="built-in",
    application_name="app-built-in",
    target=CasdoorEnforceTarget(
        # the enforcer ID is built from the signed-in user's organization
        enforce_id=lambda parsed: f"{parsed['owner']}/my-enforcer",
    ),
    cookie_secure=False,  # only for local HTTP testing; keep the default True in production
)

app = FastAPI()
app.include_router(casdoor.router)  # GET /login, GET /callback, POST /logout, GET /me
guard = casdoor.create_guard()

@app.get("/articles")
@guard.require_permission("articles", "read")
async def list_articles():
    return []

@app.get("/profile")
@guard.auth_required()
async def profile():
    return {"ok": True}
```

How it works:

1. Send the user to `FASTAPI_HOSTNAME/login`. The app redirects to Casdoor with a random `state` value.
2. After sign-in, Casdoor redirects back to `/callback`. The app checks `state`, exchanges the code for tokens and stores them in the `access_token` and `refresh_token` cookies.
3. On each protected request, the app verifies the token with the certificate and calls Casdoor's `/api/enforce` with `["<owner>/<name>", "articles", "read"]`. Requests that are denied get `403 Forbidden`.
4. `POST /logout` signs the user out of Casdoor and clears the cookies.

## Step 5: Choose the enforce target

`CasdoorEnforceTarget` decides which Casdoor object holds the rules. Set exactly one field, either to a fixed ID or to a function that receives the parsed JWT:

| Field | Casdoor object |
|---|---|
| `enforce_id` | Enforcer, e.g. `built-in/my-enforcer` |
| `permission_id` | Permission, e.g. `built-in/can-read-articles` |
| `model_id` | Model, e.g. `built-in/rbac-model` |
| `resource_id` | Resource |
| `owner` | All permissions of an organization, e.g. `built-in` |

```python
CasdoorEnforceTarget(permission_id="built-in/can-read-articles")
```

## Advanced usage

To use your own user ID format, a different target per guard, or your own error responses, build the parts yourself:

```python
from casdoor import AsyncCasdoorSDK
from fastapi import FastAPI, HTTPException
from casbin_fastapi_decorator import PermissionGuard
from casbin_fastapi_decorator_casdoor import (
    CasdoorEnforcerProvider,
    CasdoorEnforceTarget,
    CasdoorUserProvider,
    make_casdoor_router,
)

sdk = AsyncCasdoorSDK(
    endpoint="http://localhost:8000",
    client_id="<client-id>",
    client_secret="<client-secret>",
    certificate="<certificate>",
    org_name="built-in",
    application_name="app-built-in",
)

guard = PermissionGuard(
    user_provider=CasdoorUserProvider(sdk=sdk),
    enforcer_provider=CasdoorEnforcerProvider(
        sdk=sdk,
        target=CasdoorEnforceTarget(enforce_id="built-in/my-enforcer"),
        user_factory=lambda parsed: parsed["email"],  # default is "owner/name"
    ),
    error_factory=lambda user, *rvals: HTTPException(403, "Forbidden"),
)

app = FastAPI()
app.include_router(make_casdoor_router(sdk, redirect_after_login="/docs"))
```

See the [library README](https://github.com/Neko1313/casbin-fastapi-decorator/tree/main/packages/casbin-fastapi-decorator-casdoor) for all options, such as cookie names, cookie domain and a custom `state` store.
