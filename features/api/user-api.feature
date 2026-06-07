Feature: User API Testing
  As an API consumer
  I want to test user endpoints
  So that I can verify user management functionality

  Scenario: User login successful
    When the user sends a POST request to login with email "test@example.com" and password "password123"
    Then the response status code should be 200
    And the response should contain a token
    And the response should contain user details

  Scenario: User login with invalid credentials
    When the user sends a POST request to login with email "invalid@example.com" and password "wrongpassword"
    Then the response status code should be 401
    And the error message should contain "Invalid credentials"

  Scenario: Get user profile
    Given the user is authenticated with a valid token
    When the user sends a GET request to "/users/profile"
    Then the response status code should be 200
    And the response should contain user profile data

  Scenario: Update user profile
    Given the user is authenticated with a valid token
    When the user sends a PUT request to update profile with name "John Doe"
    Then the response status code should be 200
    And the response should contain updated user information
