Feature: Order API Testing
  As an API consumer
  I want to test order endpoints
  So that I can verify order management functionality

  Scenario: Get all orders
    Given the user is authenticated with a valid token
    When the user sends a GET request to "/orders"
    Then the response status code should be 200
    And the response should contain a list of orders

  Scenario: Get order by ID
    Given the user is authenticated with a valid token
    When the user sends a GET request to "/orders/1"
    Then the response status code should be 200
    And the response should contain order details

  Scenario: Create new order
    Given the user is authenticated with a valid token
    When the user sends a POST request to create an order with product ID 1 quantity 2
    Then the response status code should be 201
    And the response should contain the created order with ID

  Scenario: Update order status
    Given the user is authenticated with a valid token
    When the user sends a PATCH request to update order 1 status to "shipped"
    Then the response status code should be 200
    And the response should contain updated order status

  Scenario: Cancel order
    Given the user is authenticated with a valid token
    When the user sends a DELETE request to cancel order 1
    Then the response status code should be 200
