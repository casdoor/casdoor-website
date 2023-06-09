---
title: 注册项目表
description: 配置注册项表以创建自定义注册页面
keywords:
  - 注册
  - 项目
  - 表格
authors:
  - Resulte
---

在应用程序配置页面上，我们可以配置注册项表来创建一个自定义注册页面。 我们可以在此注册项表上添加或删除任何注册项。

![注册项目表](/img/application/signup-items-tabel/signup-items-table.png)

关于每个注册项的详细说明，请见下表。

|    参数    |       可选值        | 描述                                |
|:--------:|:----------------:| --------------------------------- |
|   Name   |        -         | 注册项名称                             |
| visible  | `True` / `False` | 选择此注册项是否在注册页面上可见                  |
| required | `True` / `False` | 选择此注册项是否必须要填写                     |
| prompted | `True` / `False` | 选择当用户忘记填写此注册项时是否给出提示              |
|   rule   |   `Rule Items`   | 规则。 规则可以为这个注册项添加一些自定义要求。 详细规则见下表。 |
|  Action  |        -         | 用户可以将这个注册项向上移动、向下移动，或删除这个注册项。     |

So far, the signup items that support configuration rules include `ID`, `Display name`, `Email` and `Agreement`.

|      规则      |                    可选规则                    | 描述                                                                                                                                                                                                                                                                                                                             |
|:------------:|:------------------------------------------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|      ID      |          `Random` / `Incremental`          | 选择用户ID是随机生成还是递增生成。                                                                                                                                                                                                                                                                                                             |
| Display name |    `None`/ `Real name` / `First, last`     | 选择名称的展示方式。 选择 `None` 将展示 `Display name`， 选择 `Real name` 将展示 `Real name`， 选择 `First，last` 将展示 `First name` 和 `last name`。                                                                                                                                                                                                       |
|    Email     |        `Normal`/ `No verification`         | 选择是否验证邮箱验证码。 选择 `普通` 将验证邮箱验证码。 选择 `No verification` 则不验证邮箱验证码。                                                                                                                                                                                                                                                                 |
|  Agreement   | `None`/ `Signin` / `Signin (Default True)` | Select whether the user needs to confirm terms of use when logging in. Choose `None` to not display terms of use, and users can log in directly. Choose `Signin` to require users to confirm the terms before logging in. Choose `Signin (Default True)` to set the terms confirmed by default, and users can log in directly. |

:::note

例如，我想设置需要注册邮箱的注册页面，但不需要邮件验证码来验证此邮箱。

:::

首先，我添加了一些注册所需的注册项目，例如ID、用户名、密码、电子邮件。

![注册项目表](/img/application/signup-items-tabel/signup-items-table-demo-config.png)

然后设置电子邮件的验证规则为 `No verification`， 然后生成的注册页面就可以实现该效果。

![注册项目表](/img/application/signup-items-tabel/signup-items-table-demo-page.png)
