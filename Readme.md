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

2. Execute dostman to get your API docs.
