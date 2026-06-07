module.exports = {
  require: ["step-definitions/**/*.{ts,js}"],
  requireModule: ["ts-node/register"],
  format: [
    "progress-bar",
    "html:test-results/cucumber-report.html",
    "json:test-results/cucumber-report.json"
  ],
  formatOptions: {
    snippetInterface: "async-await"
  }
};
