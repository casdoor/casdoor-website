---
title: Permission Configuration
description: Using exposed Casbin APIs to manage users' access rights in an organization
keywords: [permissions, Casbin]
authors: [MagicalSheep]
---
### Each Item in the Permission Configuration Page


- `Organization`: The name of the organization to which the policy belongs. An organization can have multiple permission policy files.
- `Name`: The globally unique name of the permission policy in the organization. It is used to identify the policy file.
- `Display name`: Not important.
- `Model`: The name of the model file that describes the structure and matching patterns of the permission policy.
- `Adapter`:
  
   **Attention!** In the current version, this field describes the name of the database table that stores the permission policy, rather than the name of the adapter configured in the Adapter menu item in the Casdoor Web UI. Casdoor uses its own database to store configured permission policies. If this field is empty, the permission policy will be stored in the `permission_rule` table. Otherwise, it will be stored in the specified database table. If the specified table name does not exist in the database used by Casdoor, it will be created automatically. We strongly recommend **specifying different adapters for different models**, as keeping all policies in the same table may cause conflicts.
- `Sub users`: Which users will the permission policy be applied to.
- `Sub roles`:

  If the RBAC model is used, which roles will be applied to the permission policy. This will add permission policies such as `g user role` for every user in this role.
- `Sub domains`: Which domains will the permission policy be applied to.
- `Resource type`:

   In the current version, Casdoor does not use this field for external applications that want to authenticate. You can ignore it for now.
- `Resources`:

  This field describes the resources for which you wish to enforce permission control. Note, however, that the resources here are not those configured in the Resources menu item of the Casdoor Web UI. You can add any string you want here, such as a URL or a filename.
- `Actions`:

   This field describes the actions to operate on resources. Similar to resources, it can be any string you want, such as an HTTP method or other natural language. But please note that Casdoor will convert all these strings to lowercase before storing. Additionally, Casdoor will apply all actions to each resource. You cannot specify that an action only takes effect on certain resources.
- `Effect`:

  This option takes effect for Casdoor itself to control application access. If you want an external application to enforce permission controls using the interface Casdoor exposes, it won't do anything. You should describe the effect of pattern matching in the Model file.

## How to Configure and Use

 ### Where to Find
   ![edit_organization](/img/permission/permission-configuration/editorganization.gif)
  
  ### Add
   ![add1](/img/permission/permission-configuration/add.png)
   
   ![add2](/img/permission/permission-configuration/add.png)
   
   ![add3](/img/permission/permission-configuration/add.png)

   Or you can import permissions from xlsx file.

  ### Edit
   ![edit](/img/permission/permission-configuration/edit.gif)

  ### Delete 
   ![delete](/img/permission/permission-configuration/delete.gif)


As you can see, this configuration page is almost tailor-made for the `(sub, obj, act)` model.


