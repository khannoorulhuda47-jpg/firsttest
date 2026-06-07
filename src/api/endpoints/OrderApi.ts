import { ApiClient } from '../ApiClient';

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
}

export class OrderApi {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getOrders(): Promise<any> {
    return this.apiClient.get('/orders');
  }

  async getOrderById(orderId: number): Promise<any> {
    return this.apiClient.get(`/orders/${orderId}`);
  }

  async createOrder(order: CreateOrderRequest): Promise<any> {
    return this.apiClient.post('/orders', order);
  }

  async updateOrder(orderId: number, data: Partial<Order>): Promise<any> {
    return this.apiClient.put(`/orders/${orderId}`, data);
  }

  async cancelOrder(orderId: number): Promise<any> {
    return this.apiClient.delete(`/orders/${orderId}`);
  }

  async getOrderStatus(orderId: number): Promise<any> {
    return this.apiClient.get(`/orders/${orderId}/status`);
  }

  async updateOrderStatus(orderId: number, status: Order['status']): Promise<any> {
    return this.apiClient.patch(`/orders/${orderId}/status`, { status });
  }
}
