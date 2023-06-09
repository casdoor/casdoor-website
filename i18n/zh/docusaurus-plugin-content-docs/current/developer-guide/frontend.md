---
title: 前端
description: Casdoor 前端发展指南
keywords:
  - 前端
  - 指南
authors:
  - hsluoyz
---

Casdoor的前端源代码在 `/web` 文件夹内：https://github.com/casdoor/casdoor/tree/master/web

这是一个 [**Create-React-App (CRA)**](https://create-react-app.dev/) 项目，其经典的 CRA 文件夹结构如下：

| 文件/目录           | 描述                              |
| --------------- | ------------------------------- |
| public          | React的 HTML 根文件                 |
| src             | 源代码                             |
| craco.config.js | Craco 配置文件可以在此更改主题颜色 (默认情况下为蓝色) |
| crowdin.yml     | Crowdin i18n 配置文件               |
| package.json    | NPM/Yarn 依赖文件                   |
| yarn.lock       | Yarn lockfile                   |

在 `/src`中，有以下几个重要文件或文件夹：

| 文件/目录                   | 描述                                                                        |
| ----------------------- | ------------------------------------------------------------------------- |
| account                 | 已登录用户的“个人资料”页面                                                            |
| auth                    | 所有与身份验证相关的代码，如OAutth、SAML、注册页面、登录页面、忘记密码页等。                               |
| backend                 | 调用 Go 后端 API 的 SDK 包含所有 `fetch()` 调用                                      |
| basic                   | Casdoor的主页(控制面板页面) 包含几个卡片小部件                                              |
| common                  | 共享界面小部件                                                                   |
| locales                 | JSON中的i18n 翻译文件与我们的 Crowdin 项目同步：https://crowdin.com/project/casdoor-site |
| App.js                  | 导入JS文件，包含所有路由                                                             |
| Setting.js              | 其他代码使用的实用函数                                                               |
| OrganizationListPage.js | 组织列表的页面，类似于所有其他“XXXListPage.js” 格式的页面                                     |
| OrganizationEditPage.js | 组织编辑的页面，类似于所有其他“XXXEditePage.js” 格式的页面                                    |
