const { ApiClient } = require('./ApiClient');
const { UserApi } = require('./endpoints/UserApi');
const { ProductApi } = require('./endpoints/ProductApi');
const { OrderApi } = require('./endpoints/OrderApi');

class ApiContext {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.apiClient = new ApiClient(baseURL);
    this.userApi = new UserApi(this.apiClient);
    this.productApi = new ProductApi(this.apiClient);
    this.orderApi = new OrderApi(this.apiClient);
  }

  async setAuthToken(token) {
    await this.apiClient.setAuthToken(token);
  }

  getLastResponse() {
    return this.apiClient.getLastResponse();
  }

  getLastError() {
    return this.apiClient.getLastError();
  }

  getResponseStatus() {
    return this.apiClient.getResponseStatus();
  }

  getResponseData() {
    return this.apiClient.getResponseData();
  }
}

module.exports = { ApiContext };
