import { ApiClient } from './ApiClient';
import { UserApi } from './endpoints/UserApi';
import { ProductApi } from './endpoints/ProductApi';
import { OrderApi } from './endpoints/OrderApi';

export class ApiContext {
  public apiClient: ApiClient;
  public userApi: UserApi;
  public productApi: ProductApi;
  public orderApi: OrderApi;

  constructor(baseURL: string = 'http://localhost:3000/api') {
    this.apiClient = new ApiClient(baseURL);
    this.userApi = new UserApi(this.apiClient);
    this.productApi = new ProductApi(this.apiClient);
    this.orderApi = new OrderApi(this.apiClient);
  }

  async setAuthToken(token: string): Promise<void> {
    await this.apiClient.setAuthToken(token);
  }

  getLastResponse(): any {
    return this.apiClient.getLastResponse();
  }

  getLastError(): any {
    return this.apiClient.getLastError();
  }

  getResponseStatus(): number | undefined {
    return this.apiClient.getResponseStatus();
  }

  getResponseData(): any {
    return this.apiClient.getResponseData();
  }
}
