import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;
  private lastResponse: AxiosResponse<any> | null = null;
  private lastError: any = null;

  constructor(baseURL: string = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      this.lastResponse = await this.client.get<T>(endpoint, config);
      this.lastError = null;
      return this.lastResponse;
    } catch (error) {
      this.lastError = error;
      throw error;
    }
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      this.lastResponse = await this.client.post<T>(endpoint, data, config);
      this.lastError = null;
      return this.lastResponse;
    } catch (error) {
      this.lastError = error;
      throw error;
    }
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      this.lastResponse = await this.client.put<T>(endpoint, data, config);
      this.lastError = null;
      return this.lastResponse;
    } catch (error) {
      this.lastError = error;
      throw error;
    }
  }

  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      this.lastResponse = await this.client.patch<T>(endpoint, data, config);
      this.lastError = null;
      return this.lastResponse;
    } catch (error) {
      this.lastError = error;
      throw error;
    }
  }

  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      this.lastResponse = await this.client.delete<T>(endpoint, config);
      this.lastError = null;
      return this.lastResponse;
    } catch (error) {
      this.lastError = error;
      throw error;
    }
  }

  async setAuthToken(token: string): Promise<void> {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  getLastResponse(): AxiosResponse<any> | null {
    return this.lastResponse;
  }

  getLastError(): any {
    return this.lastError;
  }

  getResponseStatus(): number | undefined {
    return this.lastResponse?.status;
  }

  getResponseData(): any {
    return this.lastResponse?.data;
  }

  getResponseHeaders(): any {
    return this.lastResponse?.headers;
  }

  getErrorStatus(): number | undefined {
    return this.lastError?.response?.status;
  }

  getErrorMessage(): string {
    return this.lastError?.response?.data?.message || this.lastError?.message || 'Unknown error';
  }
}
