<p align="center">
<img src="./docs/icon.png" style="width:80%, height: 10px; margin: auto" />
</p>

![version 0.0.1](https://img.shields.io/badge/version-0.0.1-brightgreen)

## dostman [Work in Progress]

Maintain your API development, documentation and experimentation all within your codebase.

-   This project is still in development, feel free to contact me @egecavusoglu to collaborate. See [Project Plan](./docs/ProjectPlan.md) for to do items.

### Why dostman instead of Postman?

-   Remove the need of an external app.
-   Don't deal with Postman's business logic or plan restrictions.
-   Get formatted output of your API requests in JSON, use & distribute it anywhere you like.
-   Track your API documentation with your project's version management. No more outdated API docs!

## How to use

1. Create a file with .dostman extension file in following format

-   @desc: Description of your endpoint
-   @method: HTTP method of the request (GET | POST | PUT | DELETE)
-   @headers: Specify headers, seperated by commas `,` .
-   @body: Specify request body as JSON.

```
// sample.dostman

@desc This will get user's info

@method POST
@url https://api.github.com/users/egecavusoglu

@headers
content-type: application/json,
Authorization: Bearer my_token

@body
{
    "verbose": true
}
```

2. Dostman will execute your requests and give you API docs.

### `@config` your dostman file

Are you also tired of refreshing tokens for requests whenever you open your project after a while? Or want randomized variables? You can save your variables as functions to automate the process.

Dostman will evaluate your config as JavaScript and replace your variables with your exported values.

```
@config
const SERVER_URL = `https://jsonplaceholder.typicode.com/todos/1`;
const variable_as_func = () => 555;

exports = {SERVER_URL, variable_as_func};

###


@desc This will some data for my application.

@method GET
@url {{SERVER_URL}}

@headers
content-type: application/json
my-header: {{variable_as_func}}
@body
{
    "public": true
}

```
