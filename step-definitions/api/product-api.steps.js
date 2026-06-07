const { When, Then } = require('@cucumber/cucumber');
const { getApiContext } = require('./api-hooks');

const apiContext = getApiContext();

When('the user sends a GET request to search products with query {string}', async (query) => {
  try {
    await apiContext.productApi.searchProducts(query);
  } catch (error) {
    // Error is stored in apiContext
  }
});

When(
  'the user sends a POST request to create a product with name {string} price {int}',
  async (name, price) => {
    try {
      await apiContext.productApi.createProduct({
        name,
        description: 'Product description',
        price,
        quantity: 10,
      });
    } catch (error) {
      // Error is stored in apiContext
    }
  }
);

When('the user sends a PUT request to update product {int} with price {int}', async (productId, price) => {
  try {
    await apiContext.productApi.updateProduct(productId, { price });
  } catch (error) {
    // Error is stored in apiContext
  }
});

When('the user sends a DELETE request to delete product {int}', async (productId) => {
  try {
    await apiContext.productApi.deleteProduct(productId);
  } catch (error) {
    // Error is stored in apiContext
  }
});

Then('the response should contain a list of products', () => {
  const data = apiContext.getResponseData();
  if (!Array.isArray(data)) {
    throw new Error('Response does not contain a list of products');
  }
});

Then('the response should contain product details', () => {
  const data = apiContext.getResponseData();
  if (!data || !data.id || !data.name) {
    throw new Error('Response does not contain valid product details');
  }
});

Then('the response should contain search results', () => {
  const data = apiContext.getResponseData();
  if (!Array.isArray(data)) {
    throw new Error('Response does not contain search results');
  }
});

Then('the response should contain the created product with ID', () => {
  const data = apiContext.getResponseData();
  if (!data || !data.id) {
    throw new Error('Response does not contain the created product with ID');
  }
});

Then('the response should contain updated product information', () => {
  const data = apiContext.getResponseData();
  if (!data || !data.price) {
    throw new Error('Response does not contain updated product information');
  }
});
