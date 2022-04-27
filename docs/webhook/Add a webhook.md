## Creating a new webhook

In order to create a webhook in casdoor,Login to your account here https://door.casdoor.com <br />


After  Logging In, Click on the 3 dots on the navigation bar. In the dropdown that appears, select `webhooks`. 
That action leads you to the page containing the list of all webhooks in Casdoor.
As shown below

![](/img/webhooks-and-dropdown.png)



1) Click the `Add` Button to add a new webhook to Casdoor <br />
2) The next page contains required information for the creation of a webhook.

- `Organization` : the organization that the webhook will import
- `Name` : the name of the webhook
- `URL` : the Unique URL where the event in the webhook is triggered
- `Method` : the HTTP method to be used to trigger an event in the webhook
- `Content type` : the Content of the file which is transferred via HTTP
- `Headers` : the header is a custom header that gives the application an option to authenticate the webhook requests
- `Events` : the Events are actions that trigger the platform. They are sent via HTTP requests
- `Is user extended` : Whether a user is extended. It tells if the webhook extends a user from the list of user and the information about that specific user
- `Is enabled` : whether to webhook is enabled

Turn the Is enabled button on and save, for the webhook to work



