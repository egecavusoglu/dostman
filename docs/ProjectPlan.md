# Project Plan

## Steps

1. Parse chunks of .dostman files.

    Used decorators (@) and Regex to parse the individual requests.

-   [x] Parsing with decorators.
-   [x] Parse multiple requests seperated by `###`.
-   [x] Inject env variables, variables as functions (for refresh cases..).

2. Make requests, store response. Format and output.

-   [x] Output as JSON.
-   [ ] Output in both human readable or .dostman like (Maybe later)

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

-   [x] Read all files, execute, save outputs.
-   [x] Make sure verbose logging mode.
-   [ ] Add verbose option as flag.

4. Write Tests

-   [ ] Test for different inputs, fault tolerance.

4. Release to npm!

## Project Todos

-   [x] Proper Docs
-   [x] Prettier
-   [x] Tests
-   [ ] CI/CD.
-   [ ] Timing for requests, perf analysis?

## Bugs

-   [ ] More error tolerant parsing mechanism.
-   [ ] More error tolerant headers parsing.
-   [ ] No body on GET's.
