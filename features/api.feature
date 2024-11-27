@API
Feature: API Functionality

  Scenario: Retrieve messages successfully
    Given I have a valid user token
    When I send a GET request to "/api/messages"
    Then the response status should be 200

  Scenario: Login successfully with valid credentials
    Given I have a valid user token
    When I send a POST request to "/api/login" with:
      | username | testuser    |
      | password | password123 |
    Then the response status should be 200
    And the response should contain:
      | token | <any value> |

  Scenario: Login fails with invalid credentials
    When I send a POST request to "/api/login" with:
      | username | invaliduser |
      | password | wrongpass   |
    Then the response status should be 401
    And the response should contain:
      | error | Invalid credentials |

  Scenario: Create a new message successfully
    Given I have a valid user token
    When I send a POST request to "/api/messages" with:
      | sender  | testuser    |
      | content | Hello world |
    Then the response status should be 200
    And the response should contain:
      | sender  | testuser    |
      | content | Hello world |
