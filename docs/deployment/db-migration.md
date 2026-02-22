---
title: Database migration
description: How Casdoor handles database schema and data migrations.
keywords: [deployment, database, migration, xorm]
authors: [forestmgy]
---

Casdoor uses [xorm](https://xorm.io/) for database access. Xorm handles many schema changes automatically, but **renaming columns** and some data migrations must be done manually via the [xorm migrate](https://pkg.go.dev/xorm.io/xorm/migrate) package.

:::note
See the [xorm documentation](https://xorm.io/docs/chapter-03/readme/) for schema operation details.
:::

## How it works

Xorm does not rename columns automatically. To rename a field (e.g. `p_type` → `ptype`), you add a migration that copies data and then drops the old column.

Example migration:

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

Here the goal is to rename `p_type` to `ptype`: copy values into `ptype`, then drop `p_type` (handled elsewhere). The migration **ID** is stored in the database; on subsequent starts, migrations with an existing ID are skipped.
