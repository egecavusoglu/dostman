# Dostman

Rest client leveraging JS.

## Steps

1. Parse chunks of .dostman files.

   Used decorators (@) and Regex to parse the individual requests.

   - [ ] Test for different inputs, write Tests!

2. Make requests, store response. Format and output.

- Output in both human readable .dostman like format and JSON.

```js
//JSON format might be an array of requests like this
{
  method: "GET",
  url: "https://api.github.com/users/egecavusoglu",
  headers: ["content-type: application/json", "Authorization: Bearer"],
  requestBody: {
    public: true,
  },
  responseBody: {
    data: true,
  },
}
```

3. Create a CLI that reads all dostman files (like Jest), processes and outputs.

4. Release!
