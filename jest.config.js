module.exports = {
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/setupJest.ts'],
    moduleNameMapper: {
        '^Api$': '<rootDir>/src/Api',
        '^types$': '<rootDir>/src/types',
    },
};
