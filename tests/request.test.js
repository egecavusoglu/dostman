const Request = require('../src/request');

/**
 * @unit_test Construct Request: correct chunk
 */
test('Construct Request: correct chunk', () => {
    const chunk = `
        @desc Create a new post.
        @method POST
        @url https://jsonplaceholder.typicode.com/posts
        @headers
        content-type: application/json
        @body
        {
            "title": "foo",
            "body": "bar",
            "userId": 1
        }`;
    const request = new Request(chunk, false);
    expect(request.method).toBe('POST');
    expect(request.url).toBe('https://jsonplaceholder.typicode.com/posts');
    expect(request.headers).toEqual({
        'content-type': 'application/json',
    });
    expect(request.body).toEqual({
        title: 'foo',
        body: 'bar',
        userId: 1,
    });
});

/**
 * @unit_test Construct Request: chunk missing either @url, @desc, @header, @body
 */
test('Construct Request: chunk missing either @url, @desc, @header, @body', () => {
    const chunk = `
        @desc Create a new post.
        @method POST
        @url https://jsonplaceholder.typicode.com/posts
        
        @body
        {
            "title": "foo",
            "body": "bar",
            "userId": 1
        }`;
    const request = new Request(chunk, false);
    expect(request.method).toBe('POST');
    expect(request.url).toBe('https://jsonplaceholder.typicode.com/posts');
    expect(request.headers).toEqual({});
    expect(request.body).toEqual({
        title: 'foo',
        body: 'bar',
        userId: 1,
    });
});

/**
 * @unit_test Execute Request: correct endpoint
 */
test('Execute Request: correct endpoint', async () => {
    const chunk = `
            @desc Create a new post.            
            @desc Get posts by id.
            @method GET
            @url https://jsonplaceholder.typicode.com/posts/1
            @headers
            content-type: application/json`;
    const request = new Request(chunk, false);
    const respone = await request.execute();
    expect(respone.status).toBe(200);
});

/**
 * @unit_test Execute Request: none existent endpoint
 */
test('Execute Request: correct endpoint', async () => {
    const chunk = `
            @desc Create a new post.            
            @desc Get posts by id.
            @method GET
            @url https://nonexistentapiendpoint.typicode.com/posts/1
            @headers
            content-type: application/json`;
    const request = new Request(chunk, false);
    const respone = await request.execute();
    expect(respone).toBeFalsy();
});
