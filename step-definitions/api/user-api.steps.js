const { When, Then, Given } = require('@cucumber/cucumber');
const { getApiContext } = require('./api-hooks');

const apiContext = getApiContext();

Given('the user is authenticated with a valid token', async () => {
  try {
    const response = await apiContext.userApi.login('test@example.com', 'password123');
    const token = response.data.token;
    await apiContext.setAuthToken(token);
  } catch (error) {
    throw new Error('Failed to authenticate user');
  }
});

When(
  'the user sends a POST request to login with email {string} and password {string}',
  async (email, password) => {
    try {
      await apiContext.userApi.login(email, password);
    } catch (error) {
      // Error is stored in apiContext
    }
  }
);

When('the user sends a GET request to {string}', async (endpoint) => {
  try {
    await apiContext.apiClient.get(endpoint);
  } catch (error) {
    // Error is stored in apiContext
  }
});

When('the user sends a PUT request to update profile with name {string}', async (name) => {
  try {
    await apiContext.userApi.updateProfile({ name });
  } catch (error) {
    // Error is stored in apiContext
  }
});

Then('the response status code should be {int}', (statusCode) => {
  const actualStatus = apiContext.getResponseStatus();
  if (actualStatus !== statusCode) {
    throw new Error(`Expected status ${statusCode}, but got ${actualStatus}`);
  }
});

Then('the response should contain a token', () => {
  const data = apiContext.getResponseData();
  if (!data || !data.token) {
    throw new Error('Response does not contain a token');
  }
});

Then('the response should contain user details', () => {
  const data = apiContext.getResponseData();
  if (!data || !data.user) {
    throw new Error('Response does not contain user details');
  }
});

Then('the error message should contain {string}', (expectedMessage) => {
  const error = apiContext.getLastError();
  const errorMsg = error?.response?.data?.message || error?.message || '';
  if (!errorMsg.includes(expectedMessage)) {
    throw new Error(`Expected error message to contain "${expectedMessage}", but got "${errorMsg}"`);
  }
});

Then('the response should contain user profile data', () => {
  const data = apiContext.getResponseData();
  if (!data || !data.id || !data.email) {
    throw new Error('Response does not contain valid user profile data');
  }
});

Then('the response should contain updated user information', () => {
  const data = apiContext.getResponseData();
  if (!data || !data.name) {
    throw new Error('Response does not contain updated user information');
  }
});
