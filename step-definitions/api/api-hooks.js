const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { ApiContext } = require('../../src/api/ApiContext');

setDefaultTimeout(30 * 1000); // 30 seconds

let apiContext;

function getApiContext() {
  if (!apiContext) {
    apiContext = new ApiContext();
  }
  return apiContext;
}

Before(function () {
  apiContext = new ApiContext();
});

After(async function () {
  // Cleanup if needed
});

module.exports = { getApiContext };
