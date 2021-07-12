---
sidebar_position: 1
title: Overview
---

Every application in Casdoor is called an `application`, and they are not related and do not affect each other, which means you can deploy or stop any application separately, as long as you like.

If you want to use Casdoor to provide login service for your web Web APPs, you can add them as Casdoor applications.

Users can access all applications in their organizations without login twice.

- `Owner` administrator of the organization that the APP belongs to
- `Name` The name of the created app
- `CreatedTime` The time when the application is created
- `DisplayName` The name which the application display to public
- `Logo` Application logos will display in login and sign up page
- `HomepageUrl` The url of the application homepage 
- `Description` Describe the application
- `Organization` The organization that the APP belongs to
- `EnablePassword` If users can login via password
- `EnableSignUp` If users can sign up. If not, accounts of the application
- `SignupItems` fields that need to be filled in when users register
- `Providers` Provide all kinds of service for the application (such as OAuth, Email, SMS service)
- `ClientId` OAuth client id
- `ClientSecret` OAuth client secret
- `RedirectUris` Casdoor will navigate to one of the uris if user logged in successfully
- `ExpireInHours` Login will expire after hours
- `SigninUrl`
- `SignupUrl` If you provide a sign up service independently out of Casdoor, please fill the url here
- `ForgetUrl` Same as `SignupUrl`
- `AffiliationUrl`

The application configuration is very flexible and simple. You can set whether to allow password login or third-party login, configure the third-party applications you want users to log in, and you can even customize the signup items of the application, etc. 

In this chapter you will learn how to start an application of your own, everything from scratch.

Let's explore together!

