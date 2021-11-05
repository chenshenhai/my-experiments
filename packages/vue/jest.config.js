module.exports = {
  "testEnvironment": "jsdom",
  // "testEnvironment": "jest-environment-jsdom-fifteen",
  "collectCoverageFrom": [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "!**/node_modules/**"
  ],
  // "collectCoverage": true,
  // "coverageDirectory": "coverage-reports",
  // "coverageReporters": [
  //   "clover",
  //   "html",
  //   "text-summary"
  // ],
  // "coverageThreshold": {
  //   "global": {
  //     "branches": 80,
  //     "functions": 80,
  //     "lines": 80,
  //     "statements": 80
  //   }
  // },
  "moduleFileExtensions": [
    "js", "jsx", "ts", "tsx"
  ],
  "modulePaths": [
    "<rootDir>"
  ],
  "testRegex": "(/__tests__/.*)\\.test.js$",
  "setupFiles": []
}