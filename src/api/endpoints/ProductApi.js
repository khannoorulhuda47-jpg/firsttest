class ProductApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getProducts() {
    return this.apiClient.get('/products');
  }

  async getProductById(productId) {
    return this.apiClient.get(`/products/${productId}`);
  }

  async searchProducts(query) {
    return this.apiClient.get('/products/search', {
      params: { q: query },
    });
  }

  async createProduct(product) {
    return this.apiClient.post('/products', product);
  }

  async updateProduct(productId, data) {
    return this.apiClient.put(`/products/${productId}`, data);
  }

  async deleteProduct(productId) {
    return this.apiClient.delete(`/products/${productId}`);
  }

  async getProductsByCategory(category) {
    return this.apiClient.get(`/products/category/${category}`);
  }
}

module.exports = { ProductApi };
