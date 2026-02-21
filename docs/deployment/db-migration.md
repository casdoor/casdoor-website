---
title: Database Migration
description: Handling DB Migration in Casdoor
keywords: [deployment, Database, Migration]
authors: [forestmgy]
---

When upgrading the database, there is a risk of data loss, such as when deleting an old field. Luckily, Casdoor utilizes [xorm](https://xorm.io/), which assists with many database migration problems. However, some schema and data migrations must still be handled manually, such as when a field name is changed.

:::note

Refer to the [xorm docs](https://xorm.io/docs/chapter-03/readme/) for a better understanding of xorm's schema operations.

:::

## How it Works

As mentioned earlier, xorm is unable to handle field name changes. To address this, xorm provides a [migrate](https://pkg.go.dev/xorm.io/xorm/migrate) package that can assist with this problem.

To handle field renaming, you can write code like this:

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

Our objective is to **rename `p_type` to `ptype`**. However, since xorm **does not support field renaming**, we must resort to a more intricate approach: assigning the value of `p_type` to `ptype`, and subsequently deleting the `p_type` field.

The `ID` field uniquely identifies the migration being performed. After `m.Migrate()` runs, the value of `ID` will be added to the migrations table of the database.

Upon starting the project again, the database will check for any existing `ID` field in the table and refrain from performing any operations associated with the same `ID`.
