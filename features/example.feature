Feature: Example Shopping Cart
  As a customer
  I want to add items to my shopping cart
  So that I can purchase them

  Scenario Outline: Google search with multiple keywords
    Given the user is on the Google homepage
    When the user enters "<keyword>" in the search box
    And the user clicks the search button
    Then the search results should display for "<keyword>"
    And the results page should show "<resultCount>" or more results
    And the page title should contain "<keyword>"

    Examples:
      | keyword              | resultCount |
      | Playwright testing   |     1000000 |
      | Cucumber BDD         |      500000 |
      | Automated testing    |     2000000 |
      | JavaScript framework |     1500000 |
      | Web automation tools |      800000 |
      | API testing          |     1200000 |
