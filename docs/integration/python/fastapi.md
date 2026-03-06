---
title: FastAPI
description: Using casbin-fastapi-decorator with Casdoor integration in FastAPI
keywords: [FastAPI, Casbin, decorator, Python, authorization, OAuth2]
authors: [Neko1313]
---

[Casdoor](/docs/basic/server-installation) can be used to provide both authentication and authorization in [FastAPI](https://fastapi.tiangolo.com/) applications via the **casbin-fastapi-decorator** library and its Casdoor extra.

**casbin-fastapi-decorator** provides a clean, decorator-based approach for integrating [Casbin](https://casbin.org/) authorization into FastAPI projects. The **Casdoor extra** (`casbin-fastapi-decorator-casdoor`) combines Casdoor OAuth2 login with Casbin policy enforcement through the Casdoor remote enforce API.

- Repository: [https://github.com/Neko1313/casbin-fastapi-decorator](https://github.com/Neko1313/casbin-fastapi-decorator)
- PyPI (core): [casbin-fastapi-decorator](https://pypi.org/project/casbin-fastapi-decorator/)
- PyPI (Casdoor extra): [casbin-fastapi-decorator-casdoor](https://pypi.org/project/casbin-fastapi-decorator-casdoor/)

## Installation

```bash
pip install "casbin-fastapi-decorator[casdoor]"
```

## Quick start with `CasdoorIntegration`

The simplest way to get started is via the `CasdoorIntegration` facade, which wires together the Casdoor SDK, user provider, enforcer provider, and OAuth2 router in a single call:

```python
from casbin_fastapi_decorator_casdoor import CasdoorIntegration, CasdoorEnforceTarget
from fastapi import FastAPI

app = FastAPI()

casdoor = CasdoorIntegration(
    endpoint="http://localhost:8000",
    client_id="...",
    client_secret="...",
    certificate="-----BEGIN CERTIFICATE-----\n...",
    org_name="my_org",
    application_name="my_app",
    target=CasdoorEnforceTarget(
        enforce_id=lambda parsed: f"{parsed['owner']}/my_enforcer"
    ),
)

# Include OAuth2 callback & logout routes
app.include_router(casdoor.router)

# Create a pre-configured PermissionGuard
guard = casdoor.create_guard()

@app.get("/protected")
@guard.require_permission("resource", "read")
async def protected():
    return {"ok": True}

@app.get("/me")
@guard.auth_required()
async def me():
    return {"ok": True}
```

## Components overview

The Casdoor extra provides the following components that can also be used independently for advanced customization:

| Component | Description |
|---|---|
| `CasdoorUserProvider` | Validates `access_token` and `refresh_token` cookies via the Casdoor SDK (JWT verification) |
| `CasdoorEnforcerProvider` | Provides a `CasdoorEnforcer` that delegates policy checks to the Casdoor remote enforce API (`/api/enforce`) |
| `CasdoorEnforceTarget` | Selects which Casdoor API identifier to use — supports `enforce_id`, `permission_id`, `model_id`, `resource_id`, or `owner`; values can be static strings or callables receiving the parsed JWT |
| `CasdoorIntegration` | Facade combining all of the above with configurable cookie settings |
| `make_casdoor_router` | Creates an `APIRouter` with `GET /callback` (OAuth2 code exchange) and `POST /logout` (cookie cleanup) |

## Advanced usage (manual composition)

For cases requiring a custom `user_factory`, different enforce targets per route, or other customization:

```python
from casdoor import AsyncCasdoorSDK
from fastapi import FastAPI, HTTPException
from casbin_fastapi_decorator import PermissionGuard
from casbin_fastapi_decorator_casdoor import (
    CasdoorUserProvider,
    CasdoorEnforcerProvider,
    CasdoorEnforceTarget,
    make_casdoor_router,
)

sdk = AsyncCasdoorSDK(
    endpoint="http://localhost:8000",
    client_id="...",
    client_secret="...",
    certificate="...",
    org_name="my_org",
    application_name="my_app",
)

target = CasdoorEnforceTarget(permission_id="my_org/can_read")

user_provider = CasdoorUserProvider(sdk=sdk)
enforcer_provider = CasdoorEnforcerProvider(sdk=sdk, target=target)
router = make_casdoor_router(sdk=sdk, redirect_after_login="/dashboard")

guard = PermissionGuard(
    user_provider=user_provider,
    enforcer_provider=enforcer_provider,
    error_factory=lambda user, *rv: HTTPException(403, "Forbidden"),
)

app = FastAPI()
app.include_router(router)

@app.get("/articles")
@guard.require_permission("articles", "read")
async def list_articles():
    return []
```

## Dynamic enforce targets

`CasdoorEnforceTarget` fields accept callables that receive the parsed JWT payload, enabling dynamic resolution at enforce-time:

```python
# Organization taken from the user's JWT
CasdoorEnforceTarget(
    enforce_id=lambda parsed: f"{parsed['owner']}/my_enforcer"
)

# Static target
CasdoorEnforceTarget(permission_id="my_org/can_edit_posts")
```
