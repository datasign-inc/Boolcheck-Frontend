export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    // ESM モジュールの import 文で拡張子 .js を省略している場合の対応（必要に応じて）
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};