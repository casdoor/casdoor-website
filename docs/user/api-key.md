---
title: Api Key
description: Access api with api key
keywords: [user, api key, accessKey, accessSecret]
authors: [DacongDA]
---

## Access api with api key

You can access casdoor api with accessKey and accessSecret of user. 

1. Create a pair of accessKey and accessSecret in account setting page.
2. Put accessKey and accessSercet in into the http query param.

## Example

![User Api Key](/img/user/user_api_key.png)

```bash
curl --location 'http://door.casdoor.com/api/user?accessKey=b86db9dc-6bd7-4997-935c-af480dd2c796&accessSecret=79911517-fc36-4093-b115-65a9741f6b14'
```
