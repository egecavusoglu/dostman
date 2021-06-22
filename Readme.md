# Dostman

Rest client leveraging JS.

## Steps

1. Parse chunks of .dostman files.

    Used decorators (@) and Regex to parse the individual requests.

-   [x] Parsing with decorators.
-   [ ] Inject env variables, variables as functions (for refresh cases..).
-   [ ] Parse multiple requests seperated by `###`.
-   [ ] Test for different inputs, write Tests!

2. Make requests, store response. Format and output.

-   [ ] Output in both human readable .dostman like
-   [x] Output as JSON.

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
}
```

3. Create a CLI that reads all dostman files (like Jest), processes and outputs.

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
