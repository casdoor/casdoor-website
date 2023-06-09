---
title: 生成 Swagger 文件
description: 生成 Swagger 文件
keywords:
  - bee
  - swagger
authors:
  - ComradeProgrammer
---

## 概述

我们知道，beego框架为生成交换文件提供支持，以便通过称为“bee”的命令行工具清除api。 Casdoor也以beego为基础。 但我们发现bee生成的swagger文件未能将api分类为“@Tag”标签， 我们修改了原bee以执行功能。


## 如何写comment
大多数规则与原bee comment格式完全相同， 唯一的差异是api必须按照"@Tag"标签分成不同的组别， 因此，开发者有义务确保正确添加此标签。 下面是一个示例：
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

具有相同"@Tag"标签的 api 将会被放入同一个组。

## 如何生成swagger文件
0. 以正确的格式写入 api
1. 获取资源库 <https://github.com/casbin/bee>
2. 构建修改过的bee，例如在casbin/bee的根目录中运行
```shell
buid -o mybee
```
3. 复制mybe到casdoor的基础目录
3. 在该目录中运行
```
mybee generate docs
```
之后你会发现生成新的swagger文件。

