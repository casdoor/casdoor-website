---
title: 概述
description: 在Casdoor添加webhooks
keywords:
  - webhook
authors:
  - Trydamere
---

## 概述

事件系统允许您构建集成，订阅 Casdoor 上的某些事件。 当其中一个事件被触发时，我们将向配置的 URL 发送一个以 json 为主体的 POST 请求。 应用程序解析 json 并执行 hook。 事件包括注册、登录、注销、更新用户，这些用户存储在记录的操作字段中。 事件系统可以用来更新用户的外部问题。
