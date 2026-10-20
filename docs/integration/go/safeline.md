---
title: SafeLine WAF
description: Sign users in to the applications that SafeLine (雷池) protects, and administrators in to the SafeLine console, with Casdoor over OpenID Connect.
keywords: [SafeLine, 雷池, WAF, Chaitin, OpenID Connect, OIDC, SSO]
authors: [casdoor]
---

[SafeLine](https://github.com/chaitin/SafeLine) (雷池) by Chaitin is a self-hosted web application firewall (WAF). It can sign users in through an OpenID Connect (OIDC) provider in two places:

- **身份认证** (identity authentication) puts a sign-in page in front of the applications that SafeLine protects. It supports OIDC since SafeLine 8.6.0, in every edition.
- **控制台登录方式** (console sign-in method) signs administrators in to the SafeLine console. It supports OIDC since SafeLine 9.0.0, and only with a commercial license (商业版).

The two are configured separately, and each needs its own redirect URL in Casdoor. The SafeLine console is in Chinese, so this page shows its labels in Chinese with a translation.

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the callback of SafeLine to **Redirect URLs**, for every domain of a protected application that uses the sign-in, and for the domain of the unified sign-in portal (统一认证) if you use it:

   ```text
   https://app.example.com/.safeline/auth/api/callback/oidc
   ```

1. Save, and note the **Client ID** and **Client secret**.

## Sign in to protected applications

1. In the SafeLine console, go to **身份认证** (identity authentication) > **配置** (configuration) > **登录配置** (sign-in configuration), and open the OIDC entry of **第三方登录配置** (third-party sign-in).
1. Fill in the settings:

   | Setting | Value |
   |---|---|
   | **OIDC 服务器 URL** (OIDC server URL) | `https://door.example.com` |
   | **Client ID** | `<your-client-id>` |
   | **Client Secret** | `<your-client-secret>` |
   | **标题名称** (title) | `Casdoor`, or keep the default |

   - **OIDC 服务器 URL**: The URL of Casdoor. SafeLine appends `.well-known/openid-configuration` to it to find the endpoints.
   - `<your-client-id>`, `<your-client-secret>`: The values from the Casdoor application.
   - **自动关联账号** (link accounts automatically): Optional. Links the Casdoor user to an existing SafeLine user with the same email address or phone number.

1. Save, and in the settings of each protected application, turn on OIDC in its **登录方式** (sign-in methods) of **身份认证**.

A user who signs in for the first time waits for an administrator to approve them in **身份认证** > **用户管理** (user management), unless the application lets users in right after they sign in (**认证后直接访问**).

## Sign in to the SafeLine console

This needs SafeLine 9.0.0 or later with a commercial license.

1. In the SafeLine console, go to **通用设置** (general settings) > **控制台管理** (console management) > **控制台用户管理** (console users) > **登录方式** (sign-in method), and choose OIDC. Older versions have this under **系统设置** (system settings) > **控制台用户管理**.
1. Copy the **应用回调地址** (application callback URL) that the page shows, and add it to **Redirect URLs** of the Casdoor application. To use **测试登录** (test sign-in), also add the same URL with `/test` appended.
1. Fill in **OIDC 服务器 URL** (`https://door.example.com`), **Client ID**, and **Client Secret**.
1. Add rows to **用户角色映射关系** (role mapping) to give Casdoor users a console role:

   | Column | Value |
   |---|---|
   | **角色所属 Scope** (scope of the role) | `profile` |
   | **用户角色参数** (claim) | `groups` |
   | **参数值** (value) | The name of a Casdoor group, for example `waf-admins` |
   | **控制台角色** (console role) | **超级管理**, **配置管理**, or **系统管理** (super, configuration, or system administrator) |

   Casdoor sends the user's groups in the `groups` claim. In the Casdoor application, on the **OIDC/OAuth** tab, set **Token group format** to `Name (group)`, so the value is `waf-admins` instead of `my-org/waf-admins`.

1. Click **测试登录** and sign in to Casdoor with a user of a mapped group.
1. Click **确定** (OK).

:::caution
When you submit the OIDC configuration, SafeLine deletes the existing console accounts and signs you out. From then on, administrators sign in to the console only through Casdoor. Test the sign-in first.
:::

## Verify the result

1. Open a protected application in a private browser window. SafeLine shows its sign-in page with the OIDC button.
1. Click it and sign in to Casdoor. SafeLine lets the user through, or after the first sign-in, waits for an administrator to approve the user.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | Add the URL from the error to **Redirect URLs**. Each protected domain, the unified sign-in portal, and the console have their own callback. |
| The **Client Secret** is empty after saving | A bug of SafeLine before 9.3.11. Upgrade SafeLine. |
| The unified sign-in portal (统一认证) shows `未知错误: Cannot read properties of null (reading 'auth_url')` when you switch to OIDC | An open SafeLine issue, [chaitin/SafeLine#1273](https://github.com/chaitin/SafeLine/issues/1273). Casdoor's discovery document isn't the cause: it loads correctly in the same setup. |
| An unknown error appears after the user returns from Casdoor, and reloading the page signs the user in | An open SafeLine issue, [chaitin/SafeLine#1244](https://github.com/chaitin/SafeLine/issues/1244). |
| No console role is assigned | The value in **参数值** differs from the group in the token. Check **Token group format** and the user's groups in Casdoor. |

## See also

- [身份认证 - OIDC](https://help.waf-ce.chaitin.cn/node/01973fc6-e0ea-7c45-8412-9a6ab6c70d62) in the SafeLine documentation
- [控制台登录方式 - OIDC](https://help.waf-ce.chaitin.cn/node/0197cef6-fad7-7256-8edc-ac6406f2cf54) in the SafeLine documentation
- [Token overview](/docs/token/overview)
