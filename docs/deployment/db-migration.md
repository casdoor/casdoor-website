---
title: DB Migration
description: Handle DB Migration in Casdoor
keywords: [deployment, Database, Migration]
author: forestmgy
---

When the database is upgraded, it is easy to have a data crash, for example, we need to delete an old field.  Fortunately, the [xorm](https://xorm.io/) used by Casdoor will help us with a lot of database migration problems. But we still need to handle some schema and data migrations ourselves, such as a **field name changed**

:::note

You can understand xorm Schema operation in [xorm docs](https://xorm.io/docs/chapter-03/readme/)

:::

## How it works

As mentioned above, when a field name changes, xorm will not be able to do anything, but xorm provides a [migrate](https://gitea.com/xorm/xorm/src/branch/master/migrate) package to help us solve this problem.

You can write code like this to handle field renaming:

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

What we want to achieve is: **rename `p_type` to `ptype`**. But since xorm **does not support field renaming**, we can only use a more complicated way: assign the value of `p_type` to `ptype`, and then delete the `p_type` field.

The `ID` field uniquely refers to the migration we performed. After the `m.Migrate()` runs, and the value of the `ID` will be added to the migrations table of the database.

When the project is started again, the database will check the existing `ID` field in the table and will not perform operations with the same `ID`