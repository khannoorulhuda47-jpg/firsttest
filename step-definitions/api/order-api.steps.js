const { When, Then } = require('@cucumber/cucumber');
const { getApiContext } = require('./api-hooks');

const apiContext = getApiContext();

When('the user sends a POST request to create an order with product ID {int} quantity {int}', async (productId, quantity) => {
  try {
    await apiContext.orderApi.createOrder({
      items: [
        {
          productId,
          quantity,
          price: 100,
        },
      ],
    });
  } catch (error) {
    // Error is stored in apiContext
  }
});

When('the user sends a PATCH request to update order {int} status to {string}', async (orderId, status) => {
  try {
    await apiContext.orderApi.updateOrderStatus(orderId, status);
  } catch (error) {
    // Error is stored in apiContext
  }
});

When('the user sends a DELETE request to cancel order {int}', async (orderId) => {
  try {
    await apiContext.orderApi.cancelOrder(orderId);
  } catch (error) {
    // Error is stored in apiContext
  }
});

Then('the response should contain a list of orders', () => {
  const data = apiContext.getResponseData();
  if (!Array.isArray(data)) {
    throw new Error('Response does not contain a list of orders');
  }
});

Then('the response should contain order details', () => {
  const data = apiContext.getResponseData();
  if (!data || !data.id || !data.items) {
    throw new Error('Response does not contain valid order details');
  }
});

Then('the response should contain the created order with ID', () => {
  const data = apiContext.getResponseData();
  if (!data || !data.id) {
    throw new Error('Response does not contain the created order with ID');
  }
});

Then('the response should contain updated order status', () => {
  const data = apiContext.getResponseData();
  if (!data || !data.status) {
    throw new Error('Response does not contain updated order status');
  }
});
