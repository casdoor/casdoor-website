---
title: "Hasura"
metaTitle: "Hasura | Hasura Authentication Tutorial"
metaDescription: "Learn how to integrate Casdoor with Hasura to secure your applications using JWT"
---

Before the integration, we need to deploy Casdoor locally.

Then we can quickly implement a Casdoor-based login page in our own app with the following steps.

## Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Add a redirect url: `http://CASDOOR_HOSTNAME/login` ![Casdoor Application Setting](/img/integration/Haskell/Hasura/cas.png)
3. Copy the client ID, we will need it in the following steps.

## Add user in Casdoor

Now you have the application, but not a user. That means you need to create a user and assign the role.

Go to the “Users” page and click on “Add user” in the top right corner. That opens a new page where you can add the new user.

![Pic showing the users page](/img/integration/Haskell/Hasura/user.png)

Save the user after adding a username and adding the organisation Hasura(other details are optional).

Now you need to set up a password for your user, which you can do by clicking manage your password.

Choose a password for your user and confirm it.

## Build Hasura App

Start the Hasura by docker or Hasura Cloud.

Now create a `users` table with the following columns:
* `id` of type Text (Primary Key)
* `username` of type Text

See the image below for reference.

![Picture showing how to create a table in Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/keycloak/hasura-create-table.png)

The next step is to create a `user` role for the app. Users should be able to see only their records, but not the other people’s records.

Configure the `user` role as shown in the image below. For more information, read about [configuring permission rules in Hasura](https://hasura.io/docs/latest/graphql/core/auth/authorization/permission-rules/).

![Picture showing how to set permissions in Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/keycloak/hasura-set-permissions.png)

This way, users cannot read other people’s records. They can only access theirs.

For testing purposes, add a dummy user. This is to ensure that when you use the JWT token, you only see your user’s details and not other users’ details.

![Picture showing how to add a table record in Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/keycloak/hasura-dummy-user.png)

Now you need to set the `JWT_SECRET` in Hasura.

## Configure Hasura with Casdoor

In this step, you need to add the **HASURA_GRAPHQL_JWT_SECRET** to Hasura.

To do so, go to the Hasura docker-compose.yaml and then add the new `HASURA_GRAPHQL_JWT_SECRET` as below.

The `HASURA_GRAPHQL_JWT_SECRET` should be in the following format:

```
HASURA_GRAPHQL_JWT_SECRET: '{"claims_map": {
      "x-hasura-allowed-roles": ["user","editor"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id": "userID"
    },"jwk_url":"https://door.casdoor.com/.well-known/jwks"}'
```

Save the change, and reload the docker.

![Add Clerk JWT URL to Hasura](/img/integration/Haskell/Hasura/JWT.png)

## Retrieve JWT Token

Since there is no client implementation, you can get your access token by making a request by below URL:
```
http://localhost:8000/login/oauth/authorize?client_id=<client ID>>&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin&scope=read&state=app-built-in<public certificate>>
```

Change the client ID to the ID you copied before, and input the public certificate of Cadoor which you can find in Casdoor/Certs.

Then input the username and password you create for Hasura before.

Click Sign in.

![Retrieve JWT Token](/img/integration/Haskell/Hasura/login.png)

Go back to Casdoor/Token page

![Token Page](/img/integration/Haskell/Hasura/tokens.png)

Find the Username you input before then click edit

Copy the Access Token.

![Access Token](/img/integration/Haskell/Hasura/access.png)

Now you can use the access token to make the authenticated request. Hasura returned the appropriate user rather than returning all the users from the database.

![Picture showing the access token from Keycloak being used in Hasura](/img/integration/Haskell/Hasura/hasura.png)