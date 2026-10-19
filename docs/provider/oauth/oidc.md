---
title: Add an OpenID Connect provider
sidebar_label: OIDC
description: Connect Casdoor to any OpenID Connect identity provider by its issuer URL, and learn how Casdoor checks the ID token and reads the user claims.
keywords: [OIDC, OpenID Connect, OAuth, discovery, issuer, id_token]
authors: [hsluoyz]
---

This guide explains how to connect Casdoor to an identity provider that supports OpenID Connect (OIDC), such as Keycloak, Authentik, Zitadel, or another Casdoor instance. The `OIDC` provider type reads the endpoints from the discovery document of the issuer, checks the ID token, and fills the user from the standard OIDC claims.

---

#### Learning outcomes

- Add an `OIDC` provider and fill in its endpoints from the issuer URL.
- Know how Casdoor checks the ID token and which claims it reads.

#### What you need

- An identity provider that publishes an OIDC discovery document at `<issuer>/.well-known/openid-configuration`
- A client at the identity provider with the redirect URI `https://<your-casdoor-host>/callback`, and its client ID and client secret
- Administrator access to the Casdoor admin console

---

## About the OIDC type

`OIDC` is a separate type from `Custom` to `Custom10`. Both types show the same endpoint fields, but `OIDC` adds the **Issuer URL**, fills in the endpoints from the discovery document, and requires a valid ID token when the issuer URL is set. Use `OIDC` for a standard OpenID Connect provider, and a [custom OAuth provider](/docs/provider/oauth/CustomProvider) for an OAuth 2.0 provider that doesn't support OIDC.

## Create the provider

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `OIDC`. Casdoor sets **Scope** to `openid profile email`.
1. Enter the **Client ID** and the **Client secret** from the identity provider.
1. In **Issuer URL**, enter the issuer of the identity provider, for example `https://idp.example.com/realms/<realm-name>`, and click **Request**. Casdoor reads the discovery document and fills in the fields:

   | Field | Value from the discovery document |
   |---|---|
   | **Issuer URL** | `issuer` |
   | **Auth URL** | `authorization_endpoint` |
   | **Token URL** | `token_endpoint` |
   | **UserInfo URL** | `userinfo_endpoint` |
   | **Logout URL** | `end_session_endpoint` |

1. Check the other fields and change them if needed:

   | Field | Description |
   |---|---|
   | **Scope** | Scopes to request. Keep `openid` in the list, because the identity provider returns an ID token only for it |
   | **Enable PKCE** | Adds Proof Key for Code Exchange (PKCE) to the flow |
   | **User mapping** | Claims to read for each user field. The rows start with default names, such as `id` for **ID** and `username` for **Username**. Set **ID** to `sub`, because an OIDC provider has no `id` claim. The **ID**, **Username**, and **Display name** rows can't be empty. See [Claims that Casdoor reads](#claims-that-casdoor-reads) |
   | **Favicon** | URL of the logo that the sign-in page shows for the provider |

1. Save the provider.

Casdoor fetches the discovery document from `<issuer>/.well-known/openid-configuration`. It removes a trailing `/` from the issuer, adds `https://` if the issuer has no scheme, and doesn't append the path again if the issuer already ends with it. The request fails if the document can't be read within 10 seconds, or if it has no `authorization_endpoint` or `token_endpoint`.

The browser goes to the **Auth URL** at sign-in, so it must be set. If **Token URL** or **UserInfo URL** is empty, Casdoor reads it from the discovery document of the issuer at each sign-in.

:::note
The **Request** button calls `GET /api/get-idp-discovery?issuer=<issuer>`, which requires an administrator. For an organization administrator, Casdoor fetches the document only from Internet addresses, and refuses private, loopback, and link-local addresses. See [Which addresses a provider can reach](/docs/provider/overview#which-addresses-a-provider-can-reach).
:::

## How Casdoor checks the ID token

After it exchanges the authorization code at the **Token URL**, Casdoor reads the `id_token` of the token response.

- If **Issuer URL** is set, the `id_token` is required, and the sign-in fails without it.
- `sub` must be present.
- If **Issuer URL** is set, `iss` must equal it, without regard to a trailing `/`.
- `exp`, if present, must be in the future.
- `aud` must be the client ID, or a list that contains it.

Casdoor receives the ID token directly from the token endpoint over the connection that it opened, and doesn't check the signature of the token.

If **UserInfo URL** is set, Casdoor also calls it with the access token. Its claims override the claims of the ID token with the same name.

## Claims that Casdoor reads

For each user field, Casdoor uses the claim that **User mapping** names. If the mapping names no claim, or the provider doesn't return the claim, or the claim is empty, Casdoor uses the first standard claim that has a value. The exception is **ID**: if the provider doesn't return the claim that **ID** names, the sign-in fails with `cannot find <claim> in user from custom provider`.

| User field | Standard claims, in order |
|---|---|
| ID | `sub` |
| Username | `preferred_username`, `name`, `sub` |
| Display name | `name`, `preferred_username` |
| Email | `email` |
| Email verified | `email_verified` |
| Phone | `phone_number` |
| Phone verified | `phone_number_verified` |
| Avatar | `picture` |

If the provider returns no ID, the sign-in fails.

Casdoor stores the other claims in the user property `oauth_OIDC_extra`, as JSON. It leaves out the claims that only matter to the protocol: `aud`, `at_hash`, `auth_time`, `azp`, `c_hash`, `exp`, `iat`, `jti`, `nbf`, `nonce`, `s_hash`, and `sid`. To copy one of these claims into a user field, such as the job title, see [Map OAuth claims to user fields](/docs/provider/oauth/user-mapping).

`email_verified` and `phone_number_verified` decide whether the **Binding rule** of the application can link the sign-in to an existing user with the same email address or phone number. See [How Casdoor links accounts](/docs/provider/oauth/overview#automatic-account-linking).

## Sign-out

When a user signs out of an application that uses the provider, and **Logout URL** is set, Casdoor sends a `POST` request with the form fields `token`, `client_id`, and `client_secret` to the **Logout URL**. It sends the request in the background and only logs a failure. Clear **Logout URL** if the identity provider doesn't accept this request.

## Verify the result

1. Add the provider to an application. See [Add providers to an application](/docs/application/providers).
1. Open the sign-in page of the application and click the button of the provider.
1. Sign in at the identity provider. Casdoor signs you in, or creates a user if the application allows sign-up.

## Troubleshooting

| Error | Cause |
|---|---|
| `the OIDC discovery from: <url> doesn't contain the required endpoints` | The document has no `authorization_endpoint` or `token_endpoint`. Check the issuer URL |
| `cannot find id in user from custom provider` | **ID** in **User mapping** is `id`. Set it to `sub` |
| `id_token not found in token response` | The **Scope** has no `openid`, or the provider doesn't return an ID token |
| `id_token iss: <iss> doesn't match the issuer: <issuer>` | The **Issuer URL** differs from the `iss` claim. Use the exact value of `issuer` in the discovery document |
| `id_token aud doesn't contain the client ID` | The ID token was issued for another client. Check the **Client ID** |

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [Add a custom OAuth provider](/docs/provider/oauth/CustomProvider)
- [Map OAuth claims to user fields](/docs/provider/oauth/user-mapping)
