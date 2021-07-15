module.exports = {
    testEnvironment: 'node',
    testTimeout: 10000,
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js, jsx}'],
    coverageReporters: ['text'],
    coveragePathIgnorePatterns: ['/node_modules/', '/config/', 'src/index.js'],
};
