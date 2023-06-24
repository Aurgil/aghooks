module.exports = {
    rootDir: "..",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
    coverageDirectory: "<rootDir>/coverage",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/configs/jest.setup.js"],
    preset: "ts-jest",
    transform: {
        "^.+\\.(ts|tsx)?$": [
            "ts-jest",
            { tsconfig: "./configs/typescript/package.tsconfig.json" },
        ],
        "^.+\\.(js|jsx)$": ["babel-jest", { configFile: "./configs/.babelrc" }],
    },
    testMatch: ["**/*.test.(ts|tsx)"],
};
