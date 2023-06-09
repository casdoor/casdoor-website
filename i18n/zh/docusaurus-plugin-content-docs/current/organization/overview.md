---
title: 概述
description: Casdoor的基本单位 —组织
keywords:
  - 组织
authors:
  - sh1luo
---

组织是Casdoor的基本单位，它管理用户和应用。 如果用户已登录过一个组织，那么此后他可以访问所有归属于该组织的应用，无需登录。

在 [应用程序](/docs/application/config) 和 [提供商](/docs/provider/overview)中， 选择一个组织很重要，它决定一个用户是否能够使用特定的提供商访问该应用程序。

我们还可以在Cassdoor建立LDAP。 欲了解更多详情，请参阅 [文档](/docs/ldap/overview)。

Casdoor提供了多种密码存储算法，可在组织编辑页面中选择。

|     名称      |                                          算法                                           | 描述                                                                                                                                                                        |                                                                          场景                                                                          |
|:-----------:|:-------------------------------------------------------------------------------------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------:|
|    plain    |                                           -                                           | 密码将以明文形式存储。 (默认)                                                                                                                                                          |                                                                          -                                                                           |
|    salt     |     [SHA256](https://github.com/casdoor/casdoor/blob/master/cred/sha256-salt.go)      | [SHA-256](https://www.n-able.com/blog/sha-256-encryption) 是一个获得专利的加密哈希函数，输出256位长的值。                                                                                       |                                                                          -                                                                           |
|  md5-salt   |      [MD5](https://github.com/casdoor/casdoor/blob/master/cred/md5-user-salt.go)      | [MD5 message-digest algorithm](https://en.wikipedia.org/wiki/MD5)是一种加密中断但仍广泛使用的哈希函数，可产生128位哈希值。                                                                           |                                                          [Discuz!](https://www.discuz.net/)                                                          |
|   bcrypt    |        [bcrypt](https://github.com/casdoor/casdoor/blob/master/cred/bcrypt.go)        | [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) 是一个密码哈希函数，用于安全地对密码进行哈希和加密。                                                                                                 | [Spring Boot](https://spring.io/projects/spring-boot), [WordPress](https://stackoverflow.com/questions/1045988/what-type-of-hash-does-wordpress-use) |
| pbkdf2-salt | [SHA256 和 PBKDF2](https://github.com/casdoor/casdoor/blob/master/cred/pbkdf2-salt.go) | [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) 是一个简单的加密密钥函数，能够抗拒 dictionary attacks 和 rainbow table attacks。 它最初在 Casdoor 里用于Keycloak 语法。  如果您通过Keycloak 同步方式导入用户，请选择此选项。 |                                                           [Keycloak](http://keycloak.org/)                                                           |


:::tip

Besides logging into Casdoor via an application (which redirects to Casdoor for SSO), a Casdoor user can also choose to directly log into Casdoor via the organization's login page: `/login/<organization_name>`, e.g., https://door.casdoor.com/login/casbin in the demo site.

:::
