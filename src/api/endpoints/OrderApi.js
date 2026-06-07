class OrderApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getOrders() {
    return this.apiClient.get('/orders');
  }

  async getOrderById(orderId) {
    return this.apiClient.get(`/orders/${orderId}`);
  }

  async createOrder(order) {
    return this.apiClient.post('/orders', order);
  }

  async updateOrder(orderId, data) {
    return this.apiClient.put(`/orders/${orderId}`, data);
  }

  async cancelOrder(orderId) {
    return this.apiClient.delete(`/orders/${orderId}`);
  }

  async getOrderStatus(orderId) {
    return this.apiClient.get(`/orders/${orderId}/status`);
  }

  async updateOrderStatus(orderId, status) {
    return this.apiClient.patch(`/orders/${orderId}/status`, { status });
  }
}

module.exports = { OrderApi };
