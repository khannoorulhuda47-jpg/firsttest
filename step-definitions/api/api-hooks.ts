import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { ApiContext } from '../../src/api/ApiContext';

setDefaultTimeout(30 * 1000); // 30 seconds

let apiContext: ApiContext;

export function getApiContext(): ApiContext {
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
