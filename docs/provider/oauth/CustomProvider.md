---
title: Add a custom OAuth provider
sidebar_label: Custom provider
description: Connect Casdoor to any OAuth 2.0 identity provider that has no built-in type, and the requests and responses that the provider must support.
keywords: [Custom Provider, OAuth, Casdoor]
authors: [halozhy]
---

This guide explains how to connect Casdoor to an OAuth 2.0 identity provider that has no built-in type, such as an internal identity provider or a self-hosted service. You can add up to ten custom providers, with the types `Custom`, `Custom2`, and so on up to `Custom10`, each with its own configuration. For a provider that supports OpenID Connect (OIDC) discovery, use the [OIDC type](/docs/provider/oauth/oidc) instead.

---

#### Learning outcomes

- Configure a custom OAuth provider.
- Know which requests Casdoor sends and which responses it expects.

#### What you need

- An identity provider that supports the standard three-legged OAuth 2.0 authorization code flow
- The authorization, token, and user info endpoints of the provider, and a client ID and client secret from it

---

## Create the provider {#create-a-custom-provider}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to one of `Custom` to `Custom10`.
1. Fill in the fields:

   | Field | Description |
   |---|---|
   | **Client ID**, **Client secret** | Credentials that the identity provider issued |
   | **Auth URL** | Authorization endpoint of the identity provider |
   | **Scope** | Scopes to request, as the identity provider documents them |
   | **Enable PKCE** | Adds Proof Key for Code Exchange (PKCE) to the flow |
   | **Token URL** | Token endpoint of the identity provider |
   | **UserInfo URL** | User info endpoint of the identity provider. Optional if the token response has an ID token |
   | **Logout URL** | Optional. When a user signs out, Casdoor sends a `POST` form with `token`, `client_id`, and `client_secret` to it |
   | **User mapping** | Claim name for each user field. See [User info](#user-info) |
   | **Favicon** | URL of the logo that the Casdoor sign-in page shows |

   ![Custom provider in Casdoor](/img/providers/OAuth/customprovider.png)

1. Save the provider.

## Requests and responses

The identity provider must handle the following requests and return the following responses. The examples use Casdoor itself as the identity provider.

### Authorization

Casdoor sends the browser to the **Auth URL**:

```url
https://door.casdoor.com/login/oauth/authorize?client_id={ClientID}&redirect_uri=https://{your-casdoor-hostname}/callback&state={State_generated_by_Casdoor}&response_type=code&scope={Scope}` 
```

With **Enable PKCE** on, Casdoor appends:

```url
&code_challenge={code_challenge}&code_challenge_method=S256
```

After the user signs in, the identity provider redirects to the callback of Casdoor with the code:

```url
https://{your-casdoor-hostname}/callback?code={code}
```

With PKCE, Casdoor generates a new random code verifier for each sign-in, computes the `S256` challenge, and stores the verifier in `localStorage` under the OAuth state. It deletes the verifier after use.

### Token

Casdoor exchanges the code at the **Token URL**:

```bash
curl -X POST -u "{ClientID}:{ClientSecret}" --data-binary "code={code}&grant_type=authorization_code&redirect_uri=https://{your-casdoor-hostname}/callback" https://door.casdoor.com/api/login/oauth/access_token
```

With PKCE, the request includes the code verifier:

```bash
curl -X POST -u "{ClientID}:{ClientSecret}" --data-binary "code={code}&grant_type=authorization_code&redirect_uri=https://{your-casdoor-hostname}/callback&code_verifier={code_verifier}" https://door.casdoor.com/api/login/oauth/access_token
```

The response must contain at least:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ixxxxxxxxxxxxxx",
  "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6xxxxxxxxxxxxxx",
  "token_type": "Bearer",
  "expires_in": 10080,
  "scope": "openid profile email"
}
```

### User info

Casdoor reads the user from the **UserInfo URL** with the access token:

```bash
curl -X GET -H "Authorization: Bearer {accessToken}" https://door.casdoor.com/api/userinfo
```

For example:

```json
{
  "sub": "8a7b9c4e-1234-5678-9abc-def012345678",
  "name": "admin",
  "preferred_username": "Admin",
  "email": "admin@example.com",
  "email_verified": true,
  "picture": "https://casbin.org/img/casbin.svg",
  "phone": "+1234567890"
}
```

If the token response has an `id_token`, Casdoor also reads its claims. It checks that `sub` is present, that `exp` isn't in the past, and that `aud` contains the client ID. The claims of the **UserInfo URL** override the claims of the ID token with the same name.

Casdoor reads each user field from the claim that **User mapping** names. A dotted name, such as `data.user.id`, reads a nested claim. If the claim is missing or empty, Casdoor uses the standard OIDC claim, such as `sub` for the ID, `preferred_username` for the username, `picture` for the avatar, and `phone_number` for the phone. See [Claims that Casdoor reads](/docs/provider/oauth/oidc#claims-that-casdoor-reads). The claim that **ID** names is required: if the response doesn't contain it, the sign-in fails. For the example above, set **ID** to `sub`.

The user mapping keys `emailVerified` and `phoneVerified` decide whether the email address and the phone number count as verified. See [Verified email and phone](/docs/provider/oauth/user-mapping#verified-email-and-phone).

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [Map OAuth claims to user fields](/docs/provider/oauth/user-mapping)
