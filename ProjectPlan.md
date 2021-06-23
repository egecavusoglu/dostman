# Project Plan

## Steps

1. Parse chunks of .dostman files.

    Used decorators (@) and Regex to parse the individual requests.

-   [x] Parsing with decorators.
-   [x] Parse multiple requests seperated by `###`.
-   [ ] Inject env variables, variables as functions (for refresh cases..).
-   [ ] Test for different inputs, write Tests!

2. Make requests, store response. Format and output.

-   [x] Output as JSON.
-   [ ] Output in both human readable or .dostman like

```js
//JSON format might be an array of requests like this
{
  method: "GET",
  url: "https://api.github.com/users/egecavusoglu",
  headers: ["content-type: application/json", "Authorization: Bearer"],
  body: {
    public: true,
  },
  response: {
    status: 200,
    data: true,
  },
  error: undefined
}
```

3. Create a CLI that reads all dostman files (like Jest), processes them and outputs.

4. Release!

## Project Todos

-   [ ] Proper Docs
-   [x] Prettier
-   [ ] Tests
-   [ ] CI/CD.

## Must be fixed

-   [ ] More error tolerant parsing mechanism
-   [ ] More error tolerant headers
-   [ ] No body on GET's.

### Native JS in config thoughts

Create a new js file js with config.

Scrape all variables using [this](https://stackoverflow.com/questions/2762075/get-all-javascript-variables)

## Bugs to resolve