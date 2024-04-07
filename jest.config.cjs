/** @type {import('jest').Config} */
const config = {
    verbose: true,
    "reporters": [
        "default",
        ["jest-html-reporters", {
            "publicPath": "./html-report",
            "filename": "report.html",
            "openReport": true
        }]
    ],
    json: true,
    collectCoverage: true,
    coverageDirectory: "coverage-report",
    collectCoverageFrom: ["src/**/*.js"],
    coverageReporters: ["json", "html"],
};

module.exports = config;