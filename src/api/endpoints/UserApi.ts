import { ApiClient } from '../ApiClient';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export class UserApi {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async login(email: string, password: string): Promise<any> {
    const payload: LoginRequest = { email, password };
    return this.apiClient.post('/auth/login', payload);
  }

  async register(email: string, password: string, name: string): Promise<any> {
    const payload = { email, password, name };
    return this.apiClient.post('/auth/register', payload);
  }

  async getProfile(): Promise<any> {
    return this.apiClient.get('/users/profile');
  }

  async updateProfile(data: Partial<User>): Promise<any> {
    return this.apiClient.put('/users/profile', data);
  }

  async logout(): Promise<any> {
    return this.apiClient.post('/auth/logout');
  }

  async getUser(userId: number): Promise<any> {
    return this.apiClient.get(`/users/${userId}`);
  }
}
