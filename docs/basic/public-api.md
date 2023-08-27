---
title: Casdoor Public API
description: Casdoor Public API
keywords: [Casdoor Public API]
authors: [hsluoyz]
---

Casdoor is developed using a frontend and backend separated approach, as opposed to JSP or PHP. The Go backend exposes its functionalities solely through a RESTful API. The React frontend code consumes this API to render the web UI and perform various actions. This RESTful API is referred to as the `Casdoor Public API`. The API can be utilized by the following:

- Casdoor's frontend
- Casdoor client SDKs
- Any other customized code from the application side

The full reference for the `Casdoor Public API` can be found on Swagger: [**https://door.casdoor.com/swagger**](https://door.casdoor.com/swagger). These Swagger docs are automatically generated using Beego's Bee tool.
