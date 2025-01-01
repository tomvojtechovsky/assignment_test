# Web Developer Challenge

Your task is to create login page, data visualisation page for frontend application and design and implement GraphQL endpoint in the backend for frontend application to display data.

## Backend part

Consider the requirements below:

- The front-end application will display data messages (dataflow, syslog) in a table. Each row of the table corresponds to a single message. Following information should be displayed:
    - Timestamp
    - Probe IP
    - Probe Name
    - Content
    - Threat
    - Data Type
    - Attack Type
- The system will store information about thousands of messages. It is not feasible to present all of them on a single page. Always display at most 500 newest messages.
- The frontend application should support single filtering based on data type
- We don't want to put our application in risk, so data should be displayed only to logged-in users.
- Implement mutation for logging user in. Login function is prepared, so you should implement only login logic into
  this function.


We did our best to make the assignment as smooth as possible. We hope you find this helpful.

- The sample project is implemented in `Python 3.11` using Fast API framework together with Strawberry.
- Database entities are implemented using Beanie ODM library. There is no need to change them.
- The project contains a `docker-compose` file, that will spawn a Docker container with MongoDB database.
- The database collections will be created and filled with sample data during the start of backend application.
- Test user is also created with username admin and password admin, so there is no need to create any new user.
- GraphQL API is implemented using the Strawberry library. We implemented the integration with Beanie and provide a working example of GraphQL API for getting a list of users registered in the system. In similar way you can create query API for messages.

Once you start the backend application, navigate to page `http://localhost:8000/graphql` in a web browser. A website `Strawberry GraphiQL` should open.

To list users, please run the GraphQL query:
  ```
  query getUsers {
    users {
      getUsers {
        username
      }
    }
  }
  ```

Useful links:
- https://strawberry.rocks/docs
- https://strawberry.rocks/docs/general/queries
- https://strawberry.rocks/docs/general/mutations
- https://strawberry.rocks/docs/guides/authentication
- https://beanie-odm.dev/
- https://beanie-odm.dev/tutorial/finding-documents/
- https://beanie-odm.dev/tutorial/inheritance/


## User login
User login can be tricky, so we implemented password validation.

There are multiple approaches, how to keep user logged-in, so user is not asked for password on "every page-click".
One approach is using Bearer authentication, when some token or username and password is passed in header of every request.
Second approach (highly recommended for this task) is using cookies. Browsers stores their cookies by default,
so you don't have to put any information to headers on every request, also you don't need to store username
and password or token into browser's local/session storage (which is not that much secure).
Frontend is now set to send cookies by default back to backend, so your task is to put into backend response cookie some
login token, when user successfully logs in and check this token on every request.

NOTE:

We don't want you to implement communication over HTTPS, so token may be sent via HTTP.
User is already prepared in database with username admin and password admin (see `app.py` `init_db` function).

This might be useful for user login:

- https://jwt.io/introduction
- https://pyjwt.readthedocs.io/en/stable/
- https://strawberry.rocks/docs/integrations/asgi#setting-response-headers
- https://crashtest-security.com/enable-secure-cookies/


## Frontend task

Please consider the following requirements for the frontend application:

1. Login Page

   - When a user is not logged in, the application should display a login page.
   - The login page must include inputs for entering a username and password.

2. Dashboard for Logged-In Users

   - For logged-in users, the application should display a dashboard featuring:
     - A table containing the relevant data.
     - A clear visual representation of which data points have been classified as threats and their corresponding threat categories.
     - Graphs, statistics, ratios, or other visualization methods that provide the user with an instant understanding of the system's current state (e.g. display insights about detected threats, their frequency over a specific time interval, and the distribution of anomaly types.).
   - This section should be creatively designed, with an emphasis on attention to detail and a focus on providing an excellent UX and UI.

3. Filter Field
   - As specified in the backend task, there should be a filter option allowing users to refine the displayed data.
   - If no filter is applied, the application should display the 500 most recent messages by default.
   - The design and functionality of the filter field are up to you, but it should be intuitive and user-friendly.

Useful links:
- https://www.apollographql.com/docs/react/
- https://www.apollographql.com/docs/react/data/queries
- https://www.apollographql.com/docs/react/data/mutations

