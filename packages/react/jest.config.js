module.exports = {
  "testEnvironment": "jsdom",
  "collectCoverageFrom": [
    "src/**/*.js",
    "src/**/*.jsx",
    "!**/node_modules/**"
  ],
  // "coverageDirectory": "coverage-reports",
  // "collectCoverage": true,
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