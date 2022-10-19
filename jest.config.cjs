module.exports = {
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/setupJest.cjs'],
};
