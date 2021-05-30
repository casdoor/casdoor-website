---
sidebar_position: 1
title: Install And Run
---

## Installation

You can use `go get`

```shell
go get github.com/casbin/casdoor
```

or use `git clone`

```shell
git clone https://github.com/casbin/casdoor
```

Then enter the folder:

```shell
cd casdoor
```

## Config

All configures are placed in `conf/app.conf`. You can modify the file to set configures.

- Setup database (MySQL):

  Casdoor will store its users, nodes and topics informations in a MySQL database named: `casdoor`, will create it if not existed. The DB connection string can be specified at: https://github.com/casbin/casdoor/blob/master/conf/app.conf

    ```ini
  db = mysql
  dataSourceName = root:123@tcp(localhost:3306)/
  dbName = casdoor
    ```

- Setup database (Postgres):

  Since we must choose a database when opening Postgres with xorm, you should prepare a database manually before running Casdoor. 

  Let's assume that you have already prepared a database called `casdoor`, then you should specify `app.conf` like this:
  
  ``` ini
  db = postgres
  dataSourceName = "user=postgres password=xxx sslmode=disable dbname="
dbName = casdoor
  ```

  **Please notice:** You can add Postgres parameters in `dataSourceName`, but please make sure that `dataSourceName` ends with `dbname=`. Or database adapter may crash when you launch Casdoor.
  
  Casdoor uses XORM to connect to DB, so all DBs supported by XORM can also be used.

- Github corner

  We added a Github icon in the upper right corner, linking to your Github repository address.
  You could set `ShowGithubCorner` to hidden it.

  Configuration:

    ```javascript
  export const ShowGithubCorner = true

  export const GithubRepo = "https://github.com/casbin/casdoor" //your github repository
    ```

- OSS conf

  We use an OSS to store and provide user avatars. You must modify the file `conf/oss.conf` to tell the backend your OSS info. For OSS providers, we support Aliyun(`[aliyun]`), awss3(`[s3]`) now.

  ```
  [provider]
  accessId = id
  accessKey = key
  bucket = bucket
  endpoint = endpoint
  ```

  Please fill out this conf correctly, or the avatar server won't work!

## Run (Development Mode)

If you want to modify the code to adapt your situation, you can run Casdoor in dev mode.

- Run backend (in port 8000)

```shell
go run main.go
```

- Run frontend (in port 7001 of the same machine)

```shell
cd web

## npm
npm install
npm run start

## yarn
yarn install
yarn run start
```

Then open http://localhost:7001

- Please note that you can't use `127.0.0.1` instead of `localhost` to access Casdoor in dev mode. Only `localhost` will be recognized as dev mode by frontend. Reason here: [casdoor/Setting.js at master · casbin/casdoor (github.com)](https://github.com/casbin/casdoor/blob/master/web/src/Setting.js#L26)

## Run (Production Environment)

- build static pages for frontend

```shell
cd web

## npm
npm install
npm run build

## yarn
yarn install
yarn run build
```

- build and run backend

```shell
go build
./casdoor
```

Now, Casdoor is running on port 8000. You can access Casdoor pages directly in your browser, or you can setup a reverse proxy to hold your domain name, SSL, etc.