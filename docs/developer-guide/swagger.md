---
title: Generate Swagger files
sidebar_label: Generating Swagger docs
description: Regenerate the Swagger (OpenAPI) files of the Casdoor API with the modified bee tool after you add or change an API.
keywords: [bee, swagger, API docs]
authors: [ComradeProgrammer]
---

This guide explains how to regenerate the Swagger files of the Casdoor API after you add or change an API handler.

---

#### Learning outcomes

- Annotate an API handler so that it appears in the Swagger files.
- Build the modified bee tool.
- Generate the Swagger files for all APIs or for selected ones.

#### What you need

- A clone of the [Casdoor repository](https://github.com/casdoor/casdoor) and the Go toolchain

---

## About Swagger in Casdoor

Casdoor is built on the Beego framework, whose `bee` command-line tool generates Swagger files from comments in the code. The standard `bee` doesn't group APIs. Casdoor uses a [modified bee](https://github.com/casbin/bee) that reads an additional `@Tag` annotation and groups the APIs with the same tag.

:::note
Casdoor serves the Swagger UI at `/swagger` only when `runmode = dev` is set in `conf/app.conf`. It isn't available in production mode.
:::

## Annotate the API handler {#comment-format}

Write the comments in the standard format of bee, and add `@Tag`:

```go
// @Title Login
// @Tag Login API
// @Description login
// @Param   oAuthParams     query    string  true        "oAuth parameters"
// @Param   body    body   RequestForm  true        "Login information"
// @Success 200 {object} controllers.api_controller.Response The Response object
// @router /login [post]
func (c *ApiController) Login() {
```

APIs with the same `@Tag` appear in the same group.

## Generate the files {#generate-swagger-files}

1. Clone the [modified bee](https://github.com/casbin/bee).
1. Build it in the root of its repository:

   ```shell
   go build -o mybee .
   ```

1. Copy `mybee` to the root of the Casdoor repository.
1. In the root of the Casdoor repository, generate the files:

   ```bash
   mybee generate docs
   ```

To generate the files for selected tags or APIs only, name them. Separate several names with a comma.

```bash
mybee generate docs --tags "Adapter API"
mybee generate docs --tags "Adapter API,Login API"
mybee generate docs --apis "add-adapter"
mybee generate docs --apis "add-adapter,delete-adapter"
```

The generated files are in the `swagger` directory of the Casdoor repository.

## See also

- [Call the Casdoor API](/docs/basic/public-api)
- [Contributing](/docs/contributing)
