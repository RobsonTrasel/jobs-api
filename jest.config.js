module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.spec.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    verbose: true,
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
    },
}