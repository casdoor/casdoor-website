---
sidebar_position: 1
title: Overview
---

Casdoor is a UI-first centralized authentication / [Single-Sign-On (SSO)](https://en.wikipedia.org/wiki/Single_sign-on) platform based on OAuth 2.0 / OIDC.

Casdoor serves both the web UI and the login requests from the application users.

## Online demo

### Casdoor

Here is an online demo deployed by Casbin.

- [Casdoor official demo](https://door.casbin.com/)

Global admin login: 

- Username: `admin`
- Password: `123`

### Casbin-OA

Casbin-OA is one of Casbin web apps. It uses Casdoor as authentication.

- [Casbin-OA](https://oa.casbin.com)
- Source code: https://github.com/casbin/casbin-oa

## Architecture

Casdoor contains 2 parts:

Name | Description | Language | Source code
----|------|----|----
Frontend | Web frontend UI for Casdoor | JavaScript + React | https://github.com/casbin/casdoor/tree/master/web
Backend | RESTful API backend for Casdoor | Golang + Beego + SQL | https://github.com/casbin/casdoor