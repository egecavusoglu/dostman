<p align="center">
<img src="https://pasteboard.co/KbdmI3m.png" style="width:80%, height: 10px; margin: auto" />
</p>

<img alt="npm version" src="https://img.shields.io/npm/v/dostman.svg?"></a>
[![Publish to NPM](https://github.com/egecavusoglu/dostman/actions/workflows/main.yml/badge.svg)](https://github.com/egecavusoglu/dostman/actions/workflows/main.yml)
<img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/dostman.svg"></a>

## dostman

Maintain your API development, documentation and experimentation all within your codebase.

-   This project is a new release! Feel free to contact me @egecavusoglu to collaborate or see [Project Plan](./docs/ProjectPlan.md) for to do items. Pull requests welcome!

### Why dostman instead of Postman?

-   Remove the need of an external app.
-   Don't deal with Postman's business logic or plan restrictions.
-   Get formatted output of your API requests in JSON, use & distribute it anywhere you like.
-   Track your API documentation with your project's version management. No more outdated API docs!

## How to use

1. Create a file with .dostman extension file in following format. Find a more detailed how to use guide at [sample usage](./docs/SampleUsage.md).

-   @desc: Description of your endpoint
-   @method: HTTP method of the request (GET | POST | PUT | DELETE)
-   @headers: Specify headers, seperated by commas `,` .
-   @body: Specify request body as JSON.

To see example .dostman files visit [sample-requests](./sample-requests).

2. Dostman will find all files ending with .dostman extension, execute your requests and give you API docs.

### Configure your dostman file with `@config`

Are you also tired of refreshing tokens for requests whenever you open your project after a while? Or want randomized variables? You can save your variables as functions to automate the process.

Dostman will evaluate your config as JavaScript and replace your variables with your exported values.

```
@config
const SERVER_URL = `https://jsonplaceholder.typicode.com/todos/1`;
const variable_as_func = () => 555;

exports = {SERVER_URL, variable_as_func};

###
```
