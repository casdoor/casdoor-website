---
title: Generating Swagger docs
description: Generate Swagger/OpenAPI docs for Casdoor APIs using the modified bee tool.
keywords: [bee, swagger, API docs]
authors: [ComradeProgrammer]
---

Casdoor is built on **beego**, which uses the **bee** CLI to generate Swagger files. The default bee does not group APIs by tag; Casdoor uses a [modified bee](https://github.com/casbin/bee) that supports the `@Tag` label so APIs are grouped in the generated docs.

## Comment format

Use the same comment style as standard bee; the only extra requirement is **@Tag** so APIs are grouped. Example:

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

APIs with the same `@Tag` appear in the same group in the Swagger output.

## Generate Swagger files

1. Add comments in the format above (including `@Tag`) to your API handlers.
2. Clone the modified bee: [https://github.com/casbin/bee](https://github.com/casbin/bee).
3. Build bee in the repo root:

   ```shell
   go build -o mybee .
   ```

4. Copy `mybee` into the Casdoor project root.
5. From the Casdoor root, run:

   ```bash
   mybee generate docs
   ```

6. (Optional) Generate docs for specific tags or APIs:

   ```bash
   mybee generate docs --tags "Adapter API"
   mybee generate docs --tags "Adapter API,Login API"
   mybee generate docs --apis "add-adapter"
   mybee generate docs --apis "add-adapter,delete-adapter"
   ```

   Use a comma `,` only when listing multiple tags or APIs.

Generated Swagger files will appear in the Casdoor project.
