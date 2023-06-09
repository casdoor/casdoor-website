---
title: Casdoor公共API
description: Casdoor公共API
keywords:
  - Casdoor公共API
authors:
  - hsluoyz
---

Casdoor采用前后端分离的模式开发（与JSP或PHP不同）。 只有通过 RESTful API才能显示其功能。 React前端代码通过调用RESTful API来渲染Web UI并执行操作。 这个RESTful API接口被称为 `Casdoor Public API`。 这个API被用在以下几个地方：

- Casdoor前端页面
- Casdoor Client SDK
- 应用方自定义的任何代码

`Casdoor Public API`的完整参考文档可以在 [**https://door.casdoor.com/swagger**](https://door.casdoor.com/swagger) 中查看。 这个Swagger文档是由Beego的Bee工具自动生成的。
