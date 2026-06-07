import { ApiClient } from '../ApiClient';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class ProductApi {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getProducts(): Promise<any> {
    return this.apiClient.get('/products');
  }

  async getProductById(productId: number): Promise<any> {
    return this.apiClient.get(`/products/${productId}`);
  }

  async searchProducts(query: string): Promise<any> {
    return this.apiClient.get('/products/search', {
      params: { q: query },
    });
  }

  async createProduct(product: CreateProductRequest): Promise<any> {
    return this.apiClient.post('/products', product);
  }

  async updateProduct(productId: number, data: Partial<Product>): Promise<any> {
    return this.apiClient.put(`/products/${productId}`, data);
  }

  async deleteProduct(productId: number): Promise<any> {
    return this.apiClient.delete(`/products/${productId}`);
  }

  async getProductsByCategory(category: string): Promise<any> {
    return this.apiClient.get(`/products/category/${category}`);
  }
}
