const Request = require('../src/request');
const validChunk =
    '@desc Create a new post. @method POST @url https://jsonplaceholder.typicode.com/posts @headers content-type: application/json @body { "title": "foo", "body": "bar", "userId": 1 }';

const chunkMissingHeaders =
    '@desc Create a new post. @method POST @url https://jsonplaceholder.typicode.com/posts @body { "title": "foo", "body": "bar", "userId": 1 }';

const chunkValidEndpoint =
    '@desc Get posts by id. @method GET @url https://jsonplaceholder.typicode.com/posts/1 @headers content-type: application/json';

const chunkInvalidEndpoint =
    '@desc Get posts by id. @method GET @url https://nonexistentapiendpoint.typicode.com/posts/1 @headers content-type: application/json';

/**
 * @unit_test Construct Request: correct chunk
 */
test('Construct Request: correct chunk', () => {
    const request = new Request(validChunk, false);
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
    const request = new Request(chunkMissingHeaders, false);
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
    const request = new Request(chunkValidEndpoint, false);
    const respone = await request.execute();
    expect(respone.status).toBe(200);
});

/**
 * @unit_test Execute Request: non existent endpoint
 */
test('Execute Request: none existent endpoint', async () => {
    const request = new Request(chunkInvalidEndpoint, false);
    const respone = await request.execute();
    expect(respone).toBeFalsy();
});

module.exports = {
    validChunk,
    chunkMissingHeaders,
    chunkValidEndpoint,
    chunkInvalidEndpoint,
};
