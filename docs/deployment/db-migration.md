---
title: Database migration
description: How Casdoor changes its database schema between versions, and when a manual migration is needed.
keywords: [deployment, database, migration, xorm]
authors: [forestmgy]
---

Casdoor updates its database schema on its own when it starts. This page explains how that works and how Casdoor developers add a migration for a change that can't be automated.

## Automatic schema updates

Casdoor accesses the database through [XORM](https://xorm.io/). At startup, XORM compares the tables with the Go structs and adds missing tables and columns. For the details, see the [XORM documentation on schema operations](https://xorm.io/docs/chapter-03/readme/).

XORM doesn't rename columns and doesn't transform existing data. Those changes need a migration.

## Migrations

A migration is a function that runs once against the database. Casdoor writes migrations with the [XORM migrate](https://pkg.go.dev/xorm.io/xorm/migrate) package.

The following migration is part of renaming the column `p_type` to `ptype`. XORM adds the new column `ptype`, and the migration fills it. Another step removes the old column.

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

Each migration has an `ID`. Casdoor stores the IDs of the migrations that it has run in the database and skips them on later starts.

## See also

- [Upgrade from v3 to v4](/docs/deployment/upgrade-v3-to-v4)
- [Install the Casdoor server](/docs/basic/server-installation)
