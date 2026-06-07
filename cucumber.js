module.exports = {
  require: ["step-definitions/**/*.js"],
  requireModule: ["ts-node/register"],
  paths: ["features/example.feature"],
  format: [
    "progress-bar",
    "html:test-results/cucumber-report.html",
    "json:test-results/cucumber-report.json"
  ],
  formatOptions: {
    snippetInterface: "async-await"
  }
};
