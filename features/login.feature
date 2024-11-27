@UI
Feature: Login Functionality
  As a user
  I want to be able to log in
  So that I can access the chat room

  Scenario: Login with valid username and password
    Given I am on the login page
    When I enter "testuser" as username
    And I enter "password123" as password
    And I click the login button
    Then I should see the chat room

  Scenario: Login with invalid username and password
    Given I am on the login page
    When I enter "wronguser" as username
    And I enter "wrongpass" as password
    And I click the login button
    Then I should see an error message

  Scenario: Login only with valid username
    Given I am on the login page
    When I enter "wronguser" as username
    And I click the login button
    Then I should see an error message

  Scenario: Login only with valid password
    Given I am on the login page
    And I enter "wrongpass" as password
    And I click the login button
    Then I should see an error message

  Scenario: Login with empty username and password
    Given I am on the login page
    And I click the login button
    Then I should see an error message
