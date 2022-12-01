---
title: Permission Configuration
description: Using exposed Casbin APIs to manage users' access rights in organization
keywords: [permission, Casbin]
authors: [MagicalSheep]
---

Let's explain each item in the Permission configuration page in turn. 

- `Organization`: The name of the organization to which the policy belongs. An organization can have multiple permission policy files. 
- `Name`: The permission policy name, which is globally unique in the organization. Used to identify the permissions policy file. 
- `Display name`: Nothing important. 
- `Model`: The name of the model file describing the permission policy structure and its matching patterns. 
- `Adapter`: Attention! In the current version, this field describes the name of the database table that stores the permission policy, rather than the name of the adapter configured in the Adapter menu item in the Casdoor Web UI. Casdoor uses its own database to store permission policies being configured. If this field is empty, the permission policy will be stored in the `permission_rule` table, otherwise it will be stored in the specified database table. If the specified table name does not exist in the database used by Casdoor, it will be created automatically. We strongly recommend **specifying different adapters for different models**, as keeping all policies in the same table may cause conflicts. 
- `Sub users`: Which users will be applied to this permission policy. 
- `Sub roles`: If the RBAC model is used, which roles will be applied to the permission policy. This will add permission policies such as `g user role` for every user in this role. 
- `Sub domains`: Which domains will be applied to this permission policy. 
- `Resource type`: In fact, in the current version, Casdoor does not use this field for external applications that want to authenticate. You can ignore it for now. 
- `Resources`: This field describes the resources for which you wish to enforce permission control. Note, however, that the resources here are not those configured in the Resources menu item of the Casdoor Web UI. You can add any string you want here, such as a URL or a filename. 
- `Actions`: This field describes actions to operate resources. Same as resource, it can be any string you want, such as Http Method or other natural language. But please note that Casdoor will convert all these strings to lowercase before storing. Additionally, Casdoor will apply all actions to each resource. You cannot specify that an action only take effect on certain resources. 
- `Effect`: This option takes effect for Casdoor itself to control application access. If you want an external application to enforce permission controls using the interface Casdoor exposes, it won't do anything. You should describe the effect of pattern matching in the Model file. 

As you can see, this configuration page is almost tailor-made for the `(sub, obj, act)` model. 