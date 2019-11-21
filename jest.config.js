module.exports = {
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/setupJest.js'],
};
