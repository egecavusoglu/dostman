const Dostman = require('../src/dostman/index.js');

/**
 * @unit_test Construct dostman: multiple valid requests.
 */
test('Construct dostman: multiple valid requests.', () => {
    const filePath = './sample-requests/posts.dostman';
    const dost = new Dostman(filePath, false);
    expect(dost.requests.length).toBe(3);
});

/**
 * @unit_test Construct dostman: multiple valid requests, some faulty requests.
 */
test('Construct dostman: multiple valid requests, some faulty requests.', () => {
    const filePath = './sample-requests/posts_error.dostman';
    const dost = new Dostman(filePath, false);
    expect(dost.requests.length).toBe(2);
});

/**
 * @unit_test Execute requests: multiple valid requests.
 */
test('Construct dostman: multiple valid requests.', async () => {
    const filePath = './sample-requests/posts.dostman';
    const dost = new Dostman(filePath, false);
    await dost.executeRequests();
    for (let req of dost.requests) {
        expect(req.response.status).toBeGreaterThan(199);
        expect(req.response.status).toBeLessThan(300);
    }
});

/**
 * @unit_test Execute requests: multiple valid requests, some faulty requests.
 */
test('Execute requests: multiple valid requests, some faulty requests.', async () => {
    const filePath = './sample-requests/posts_error.dostman';
    const dost = new Dostman(filePath, false);
    await dost.executeRequests();
    let success = 0;
    for (let req of dost.requests) {
        if (req.response.status >= 200 && req.response.status < 300) {
            success++;
        }
    }
    expect(success).toBe(2);
});
