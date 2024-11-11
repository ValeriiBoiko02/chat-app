Feature: Login Functionality
  As a user
  I want to be able to log in
  So that I can access the chat room

  Scenario: Successful login
    Given I am on the login page
    When I enter "testuser" as username
    And I enter "password123" as password
    And I click the login button
    Then I should see the chat room

  Scenario: Failed login
    Given I am on the login page
    When I enter "wronguser" as username
    And I enter "wrongpass" as password
    And I click the login button
    Then I should see an error message