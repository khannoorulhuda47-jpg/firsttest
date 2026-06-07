class UserApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async login(email, password) {
    const payload = { email, password };
    return this.apiClient.post('/auth/login', payload);
  }

  async register(email, password, name) {
    const payload = { email, password, name };
    return this.apiClient.post('/auth/register', payload);
  }

  async getProfile() {
    return this.apiClient.get('/users/profile');
  }

  async updateProfile(data) {
    return this.apiClient.put('/users/profile', data);
  }

  async logout() {
    return this.apiClient.post('/auth/logout');
  }

  async getUser(userId) {
    return this.apiClient.get(`/users/${userId}`);
  }
}

module.exports = { UserApi };
