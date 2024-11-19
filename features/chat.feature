Feature: Chat Functionality
  As a logged in user
  I want to be able to send and receive messages
  So that I can communicate with other users

  Background:
    Given I am logged in as "testuser"

  Scenario: Send a message
    When I type "Hello, World!" in the message input
    And I click the send button
    Then I should see my message in the chat

  Scenario: View message history
    And there are existing messages in the chat
    When I am in the chat room
    Then I should see the message history