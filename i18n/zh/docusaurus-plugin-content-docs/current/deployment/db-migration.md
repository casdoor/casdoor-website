---
title: 数据库迁移
description: 处理Casdoor中的 数据库迁移
keywords:
  - 部署
  - 数据库
  - 迁移
authors:
  - forestmgy
---

当数据库升级时，数据很可能崩溃，我们需要删除旧字段。  幸运的是，Casdoor 使用的 [xorm](https://xorm.io/) 能帮助我们处理许多有关数据库迁移的问题。 但我们仍需自行处理一些模式和数据迁移，例如 **字段名称发生更改时**。

:::note

有关Schema 操作的信息，您可以参阅[xorm docs](https://xorm.io/docs/chapter-03/readme/)

:::

## 工作原理

如上所述，当字段名称发生更改时，xorm将无法进行任何操作， 但是它提供了一个 [迁移](https://gitea.com/xorm/xorm/src/branch/master/migrate) 包来帮助我们解决这个问题。

你可以通过以下代码来处理字段重命名相关问题：

```go
migrations := []*migrate.Migration{
        {
            ID: "CasbinRule--fill ptype field with p",
            Migrate: func(tx *xorm.Engine) error {
                _, err := tx.Cols("ptype").Update(&xormadapter.CasbinRule{
                    Ptype: "p",
                })
                return err
            },
            Rollback: func(tx *xorm.Engine) error {
                return tx.DropTables(&xormadapter.CasbinRule{})
            },
        },
    }
    m.Migrate()
```

我们想要实现的目标是： **将 `p_type` 重命名为 `ptype`** 但既然xorm **不支持字段重命名**我们只能使用更复杂的方式：将 `p_type` 的值分配给 `ptype`然后删除 `p_type` 字段。

`ID` 字段特指我们进行的迁移。 `m.Migrate()` 运行后， `ID` 的值将被添加到数据库的迁移表。

当项目再次启动时 数据库将检查表中现有的 `ID` 字段，不会执行相同 `ID` 的操作。