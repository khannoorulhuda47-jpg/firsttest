Feature: Product API Testing
  As an API consumer
  I want to test product endpoints
  So that I can verify product management functionality

  Scenario: Get all products
    When the user sends a GET request to "/products"
    Then the response status code should be 200
    And the response should contain a list of products

  Scenario: Get product by ID
    When the user sends a GET request to "/products/1"
    Then the response status code should be 200
    And the response should contain product details

  Scenario: Search products
    When the user sends a GET request to search products with query "laptop"
    Then the response status code should be 200
    And the response should contain search results

  Scenario: Create new product
    Given the user is authenticated with a valid token
    When the user sends a POST request to create a product with name "New Laptop" price 1500
    Then the response status code should be 201
    And the response should contain the created product with ID

  Scenario: Update product
    Given the user is authenticated with a valid token
    When the user sends a PUT request to update product 1 with price 1200
    Then the response status code should be 200
    And the response should contain updated product information

  Scenario: Delete product
    Given the user is authenticated with a valid token
    When the user sends a DELETE request to delete product 1
    Then the response status code should be 200
