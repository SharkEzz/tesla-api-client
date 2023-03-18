/** @type {import("jest").Config} */
const config = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageReporters: ['html'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.(m)?js$': '$1',
    },
};

export default config;
