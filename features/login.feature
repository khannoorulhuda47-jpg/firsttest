Feature: User Authentication
  As a user
  I want to be able to log in
  So that I can access my account

  Scenario: Successful login
    Given the user is on the login page
    When the user enters valid credentials
    And the user clicks the login button
    Then the user should be redirected to the dashboard

  Scenario: Invalid login
    Given the user is on the login page
    When the user enters invalid credentials
    And the user clicks the login button
    Then an error message should be displayed
