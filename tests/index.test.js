const fs = require('fs');
const { main } = require('../src/');

/**
 * @end_to_end_test Execute main function and make sure getting output files for each input file.
 */

test('E2E test: Read files, execute and write output.', async () => {
    await main(false);
    const cwd = process.cwd();
    const files = fs.readdirSync(`${cwd}/sample-requests`);
    let outputFiles = 0;
    for (const file of files) {
        if (file.endsWith('.json')) {
            outputFiles++;
        }
    }
    expect(outputFiles).toBe(files.length / 2);
});
