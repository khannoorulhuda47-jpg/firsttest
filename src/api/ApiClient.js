const axios = require('axios');

class ApiClient {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.lastResponse = null;
    this.lastError = null;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get(endpoint, config) {
    try {
      this.lastResponse = await this.client.get(endpoint, config);
      this.lastError = null;
      return this.lastResponse;
    } catch (error) {
      this.lastError = error;
      throw error;
    }
  }

  async post(endpoint, data, config) {
    try {
      this.lastResponse = await this.client.post(endpoint, data, config);
      this.lastError = null;
      return this.lastResponse;
    } catch (error) {
      this.lastError = error;
      throw error;
    }
  }

  async put(endpoint, data, config) {
    try {
      this.lastResponse = await this.client.put(endpoint, data, config);
      this.lastError = null;
      return this.lastResponse;
    } catch (error) {
      this.lastError = error;
      throw error;
    }
  }

  async patch(endpoint, data, config) {
    try {
      this.lastResponse = await this.client.patch(endpoint, data, config);
      this.lastError = null;
      return this.lastResponse;
    } catch (error) {
      this.lastError = error;
      throw error;
    }
  }

  async delete(endpoint, config) {
    try {
      this.lastResponse = await this.client.delete(endpoint, config);
      this.lastError = null;
      return this.lastResponse;
    } catch (error) {
      this.lastError = error;
      throw error;
    }
  }

  async setAuthToken(token) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  getLastResponse() {
    return this.lastResponse;
  }

  getLastError() {
    return this.lastError;
  }

  getResponseStatus() {
    return this.lastResponse?.status;
  }

  getResponseData() {
    return this.lastResponse?.data;
  }

  getResponseHeaders() {
    return this.lastResponse?.headers;
  }

  getErrorStatus() {
    return this.lastError?.response?.status;
  }

  getErrorMessage() {
    return this.lastError?.response?.data?.message || this.lastError?.message || 'Unknown error';
  }
}

module.exports = { ApiClient };
